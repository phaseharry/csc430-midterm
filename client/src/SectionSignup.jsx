import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pane, Button, toaster } from 'evergreen-ui'; 
import axios from 'axios';
import { AuthContext } from './contexts/AuthProvider';

const SectionSignup = (props) => {
  const { getAuthToken, userInfo } = useContext(AuthContext);
  const navigate = useNavigate()
  const { courseId, sectionId } = useParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const getSectionSignUpInfo = async () => {
      try {
        const authToken = await getAuthToken();
        const options = {
          headers: {
              authorization: `Bearer ${authToken}`
          }
        }
        const courseRes = await axios.get(`http://localhost:8080/api/search/courses/${courseId}`, options);
        const sectionRes = await axios.get(`http://localhost:8080/api/search/courses/${courseId}/sections/${sectionId}`, options);
        setSelectedCourse(courseRes.data);
        setSelectedSection(sectionRes.data);
      } catch (e) {
        console.error(e);
      }
    }
    getSectionSignUpInfo();
  }, [sectionId, courseId, getAuthToken])

  const register = async (e) => {
    e.preventDefault();
    try {
      const authToken = await getAuthToken();
      const options = {
        headers: {
            authorization: `Bearer ${authToken}`
        }
      }
      const body = {
        studentId: userInfo.id
      }
      await axios.post(`http://localhost:8080/api/register/courses/${courseId}/sections/${sectionId}`, body, options)
      setSelectedSection({
        ...selectedSection,
        availableSeats: selectedSection.availableSeats - 1
      })
      toaster.success('Class registration successful!');
      navigate('/student/course');
    } catch (e) {
      console.error(e);
      toaster.danger('Registration was not successful!')
    }
  }
  return (
    <Pane>
      {
        selectedCourse && selectedSection && 
        <>
          <h4>Signing up for {selectedCourse.name}, {selectedSection.sectionCode}</h4>
          <Pane>
            Available Seats: {selectedSection.availableSeats}
          </Pane>
          <Button marginTop="1rem" onClick={register}>Register</Button>
        </>
      }
    </Pane>
  )
}

export default SectionSignup;