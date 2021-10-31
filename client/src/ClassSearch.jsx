import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { Button, Pane, Text, majorScale, Select, option } from 'evergreen-ui'
//import e from 'cors';
function ClassSearch(props){
    const [subject,setSubject] = useState('')
    const [courseNumber, setCourseNumber] = useState('')
    const [courseAttribute,setCourseAttribute] = useState('')
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        async function onStartup(){
            const response = await axios.get('http://localhost:8080/api/subject/')
            const data = response.data;
            setSubjects(data)
            setSelectedSubject(data[0].id)
        }
        onStartup()
    }, [])

    async function onSearch(){
        const response = await axios.get(`http://localhost:8080/api/subject/${selectedSubject}/courses/`)
        const data = response.data;
        setCourses(data)

    }
   return (
    <>

    <h2>Class Search</h2>
    <h4>Select a Subject, Course Number, and Course Attribute</h4>
       <label /*style={{alignTextLeft}*/ for="subject">Subject</label>
       <Select width={150} height={50} onChange={(e) => setSelectedSubject (e.target.value)}>
           {subjects && subjects.map((subj) =>{
               return <option value= {subj.id} key={subj.id}>{subj.name}</option>
           })}
        {/*<option value="math" selected>
            Math
        </option>
        <option value="biology" selected>
         Biology
        </option>{*/}
    </Select>
       {/*<select onChange={(e) => setSelectedSubject (e.target.value)}>
           {subjects && subjects.map((subj) =>{
               return <option value= {subj.id} key={subj.id}>{subj.name}</option>
           })}
        </select>*/}
       {/*<input id = 'subject' onChange={(e) => setSubject(e.target.value)} value={subject}></input> */}
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