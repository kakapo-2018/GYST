import React, { Component } from 'react';

//Sockets
const io = require('socket.io-client');
const socket = io.connect(window.location.host);

//Store last message to compare user message just sent and not double the message
var lastmsg = '';

//Default chat image
var imgurl =
  'http://pngimages.net/sites/default/files/message-png-image-88638.png';

//Store current users image so the
var myProfileImage = '';

//Listen for incoming messages, check wether or not the message was sent by current user
socket.on('chat message', function(msg) {
  if (lastmsg != msg) {
    addResponseMessage(msg);
  }
});

socket.on('imgUrl', function(url) {
  //Dirty hack to change image as the widget doesn't provide image updates, this finds an
  //array of all images with the class 'rcw-avatar', finds the last one and replaces it
  //with the incoming message/image from sockets
  let avatarImageArray = document.getElementsByClassName('rcw-avatar');

  //If not our image do the replace
  if (url !== myProfileImage)
    document.getElementsByClassName('rcw-avatar')[
      avatarImageArray.length - 1
    ].src = url;
});

//Chat widget import
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class Chat extends Component {
  componentDidMount() {
    console.log(this.props);

    //Initial message in chat
    addResponseMessage('Chat connected!');
  }

  handleNewUserMessage = newMessage => {
    //Store outgoing message as last message
    lastmsg = this.props.chatuser + ': ' + newMessage;
    //Send message to server
    socket.emit('chat message', this.props.chatuser + ': ' + newMessage);
    myProfileImage = this.props.titleAvatar;
    socket.emit('imgUrl', this.props.profileAvatar);
  };

  render() {
    return (
      <Widget
        subtitle="GYST Messenger"
        profileAvatar={imgurl}
        titleAvatar={this.props.titleAvatar}
        handleNewUserMessage={this.handleNewUserMessage}
      />
    );
  }
}

export default Chat;
