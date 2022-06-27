import React from "react";
import { useEffect, useRef, useState, useContext} from "react";
import AuthContext from '../../store/auth-context.js';
import {collection, doc, getDocs,addDoc} from 'firebase/firestore';
import db from '../firebasedb'
import { query, orderBy, limit } from "firebase/firestore";  
import ChatInput from './ChatInput';
import Messages from './Messages'; 

require('./ChatApp.css');
const ChatApp=(props)=>{
    const[messages,setMessages]=useState([0]);
    const msgRef=collection(db, "msg");
    const UA = useContext(AuthContext);
 
    const  getMsg=async()=>{
        const dbRef = collection(db,"msg")
        const val = await getDocs(dbRef, orderBy("timestamp", "desc")); 
        const fromDB =val.docs;
       const y={};
        setMessages(fromDB.map((doc)=>({...doc.data(),id:doc.id})));
        
     
      }

    useEffect(() => {
        getMsg()
        
      }, []);
          
     
        
      const sendHandler = (message) =>{
        console.log("SEND")
        const messageObject={
          username:props.username,
          time:new Date().toLocaleString(),
          message
          
        };
        
        messageObject.fromMe = true;
        //console.log(messageObject)
        addMessage(messageObject);
      }
      const  addMessage=(message)=> {

        //console.log(message)
        setMessages({...messages,message});
       // console.log(messages)
         addDoc(msgRef,message)
      
      }
      return (
        <div className="container">
          <h3>React Chat App</h3>
          <Messages messages= {messages} />
          <ChatInput onSend={sendHandler} />
        </div>
      );
};
export default ChatApp;