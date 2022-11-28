import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase";
import { db,realtime_db } from "../Fire";
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
import Updatedraft from './updatedraft';
import Table from "./Table";

function Assistant_draftlist(props) {
  const { themecolor } = useContext(ContextApp)
  const user = firebase.auth().currentUser
  const [roleType, setRoleType] = useState('')
  const [cover, setCover] = useState("")
  const { handleLogout } = props
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
  const [inputs, setInputs] = useState({})
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handle_textarea_Change = (event) => {
    setTextarea(event.target.value)
  }

  const handleread = () => {

    var assistant_name = 'YiChia'
    //var assistant_name = user.displayName
    var userRef = realtime_db.ref("draft");
    const data = [];
    console.log("ori_data");
    console.log(data);
    userRef.orderByChild("assistant").equalTo(assistant_name).once("value", function (snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().status != "Pending") { 
          data.push({ key: childSnapshot.key, status: childSnapshot.val().status, username: childSnapshot.val().username, bcc: childSnapshot.val().bcc, 
            cc: childSnapshot.val().cc,
            message: childSnapshot.val().message, 
            recipient: childSnapshot.val().recipient,
            subject: childSnapshot.val().subject,
            status: childSnapshot.val().status,
          })
        }
      });
    });
    const [state, setState] = React.useState(data);
    // console.log(data);
    // return data;
    return (
      <table>--------------------finished-------------------
        <tr>
          <td>Executive</td>
          <td>Draft_Status</td>
          <td>Button</td>
        </tr>
        {state.map((item) => (
          // <tr key={item.id}>
          <tr>
            <td>{item.username}</td>
            <td>{item.status}</td>
            <td>
            <NavLink activeClassName='activelink'  to={{ pathname:'/updatedraft',aboutProps: {datakey:item.key,bcc: item.bcc, 
            cc: item.cc,
            message: item.message, 
            recipient: item.recipient,
            subject: item.subject,}}}exact><span><i class="far fa-bell"></i>Write Draft</span></NavLink>
            </td>
          </tr>
        ))}
      </table>
    );
  }

  const handleUnfinishedTaskRead = () => {
    

    var assistant_name = 'YiChia'
    //var assistant_name = user.displayName
    var userRef = realtime_db.ref("draft");
    const data = [];
    console.log("ori_data");
    console.log(data);
    userRef.orderByChild("assistant").equalTo(assistant_name).once("value", function (snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().status == "Pending") { 
          data.push({ key: childSnapshot.key, status: childSnapshot.val().status, username: childSnapshot.val().username, bcc: childSnapshot.val().bcc, 
            cc: childSnapshot.val().cc,
            message: childSnapshot.val().message, 
            recipient: childSnapshot.val().recipient,
            subject: childSnapshot.val().subject,
            status: childSnapshot.val().status,
          })
        }
      });
    });
    const [state, setState] = React.useState(data);
    // console.log(data);
    // return data;
    return (
      <table>------------------unfinished----------------
        <tr>
          <td>Executive</td>
          <td>Draft_Status</td>
          <td>Button</td>
        </tr>
        {state.map((item) => (
          // <tr key={item.id}>
          <tr>
            <td>{item.username}</td>
            <td>{item.status}</td>
            <td>
            <NavLink activeClassName='activelink'  to={{ pathname:'/updatedraft',aboutProps: {datakey:item.key,bcc: item.bcc, 
            cc: item.cc,
            message: item.message, 
            recipient: item.recipient,
            subject: item.subject,}}}exact><span><i class="far fa-bell"></i>Write Draft</span></NavLink>
            </td>
          </tr>
        ))}
      </table>
    );
  }

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
        <h2 style={{color: 'black'}}>Assistant draftlist</h2>
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
      <div class="taskList">
        {handleUnfinishedTaskRead()}
      </div>
      <div class="container">
        <div class="row">
          <div class="col align-self-center">
            {handleread()}
          </div>
        </div>
      </div>
      <div className="homeside">

      </div>
    </div>
  );
}
export default Assistant_draftlist;
