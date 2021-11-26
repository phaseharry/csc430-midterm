import React, { useState, useCallback } from 'react';
import axios from 'axios';

export const CourseContext = React.createContext({
  courses: []
})

export const CourseProvider = ({ children }) => {
  

  return <CourseContext.Provider 
    value={{

    }}
  >
    {children}
  </CourseContext.Provider>
}