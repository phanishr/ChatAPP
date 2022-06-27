import classes from './ProfileForm.module.css';
import { useRef, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context.js'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import db from '../firebasedb'
import {collection, doc, getDocs,addDoc} from 'firebase/firestore';
var mailLoggedIn;
const ProfileForm = () => {
  const dbRef = collection(db,"profile")
  const imagereference = useRef();
  const [mail,setEmail]=useState([]);
  const [images,setImages]=useState([]);
  const [photo,setPhoto]=useState([]);
  const UA = useContext(AuthContext);
  const newPswd = useRef();
  const history = useHistory();
  useEffect(() => {
    getUser()
    
  }, []);
  const submitHandler = e=>{
    e.preventDefault();
    const enteredNewPswd = newPswd.current.value;
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwmA9mfIARfQE5ny90zyP8QAihNvOW05w'
    fetch(url,{method:'POST',
    body:JSON.stringify({
      idToken:UA.token,
      password:enteredNewPswd,
      returnSecureToken:true
    }),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(data=>{
    console.log(data)
    history.replace("/")
  })
  }

function handleChange(event) {
  console.log(event.target.files[0])
   console.log("P url is"+URL.createObjectURL(event.target.files[0]))
   //addDoc(this.msgRef,event.target.files[0])
    updateUser(URL.createObjectURL(event.target.files[0]));
    imagereference.current.value=""
    
  }
 
  const  getUser = ()=>{
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBwmA9mfIARfQE5ny90zyP8QAihNvOW05w';
    fetch(url,{method:'POST',
    body:JSON.stringify({
      idToken:UA.token,
    }),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(response=>response.json()).then((data)=>{
    const users = data.users[0];
    const{email, photoUrl} = users
    console.log(data)
    console.log(email);
    setEmail(email)
    setPhoto(photoUrl)
    console.log("Photo URL is"+photoUrl)
    mailLoggedIn=email;
  }).catch(e=>{
    console.log(e);
  })
  }
  getUser();

  const  updateUser = (linkUrl)=>{
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwmA9mfIARfQE5ny90zyP8QAihNvOW05w';
    fetch(url,{method:'POST',
    body:JSON.stringify({
      idToken:UA.token,
      photoUrl:linkUrl,
      returnSecureToken:true
    }),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(response=>response.json()).then((data)=>{
    setImages({link:linkUrl});
  }).catch(e=>{
    console.log(e);
  })
  }

  return (
    <>
    <input type="file" ref={imagereference} onChange={handleChange}/>
    <br/>
    <img accept="image/gif, image/jpeg, image/png" src={photo} style={{height:'10vw',width:'10vw',borderRadius:'5vw',objectFit:'cover'}}/>
    <p>Email : {mail}</p>
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPswd}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
    </>
    
  );

}

export default ProfileForm;
export {mailLoggedIn};
