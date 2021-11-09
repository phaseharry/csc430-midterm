import React, { useState } from 'react';

export const AuthContext = React.createContext({
  authenticated: false,
  login: async () => {}
})

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
 
  const login = async (email, password) => {
    try {
      setAuthenticated(true);
      return true;
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