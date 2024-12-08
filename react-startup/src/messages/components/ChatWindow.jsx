import React, { useState, useEffect } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatWindow = ({ 
  conversation, 
  webSocket, 
  username, 
  messages = [], 
  setMessages 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!conversation || !message.trim()) return;

    // Send message via WebSocket
    if (webSocket) {
      webSocket.sendMessage(conversation.name, message);
      
      // Optimistically add message to UI
      setMessages(prev => [...prev, {
        sender: username,
        recipient: conversation.name,
        message: message,
        timestamp: new Date().toISOString()
      }]);
      
      setMessage('');
    }
  };

  return (
    <Card className="chat-window">
      <Card.Header>
        <h2>
          {conversation 
            ? `Conversation with ${conversation.name}`
            : 'Select a conversation'}
        </h2>
      </Card.Header>
      <Card.Body className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === username ? 'sent' : 'received'}`}
          >
            <span className="message-text">{msg.message}</span>
            <small className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!conversation}
            />
            <Button 
              type="submit" 
              variant="primary" 
              disabled={!conversation || !message.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatWindow;