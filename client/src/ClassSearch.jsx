import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { SelectMenu, Button } from 'evergreen-ui';

function ClassSearch(props){
    const [courseNumber, setCourseNumber] = useState('');
    const [courseAttribute,setCourseAttribute] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        async function onStartup(){
            const response = await axios.get('http://localhost:8080/api/subject/');
            const data = response.data;
            setSubjects(data);
            setSelectedSubject(data[0].id);
        }
        onStartup();
    }, []);

    async function onSearch(){
        const response = await axios.get(`http://localhost:8080/api/subject/${selectedSubject}/courses/`);
        const data = response.data;
        setCourses(data);
    }

    return (
    <>
    <h2>Class Search</h2>
    <h4>Select a Subject, Course Number, and Course Attribute</h4>
       <label for="subject">Subject</label>
        <SelectMenu 
            options={subjects.map(subj => ({ label: subj.name, value: subj.id }))}    
            selected={selectedSubject}
            hasFilter={false}
            hasTitle={false}
            onSelect={(item) => setSelectedSubject(item.value)}
        >
            <Button width="150px">{(selectedSubject) && subjects.find(s => s.id === selectedSubject).name || 'Select Subject'}</Button>
        </SelectMenu>
       <label for="courseNumber">Course Number</label>
       <input id ='courseNumber'onChange={(e) => setCourseNumber(e.target.value)} value={courseNumber}></input> 
       <label for="courseAttribute">Course Attribute</label>
       <input id = 'courseAttribute'onChange={(e) => setCourseAttribute(e.target.value)} value={courseAttribute}></input> <br /> <br />
       <button onClick={onSearch}>Search</button>
       {courses && courses.map((course) => {
           console.log(course)
           return <span>{course.name}</span>
       })}
    </>
   )
}

export default ClassSearch;