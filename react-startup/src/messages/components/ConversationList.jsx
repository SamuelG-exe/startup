// ConversationList.jsx
import React, { useState, useEffect } from 'react';
import { ListGroup, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { getAllOtherUsers } from '../../call_service/server_call_methods';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation, username }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [potentialUsers, setPotentialUsers] = useState([]);
  
  useEffect(() => {
    const fetchPotentialUsers = async () => {
      try {
        const users = await getAllOtherUsers(username);
        // Filter out users who already have conversations
        const newUsers = users.filter(user => 
          !conversations.some(conv => conv.name === user)
        );
        setPotentialUsers(newUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    
    fetchPotentialUsers();
  }, [username, conversations]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredPotentialUsers = potentialUsers.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search for new users..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <Dropdown show={searchTerm.length > 0}>
        <Dropdown.Menu>
          {filteredPotentialUsers.map(user => (
            <Dropdown.Item 
              key={user}
              onClick={() => onSelectConversation({ id: user, name: user, isNewConversation: true })}
            >
              {user}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <ListGroup>
        {conversations.map((conversation) => (
          <ListGroup.Item
            key={conversation.id}
            active={selectedConversation?.id === conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className="conversation-item"
          >
            {conversation.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ConversationList;