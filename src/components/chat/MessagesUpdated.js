import React from 'react';
import db from '../firebasedb'
import Message from './Message';
import {collection, doc, getDocs,addDoc} from 'firebase/firestore'

class MessagesUpdated extends React.Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
   
  }
  
 
  render() {
    
    // Loop through all the messages in the state and create a Message component
    console.log("MEssages is "+this.props.messages)
     const messages = this.props.messages.map((message, i) => {
     
        return (
          <Message
            key={i}
            username={message.username}
            message={message.message}
            fromMe={message.fromMe} />
        );
      });

    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    );
  }
}

MessagesUpdated.defaultProps = {
  messages: []
};

export default MessagesUpdated;