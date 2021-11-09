import React, { useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext({
  authenticated: false,
  login: async () => {},
  userInfo: null,
})

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
 
  const login = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/login`, {
        email, 
        password
      });
      const data = response.data;
      console.log(data);
      if(data){
        setAuthenticated(true);
        setUserInfo(data);
        return true;
      }
    } catch(e){
      throw e;
    }
  }

  return <AuthContext.Provider 
    value={{
      authenticated,
      login
    }}
  >
    {children}
  </AuthContext.Provider>
}