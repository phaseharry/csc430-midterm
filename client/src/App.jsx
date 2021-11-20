import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import ClassSearch from './ClassSearch';
import Login from './Login';
import AdminView from './AdminView';
import ProfessorView  from './ProfessorView';
import { AuthContext } from './contexts/AuthProvider';
import './App.css';
import SectionSignup from './SectionSignup';

function App() {
  const navigate = useNavigate();
  const { authenticated, checkIfAuthenticated, userInfo } = useContext(AuthContext);
  const [ranDefaultNav, setRanDefaultNav] = useState(false);
  
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
    if(authenticated && userInfo && !ranDefaultNav) {
      if(userInfo.role === 'student'){
        navigate('/student/course');
      } else if(userInfo.role === 'professor'){
        navigate('/prof');
      } else if(userInfo.role === 'admin'){
        navigate('/admin');
      }
      setRanDefaultNav(true);
    }
  }, [navigate, authenticated, userInfo])

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/prof" element={<ProfessorView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/login" element={<Login />}/>
          <Route path="student">
            <Route path="course" element={<ClassSearch />} />
            <Route path="course/:courseId/section/:sectionId" element={<SectionSignup />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
