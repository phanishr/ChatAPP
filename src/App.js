import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import EditProfile from './pages/EditProfile';
import HomePage from './pages/HomePage';
import Gallery from './pages/Gallery.js';
import Chat from './components/chat/ChatApp.js';
import NotFound from './pages/NotFound.js'
import AuthContext, {AuthProvider} from './store/auth-context.js'
function App() {
  const UA = useContext(AuthContext);
  const isLoggedIn = UA.isLoggedIn;
  const logOutHandler = ()=> UA.logout();
 // console.log("Tok is "+isLoggedIn)

 const  getUser = async()=>{
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBwmA9mfIARfQE5ny90zyP8QAihNvOW05w';
  fetch(url,{method:'POST',
  body:JSON.stringify({
    idToken:UA.token,
  }),
  headers:{
    'Content-Type':'application/json'
  }
}).then(response=>response.json()).then((data)=>{
  const users =  data.users[0];
  const{email, photoUrl} =  users
  console.log(email); 
  return email;
}).catch(e=>{
  console.log(e);
})
}
  return (
    
    <Layout>
      <Switch>
        <Route path='/' exact>

          <HomePage />
        </Route>
     
     <Route path='/auth'>
          <AuthPage />
        </Route>


        {isLoggedIn && <Route path='/gallery'>
          <Gallery />
        </Route>
}
{isLoggedIn && <Route path='/editprofile'>
          <EditProfile />
        </Route>
}
       <Route path='/chat'>
       {isLoggedIn && <Chat username={'getUser()'}/>}
       </Route>
       
       <Route path='/profile'>
       {isLoggedIn && <UserProfile />}
       {!isLoggedIn && <AuthPage />}
        </Route>


<Route path="*">
  <Redirect to='/'/>
  
</Route>
         
      </Switch>
    </Layout>
   
  );
}

export default App;
