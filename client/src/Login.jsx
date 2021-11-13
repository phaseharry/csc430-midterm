import React,{ useContext, useEffect, useState } from 'react';
import { TextInputField, Button, InlineAlert } from 'evergreen-ui'
import { AuthContext } from './contexts/AuthProvider';
import { useNavigate } from "react-router-dom";

function Login(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, authenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate])

  const attemptLogin = async () => {
    try {
      setError(null);
      const success = await login(email, password);
      if(success) navigate('/');
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  }

  return (
    <>
      <div>
        <TextInputField
          label="Email"
          placeholder="johndoe@jd.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          <TextInputField
          label="Password"
          placeholder="JohnDoesPassword"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={attemptLogin}>
          Login
        </Button>
        {error && <InlineAlert marginTop="20px" intent="danger">{error}</InlineAlert>}
      </div>
    </>
  )
}

export default Login;