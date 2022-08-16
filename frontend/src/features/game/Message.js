import React, { Component } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  color: #42387a;
  font-size: 2em;
  font-weight: 600;
  margin-left: 0.5em;
  width: 100%;
  margin-bottom: 0;
`;

const MessageContainer = styled.div`
  width: 90%;
  margin-right: 0%;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-left: 0.5em;
  width: fit-content;
  padding-left: 5px;
  padding-right: 5px;
  background-color: white;
  border: 2px solid rgb(0,0,0, 0.3);
  border-radius: 5%;
`;

class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <MessageContainer>
        <Username>{userName}</Username>
        <Text>{text}</Text>
      </MessageContainer>
    );
  }
}

export default Message;