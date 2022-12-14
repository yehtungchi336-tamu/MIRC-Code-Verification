import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase";
import { db,realtime_db } from "../Fire";
import DatePicker from "react-datepicker";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  useLocation
} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import emailjs from 'emailjs-com'
import Usersettings from "./Usersettings";
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";
import "react-datepicker/dist/react-datepicker.css";

function Assigntask(props) {
  const { themecolor } = useContext(ContextApp)
  const user = firebase.auth().currentUser
  const [roleType, setRoleType] = useState('')
  const [cover, setCover] = useState("")
  const { handleLogout } = props
  const [startDate, setStartDate] = useState(new Date());
  const links = ["comment", "notifications", "settings", "adddraft", "logout"]
  const [notifi, setNotifLength]=useState(0)
  const lnks = [
    { icon: "fal fa-comment-alt", txt: "Comment" },
    { icon: "fal fa-bell", txt: "Notifications" },
    { icon: "fal fa-cog", txt: "Settings" },
    { icon: "fal fa-cog", txt: "Adddraft" },
    { icon: "fal fa-sign-out", txt: "Logout" }
  ];
  const id =db.collection('users').doc().id
  const lnksrow =
    lnks &&
    lnks.map((lnk) => {
      return (
        <Hoverlink  icon={lnk.icon} txt={lnk.txt} handleLogout={handleLogout} />
      );
    });

    
  const [textarea, setTextarea] = useState();
  const [inputs, setInputs] = useState({});


  const handleChange = (event) => {
    setInputs(event.target.value)
  }

  const handle_textarea_Change = (event) => {
    setTextarea(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    console.log(startDate);
    const formattedDate = `${startDate.getMonth()+1}/${startDate.getDate()}/${startDate.getFullYear()}`;
    console.log(formattedDate);

    var tutorialsRef = realtime_db.ref("/draft");
    tutorialsRef.push({
      username: user.displayName,
      subject: "",//inputs.subject,
      recipient: "",//inputs.recipient,
      cc: "",//inputs.CC,
      bcc: "",//inputs.BCC,
      message: "",//textarea,
      assistant: inputs,
      deadline: formattedDate,
      comments: textarea,
      status: "Pending",
    }).then(
      (result) => {
        console.log(result.text);
        alert("SUBMISSION SUCCESS!");
      },
      (error) => {
        console.log(error.text);
        alert("SUBMISSION FAILED...", error);
      }
    );


  }


  // const Example = () => {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  //   );
  // };
/*
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
*/
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

  function determinetext() {
    if (user) {
        return determineTime() + " " + roleType + " " + user.displayName + " (login type: " + user.providerData[0].providerId + ")"
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
      <div class="container">
        <div class="row">
          <div class="col align-self-center">
          <form onSubmit={handleSubmit}>
            {/* <label>Assistant
            <input
              type="text"
              name="subject"
              value={inputs.subject || ""}
              placeholder=" enter email subject"
              onChange={handleChange}
            />
            </label> */}
            <label htmlFor="assistant">Assistant:
            <select placeholder="Please select assistant" name="assistant" onChange={handleChange}>
              <option value="">Please select assistant</option>
              <option value="Jinson">Jinson</option>
              <option value="YaoWen">YaoWen</option>
              <option value="Yaru">Yaru</option>
              <option value="YiChia">YiChia</option>
              <option value="Max">Max</option>
            </select>
          </label>

          
            {/* Date
            <DatePicker
              selected={ startDate }
              onChange={ handle_Date_Change }
              name="startDate"
              dateFormat="MM/dd/yyyy"
            /> */}

            
            <label>Comment<textarea value={textarea  || ""} rows="10" onChange={handle_textarea_Change} />
            </label>
              
            <label>Deadline
            {<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />}
            </label>
            <input type="submit" class="btn btn-primary" id='draft_submit' value='Submit' />
          </form>

          </div>
        </div>
      </div>
      <div className="homeside">

      </div>
    </div>
  );
}
export default Assigntask;