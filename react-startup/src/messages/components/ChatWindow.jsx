// components/ChatWindow.jsx
import React, { useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatWindow = ({ conversation }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission here
    setMessage('');
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
        {/* Messages will be displayed here */}
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="primary">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatWindow;