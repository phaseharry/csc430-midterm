import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import ClassSearch from './ClassSearch';
import Login from './Login';
import { AuthContext } from './contexts/AuthProvider';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { authenticated, checkIfAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    checkIfAuthenticated();
    // eslint-disable-next-line
  }, []) 

  useEffect(() => {
    if(!authenticated) {
      navigate('/login');
    }
  }, [navigate, authenticated]);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {/* <Route path="/" element={<Home /> }/>  TO BE DONE*/}
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<ClassSearch/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
