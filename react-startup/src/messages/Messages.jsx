import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Messages.css';
import { useAuth } from '../App';
import { createWebSocketConnection, getAllOtherUsers, fetchChatHistory} from '../call_service/server_call_methods';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const { username } = useAuth(); // Get current user from context

  // Fetch other users when component mounts
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const users = await getAllOtherUsers(username);
        
        // Get chat history for each user
        const chatHistories = await Promise.all(
          users.map(async user => {
            const history = await fetchChatHistory(username, user);
            return history.length > 0 ? {
              id: `conversation-${user}`,
              name: user,
              messages: history
            } : null;
          })
        );
        
        // Filter out conversations with no history
        const activeConversations = chatHistories.filter(conv => conv !== null);
        setConversations(activeConversations);
      } catch (error) {
        console.error('Error fetching other users:', error);
      }
    };
  
    if (username) {
      fetchOtherUsers();
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      // Create WebSocket connection when component mounts
      const ws = createWebSocketConnection(username, handleWebSocketMessage);
      setWebSocket(ws);

      // Cleanup WebSocket on component unmount
      return () => {
        ws.close();
      };
    }
  }, [username]);

  const handleWebSocketMessage = useCallback((data) => {
    console.log('Received WebSocket message:', data);
    switch(data.type) {
      case 'newMessage':
        // Update messages for the specific conversation
        setMessages(prev => [...prev, {
          sender: data.from,
          recipient: username,
          message: data.message,
          timestamp: new Date().toISOString()
        }]);
        break;
      case 'chatHistory':
        // Set messages when chat history is received
        setMessages(data.messages);
        break;
      case 'unreadMessages':
        // Handle unread messages, perhaps by updating a notification
        console.log('Unread messages:', data.messages);
        break;
      default:
        console.log('Unhandled message type:', data.type);
    }
  }, [username]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    // When a conversation is selected, fetch chat history
    if (webSocket) {
      webSocket.getChatHistory(conversation.name);
    }
  };

  return (
    <Container fluid>
      <Row className="header text-center py-3">
        <Col>
          <h1>Messaging Center</h1>
          <h2>(using WebSocket)</h2>
        </Col>
      </Row>
      <Row className="content-wrapper">
        <Col md={3}>
          <ConversationList 
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            username={username}
          />
        </Col>
        <Col md={9}>
          <ChatWindow 
            conversation={selectedConversation} 
            webSocket={webSocket}
            username={username}
            messages={messages}
            setMessages={setMessages}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;