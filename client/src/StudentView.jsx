import React, { useContext } from 'react';
import { Pane} from 'evergreen-ui';
import { Link } from 'react-router-dom'
import { AuthContext } from './contexts/AuthProvider';


const StudentView = (props) => {
  const { userInfo } = useContext(AuthContext);
  return (
    <Pane>
      <h3>{userInfo && userInfo.firstName && userInfo.lastName && `Welcome Student: ${userInfo.firstName} ${userInfo.lastName}`}</h3>
      <Pane display="flex" flexDirection="column" justifyContent="space-around">
        <Link to="/student/course-search">
          Class Search
        </Link>
        <Link to="/student/my-courses">
          Registered Courses
        </Link>
      </Pane>
    </Pane>
  )
}

export default StudentView;