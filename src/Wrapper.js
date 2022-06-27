// AppWrapper.jsx
import React from 'react'
import App from './App'
import AuthContext, {AuthProvider} from './store/auth-context'


const AppWrapper = () => {
  return (

    <AuthProvider>
      <App />
    </AuthProvider>

  )
}
export default AppWrapper;
