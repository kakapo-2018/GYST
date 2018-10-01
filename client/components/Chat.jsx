import React, { Component } from 'react';

//Sockets
const io = require('socket.io-client');
const socket = io.connect(window.location.host);

//Store last message to compare user message just sent and not double the message
var lastmsg = '';

//Listen for incoming messages, check wether or not the message was sent by current user
socket.on('chat message', function(msg) {
  if (lastmsg != msg) {
    addResponseMessage(msg);
  }
});

//Chat widget import
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class Chat extends Component {
  componentDidMount() {
    //Initial message in chat
    addResponseMessage('Chat connected!');
  }

  handleNewUserMessage = newMessage => {
    //Store outgoing message as last message
    lastmsg = newMessage;
    //Send message to server
    socket.emit('chat message', newMessage);
  };

  render() {
    return (
      <Widget
        subtitle="GYST Messenger"
        handleNewUserMessage={this.handleNewUserMessage}
      />
    );
  }
}

export default Chat;
