// App.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Messages.css';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Mock conversations data
  const conversations = [
    { id: 1, name: 'John Mayer', messages: [] },
    { id: 2, name: 'Rihanna', messages: [] },
    { id: 3, name: "Rihanna's Cousin", messages: [] },
    { id: 4, name: 'Jeve Stobs (not dead)', messages: [] },
    { id: 5, name: 'Ken Burns', messages: [] },
  ];

  return (
    <Container fluid>
      <Row className="header text-center py-3">
        <Col>
          {/* <Image src="./logopng.png" alt="PNG Logo" style={{ width: '200px' }} /> */}
          <h1>Messaging Center</h1>
          <h2>(using WebSocket)</h2>
        </Col>
      </Row>
      <Row className="content-wrapper">
        <Col md={3}>
          <ConversationList 
            conversations={conversations}
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
          />
        </Col>
        <Col md={9}>
          <ChatWindow conversation={selectedConversation} />
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;