import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import ClassSearch from './ClassSearch';
import Login from './Login';
import AdminView from './AdminView';
import ProfessorView  from './ProfessorView';
import { AuthContext } from './contexts/AuthProvider';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { authenticated, checkIfAuthenticated, userInfo } = useContext(AuthContext);
  
  useEffect(() => {
    checkIfAuthenticated();
    // eslint-disable-next-line
  }, []) 

  useEffect(() => {
    if(!authenticated) {
      navigate('/login');
    }
  }, [navigate, authenticated]);

  useEffect(() => {
    if(authenticated && userInfo) {
      if(userInfo.role === 'student'){
        navigate('/');
      } else if(userInfo.role === 'professor'){
        navigate('/prof');
      } else if(userInfo.role === 'admin'){
        navigate('/admin');
      }
    }
  }, [navigate, authenticated, userInfo])

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/prof" element={<ProfessorView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<ClassSearch/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
