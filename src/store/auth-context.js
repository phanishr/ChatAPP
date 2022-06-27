import React , {useState} from 'react';
const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
});

export const AuthProvider = props=>{
    const initToken = localStorage.getItem('token');
    const[token,setToken]=useState(initToken);
    const isUserLoggedIn =!!token;
    const loginHandler=(token)=>{setToken(token)
    localStorage.setItem('token',token)
        setTimeout(logoutHandler, 300000);
}
    const logoutHandler=()=>{
        setToken(null);
    localStorage.removeItem('token')
}
    const ContextValue = {
        token:token,
        isLoggedIn:isUserLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
    }
        return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>;


        
};
export default AuthContext;