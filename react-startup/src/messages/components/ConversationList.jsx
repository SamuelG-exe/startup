// components/ConversationList.jsx
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation }) => {
  return (
    <ListGroup>
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
  );
};

export default ConversationList;