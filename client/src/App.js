import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import ClassSearch from './ClassSearch';
import Login from './Login';

function App() {
  const [authenticated, setAuthenicated] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    if(!authenticated) {
      navigate('/login')
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
