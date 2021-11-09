import React,{ useContext, useState } from 'react';
import { TextInputField, Button, InlineAlert } from 'evergreen-ui'
import { AuthContext } from './contexts/AuthProvider';
import { useNavigate } from "react-router-dom";

function Login(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const attemptLogin = async () => {
    try {
      setError(null);
      const success = await login(email, password);
      if(success) navigate('/');
    } catch (e) {
      setError(e);
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
        {error && <InlineAlert intent="danger">{error}</InlineAlert>}
      </div>
    </>
  )
}

export default Login;