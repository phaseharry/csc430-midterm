import React,{useState, useEffect} from 'react';
import axios from 'axios';
function ClassSearch(props){
    const [subject,setSubject] = useState('')
    const [courseNumber, setCourseNumber] = useState('')
    const [courseAttribute,setCourseAttribute] = useState('')
    const [subjects, setSubjects] = useState(null)

    useEffect(() => {
        async function onStartup(){
            const response = await axios.get('localhost:8080/api/subject/')
            const data = response.data;
            setSubjects(data)
        }
        onStartup()
    }, [])

    async function onSearch(){
        const response = await axios.get('localhost:8080/api/subject/')
        const data = response.data;
        setSubjects(data)

    }
   return (
    <>
       <input style={{ color:'red' }} onChange={(e) => setSubject(e.target.value)} value={subject}></input>
       <input onChange={(e) => setCourseNumber(e.target.value)} value={courseNumber}></input>
       <input onChange={(e) => setCourseAttribute(e.target.value)} value={courseAttribute}></input>
       <button onClick={onSearch}>Search</button>
       {subjects && subjects.map((subj) => {
           console.log(subj)
           return <span>{subj.name}</span>
       })}
    </>
   )
}
export default ClassSearch;