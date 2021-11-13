import React,{ useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './index.css';
import { SelectMenu, Button, TextInputField } from 'evergreen-ui';
import { AuthContext } from './contexts/AuthProvider';

function ClassSearch(props){
    const [courseNumber, setCourseNumber] = useState('');
    const [courseName, setCourseName] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const [courses, setCourses] = useState(null);
    const [searchActive, setSearchActive] = useState(false);

    const { getAuthToken } = useContext(AuthContext);
    useEffect(() => {
        async function onStartup(){
            const authToken = getAuthToken();
            const response = await axios.get('http://localhost:8080/api/subject/', {
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            });
            const data = response.data;
            setSubjects(data);
        }
        onStartup();
    }, [getAuthToken]);

    async function onSearch(){
        try {
            let queryString = '';
            if(selectedSubject) queryString += `subjectId=${selectedSubject}&`;
            if(courseNumber) queryString += `courseNumber=${courseNumber}&`;
            if(courseName) queryString += `courseName=${courseName}`;
            const authToken = getAuthToken();
            const response = await axios.get(`http://localhost:8080/api/search/courses?${queryString}`, {
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            });
            const data = response.data;
            setCourses(data);
            setSearchActive(true);
        } catch (e) {
            setSearchActive(false);
            console.error(e);
        }
    }

    return (
    <>
        <h2>Class Search</h2>
    {
        searchActive ?
        <>
        <Button>
            Back
        </Button>
        <div>Search Is Active</div>
        </>:
       <>
        <h4>Select a Subject, Course Number, and Course Attribute</h4>
        <label for="subject">Subject</label>
        <SelectMenu 
            options={subjects && subjects.map(subj => ({ label: subj.name, value: subj.id }))}    
            selected={selectedSubject}
            hasFilter={false}
            hasTitle={false}
            onSelect={(item) => setSelectedSubject(item.value)}
            height={subjects ? subjects.length * 33 : 0}
            closeOnSelect
        >
            <Button width="150px">{(selectedSubject) && subjects && subjects.find(s => s.id === selectedSubject).name || 'Select Subject'}</Button>
        </SelectMenu>
        <TextInputField
            marginTop="20px"
            label="Course Number"
            placeholder="Ex. 200"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
        />
        <TextInputField
            label="Course Name"
            placeholder="Ex. Calculus 1"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
        />
       <Button onClick={onSearch}>Search</Button>
       {courses && courses.map((course) => {
           return <span>{course.name}</span>
       })}
       </>
    }
    </>
   )
}

export default ClassSearch;