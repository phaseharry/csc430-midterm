import React, { useState, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext({
  authenticated: false,
  login: async () => {},
  checkIfAuthenticated: async () => {},
  userInfo: null,
})

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
 
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/auth/login', {
        email, 
        password
      });
      const data = response.data;
      if(data && data.accessToken){
        const userData = await axios.get('http://localhost:8080/api/user/info', {
          headers: {
            authorization: `Bearer ${data.accessToken}`
          }
        })
        if(userData.data){
          setAuthenticated(true);
          setUserInfo(userData.data);
          localStorage.setItem('token', data.accessToken);
        }
        return true;
      }
    } catch(e){
      throw e;
    }
  }

  const checkIfAuthenticated = useCallback(async () => {
    const token = localStorage.getItem('token');
    if(token){
      // check if token is valid through backend
      const userData = await axios.get('http://localhost:8080/api/user/info', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(userData.data){
        setAuthenticated(true);
        setUserInfo(userData.data);
      } else {
        setAuthenticated(false);
        localStorage.removeItem('token');
      }
      return;
    }
    setAuthenticated(false);
  }, [setAuthenticated, setUserInfo])

  return <AuthContext.Provider 
    value={{
      authenticated,
      checkIfAuthenticated,
      userInfo,
      login
    }}
  >
    {children}
  </AuthContext.Provider>
}