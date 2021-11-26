import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Pane, Button } from 'evergreen-ui';
import { AuthContext } from './contexts/AuthProvider';
import './App.css';

function MyCourses() {
  const { getAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const getMyCourses = async () => {
      const authToken = getAuthToken();
      const response = await axios.get('http://localhost:8080/api/user/course-registered', {
          headers: {
              authorization: `Bearer ${authToken}`
          }
      });
      const data = response.data;
      setMyCourses(data);
    }
    getMyCourses();
  }, [getAuthToken])

  return (
    <Pane>
      <h4>Your Registered Courses</h4>
      <Button onClick={(e) => {
        e.preventDefault();
        navigate('/student')
      }}>Back</Button>
      <Pane display="flex" flexDirection="column" marginTop="1rem">
        {myCourses.length === 0 ? <h5>You have not registered to any courses</h5> : 
        <Pane>
          {myCourses.map(c => {
            return (
              <Pane display="flex" flexDirection="column" fontSize="1rem" border="0.1rem solid white">
                <span>{c.course.code}: {c.course.name}</span>
                <span>Section: {c.section.sectionCode}</span>
              </Pane>
            )
          })}
        </Pane>
        }
      </Pane>
    </Pane>
  )
}

export default MyCourses;
