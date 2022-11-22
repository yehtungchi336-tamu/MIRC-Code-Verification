import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase";
import { db, realtime_db, storage } from "../Fire";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";
import "firebase/auth";

export default Assigntask;

function Assigntask(props) {  
  //const ref = firebase.storage().ref();
  const [progrss, setProgrss] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  //
  const {v4 : uuidv4} = require('uuid')
  // Initialize Firebase Authentication and get a reference to the service
  const auth = firebase.auth();
  //Get current user through authentication
  const user = auth.currentUser;


  const { themecolor } = useContext(ContextApp)
  //const user = firebase.auth().currentUser
  const [roleType, setRoleType] = useState('')
  const [cover, setCover] = useState("")
  const { handleLogout } = props
  const [notifi, setNotifLength]=useState(0)
  const lnks = [
    { icon: "fal fa-comment-alt", txt: "Comment" },
    { icon: "fal fa-bell", txt: "Notifications" },
    { icon: "fal fa-cog", txt: "Settings" },
    { icon: "fal fa-cog", txt: "Adddraft" },
    { icon: "fal fa-sign-out", txt: "Logout" }
  ];

  const [textarea, setTextarea] = useState();
  const [inputs, setInputs] = useState({})
  const [assistantId, setAssistant] = useState({})
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    console.log(user.displayName);
    console.log(inputs.subject);
    console.log(inputs.recipient);

    var tutorialsRef = realtime_db.ref("task/" + user.uid);
    tutorialsRef.push({
      userId: user.uid,
      executive: user.displayName,
      assistant: inputs.recipient,
      task: inputs.subject,
      date: Date(),
      status: "pending",
    })
    .then(
      (result) => {
        console.log(result.text);
        alert("Task Adding SUCCESS!");
      },
      (error) => {
        console.log(error.text);
        alert("Task Adding FAILED...", error);
      }
    );


  }

  const handleread = () => {
    var userRef = realtime_db.ref("task/" + user.uid);
    const preTasks = [];

    userRef.orderByChild("date").once("value", function (snapshot) {
      snapshot.forEach(function(childSnapshot) {
        //if (childSnapshot.val().status == "Pending") {         
            preTasks.push({
              status: childSnapshot.val().status, 
              executive: childSnapshot.val().executive,
              assistant: childSnapshot.val().assistant,
              task: childSnapshot.val().task,
              date: childSnapshot.val().date,
            })
       // }
      });
    });
    ///////
    const [state, setState] = React.useState(preTasks);
    console.log(preTasks);
    // return data;
    return (
      <table>
        <tr>
          <td>Task</td>
          <td>Assistant</td>
          <td>Status</td>
        </tr>
        {state.map((item) => (
          // <tr key={item.id}>
          <tr>
            <td>{item.executive}</td>
            <td>{item.assistant}</td>
            <td>{item.status}</td>
            <td>
            <NavLink activeClassName='activelink'  to={{ 
              pathname:'/executive_updatedraft',aboutProps: {
                datakey:item.key,
                bcc: item.bcc, 
                cc: item.cc, 
                message: item.message, 
                recipient: item.recipient, 
                subject: item.subject,
              }
            }}exact><span><i class="far fa-bell"></i>Review Draft</span></NavLink>
            </td>
          </tr>
        ))}
      </table>
    );
  }


  useEffect(()=>{
    if (user){
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const tmp = snap.data()
      setRoleType(tmp.role)
      //roleType = tmp.role
      console.log("home set role.." + tmp.role)
    })
    }
  },[])

  function determineTime() {
    const d = new Date();
    if (d.getHours() >= 6 && d.getHours() < 12) {
      return "Good Morning,";
    } else if (d.getHours() >= 12 && d.getHours() < 17) {
      return "Good Afternoon,";
    } else if (d.getHours() >= 17 && d.getHours() < 20) {
      return "Good Evening,";
    } else if (d.getHours() >= 20 && d.getHours() <= 23) {
      return "Good Night,";
    } else if (d.getHours() >= 0 && d.getHours() < 6) {
      return "Good Night,";
    }
  }

  return (
    <div className="home">
      <div className="header flex sb">
        {/*<h2 className="marginBottom">{determinetext()}</h2>*/}
        <h2 style={{color: 'black'}}>Assign Task</h2>
      </div>
      
      <div className="flex fe sticky">
        <div className="gridobjects  bs marginBottom">
          <Hoverlink
            icon="fal fa-sign-out"
            txt="Logout"
            classNames="blueback all flexrow sa"
            lnk="/"
            clk={() => props.handleLogout()}
          />
        </div>
      </div>
      <div class="previous tasks">
        previous tasks
        
      </div>
      <div class="container">
        <div class="row">
          <div class="col align-self-center">
          Add New Task 
          <form onSubmit={handleSubmit}>
            <label>Subject
            <input 
              type="text" 
              name="subject" 
              value={inputs.subject || ""} 
              placeholder=" enter task"
              onChange={handleChange}
            />
            </label>
            <label>To assistant
              <input 
                type="text" 
                name="recipient" 
                value={inputs.recipient || ""} 
                placeholder=" enter the assistant"
                onChange={handleChange}
            />
            </label>
            <input type="submit" class="btn btn-primary" id='draft_submit' value='Submit'/>            
          </form>
          </div>
        </div>
      </div>
      <div className="homeside"></div>
    </div>
  );
}



