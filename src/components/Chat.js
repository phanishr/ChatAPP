import react from "react";
 import { useEffect } from "react";
import db from './firebasedb.js'
import {collection, doc, getDocs,addDoc} from 'firebase/firestore'
import { useState, useRef} from "react";
import { useContext } from 'react';
import AuthContext from '../store/auth-context.js'
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
 const Chat=()=>{
    const UA = useContext(AuthContext);
   
    const addChat=async()=>{
        const curChat=chatRef.current.value;
        
        await addDoc(MessageRef,{text:curChat})
        
    }
     const chatRef=useRef();
    const [messages,setMessages]=useState([]);
    const [chat,setChat]=useState([]);
    const MessageRef=collection(db, "message");
    useEffect(()=>{
        const getMessages=async()=>{
            let arr=[]
            const data = await getDocs(MessageRef); 
           setMessages(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
           
          
        };
        getMessages();

    },[messages]);
   
   return(
       <div className="Chat">
           <div className="Messages">
               {messages.map((msg)=>{
                   return <p>{msg.text}</p>
               })}
           </div>
       <input type="text" ref={chatRef}/>
       <Button variant="contained" endIcon={<SendIcon />} onClick={()=>{
           addChat(chatRef.current.value);
           setMessages([...messages,chatRef.current.value]);
           chatRef.current.value="";
       }}>Send</Button>
       
       </div>  

   )
  
 }
 
 export default Chat;