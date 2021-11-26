import React,{ useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './index.css';
import { SelectMenu, Button, TextInputField, Pane } from 'evergreen-ui';
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
        <Pane marginBottom="0.5rem">
            <Link to="/student">
                <Button>Home</Button>
            </Link>    
        </Pane>
        { searchActive ?
        <>
        <Button onClick={() => {
            setCourses(null);
            setSearchActive(false);
        }}>
            Back
        </Button>
        <Pane>
            {courses && courses.map(c => {
                return (
                <Pane display="flex" flexDirection="column" border="0.1rem solid white" marginTop="0.9rem">
                    <span>{c.code} - {c.name}</span>
                    {c.Sections ? <>
                        {c.Sections.length === 0 ? 'There are no sections available for this course'
                        : c.Sections.map(s => {
                            return (
                                <Link to={`${c.id}/section/${s.id}`}>
                                    <Pane display="flex" flexDirection="column" fontSize="1rem" border="0.1rem solid white">
                                        <span>Section Code: {s.sectionCode}</span>
                                        <span>Available Seats: {s.availableSeats}</span>
                                    </Pane>
                                </Link>
                            )
                        })
                        }
                     </> : null
                }
                </Pane>)
            })}
            {courses && courses.length === 0 && <Pane>
                <h4>No Courses found</h4>
            </Pane>}
        </Pane>
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