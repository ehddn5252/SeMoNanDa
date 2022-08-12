import React, { Component } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  color: #42387a;
  font-size: 0.8rem;
  font-weight: 600;
 // background-color: yellow;
  font-weight: 5000;
  font-size: 30px;
`;

const MessageContainer = styled.div`
  //background-color: blue;
  width: fit-content;
  max-width: 400px;
  height: fit-content;
`;

const TextArea = styled.div`
  background-color: rgb(255,255,255,0.8);
  margin-left: 5px;
  border-radius: 1em;
  border: 1px solid darkgray;
  width: fit-content;
  padding: 5px;
`
const Text = styled.p`
  font-size: 1rem;
  //background-color: red;
  width: fit-content;
  font-size: 25px;
`;

class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <MessageContainer>
        <Username>{userName}</Username>
        <TextArea>
        <Text>{text}</Text>
        </TextArea>
      </MessageContainer>
    );
  }
}

export default Message;