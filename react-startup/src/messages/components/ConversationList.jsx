import React, { useState, useEffect } from 'react';
import { ListGroup, Form, InputGroup } from 'react-bootstrap';
import { getAllOtherUsers } from '../../call_service/server_call_methods';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation, username }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllOtherUsers(username);
        setAllUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [username]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allUsers.filter(user => 
      user.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      
      <ListGroup>
        {filteredUsers.map((user) => (
          <ListGroup.Item
            key={user}
            action
            onClick={() => onSelectConversation({ id: user, name: user })}
            className="conversation-item"
          >
            {user}
          </ListGroup.Item>
        ))}
        {conversations.map((conversation) => (
          <ListGroup.Item
            key={conversation.id}
            action
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