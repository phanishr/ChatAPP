import db from '../firebasedb'
import React from 'react';
import io from 'socket.io-client';
import {collection, doc, getDocs,addDoc} from 'firebase/firestore'
import config from './config';
import Messages from './Messages';
import ChatInput from './ChatInput';
import Message from './Message';
import {  useContext } from 'react';
import AuthContext from '../../store/auth-context.js'
import { query, orderBy, limit } from "firebase/firestore";  
require('./ChatApp.css');


class ChatApp extends React.Component {
  componentDidMount() {
  
    // Changing the state after 2 sec
    // from the time when the component
    // is rendered
    this.interval = setInterval(() => this.getMsg(), 1000);
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

 getMsg=async()=>{
   const dbRef = collection(db,"msg")
    const val = await getDocs(dbRef, orderBy("timestamp", "desc")); 
    const fromDB = val.docs
    console.log(val.docs)
   // const st = fromDB.docs.map((doc)=>(this.setState({messages:[{...doc.data()}]})))
   const y={};
  // console.log(fromDB)
   //fromDB.docs.map((obj)=>{
    //console.log(obj.data());
    //const{username,message,fromMe} = obj.data();
    //this.setState({messages:[{username:username,message:message,fromMe:fromMe}]})
   //})
   this.setState({messages:fromDB.map((doc)=>({...doc.data(),id:doc.id}))});
           

  
   //console.log(this.state)
  // data.docs.map((doc)=>(console.log(doc.data())));
  return 1 ;
   
  
};
  msgRef=collection(db, "msg");
  socket = {};

  constructor(props) {
    super(props);
    //console.log("INIT is "+this.getMsg())

    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}`}).connect();
    //console.log(this.socket)
    
    
   
    // Listen for messages from the server
    this.socket.on('server:message', message => {
        console.log("Listening")
      this.addMessage(message);
      //console.log(this.socket)
    });
  }

  
  sendHandler(message) {
    const messageObject={
      username: this.props.username,
      time:new Date().toLocaleString(),
      message
      
    };
    

    // Emit the message to the server
    //this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage=(message)=> {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    //console.log(messages)
    this.setState({ messages });
     addDoc(this.msgRef,message)
  }

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;