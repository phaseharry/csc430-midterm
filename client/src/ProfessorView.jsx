import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthProvider';

const ProfessorView = (props) => {
  const { userInfo } = useContext(AuthContext);
  return (
    <div>
      <h3>{userInfo && userInfo.firstName && userInfo.lastName && `Welcome Professor: ${userInfo.firstName} ${userInfo.lastName}`}</h3>
    </div>
  )
}

export default ProfessorView;