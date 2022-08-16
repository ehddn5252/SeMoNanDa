import React, { Component } from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatContainer = styled.div`
  width: 100%
`;

class Messages extends Component {
  render() {
    const { messages } = this.props;

    return messages.map((message, i) => (
      <ChatContainer className={`messages__item ${message.chatClass}`} key={i}>
        <Message text={message.text} userName={message.userName} />
      </ChatContainer>
    ));
  }
}

export default Messages;