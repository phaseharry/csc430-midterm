import React from 'react';
import { useParams } from 'react-router-dom';
import { Pane } from 'evergreen-ui'; 

const SectionSignup = (props) => {
  const { courseId, sectionId } = useParams();
  console.log(courseId)
  console.log(sectionId)
  return (
    <Pane>
      Section Signup
    </Pane>
  )
}

export default SectionSignup;