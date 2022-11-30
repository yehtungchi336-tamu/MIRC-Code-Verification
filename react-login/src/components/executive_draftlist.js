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
  useLocation,
  useHistory
} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import emailjs from 'emailjs-com'
import Usersettings from "./Usersettings";
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";
//import Table from 'react-bootstrap/Table';

function Executive_draftlist(props) {
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

    var executive_name = "Yaru Yang";//user.displayName;
    var userRef = realtime_db.ref("/draft");
    const data = [];

    userRef.orderByChild("username")
    .equalTo(executive_name)
    .on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().status !== "Pending") {         
          data.push({
            key: childSnapshot.key, 
            status: childSnapshot.val().status, 
            username: childSnapshot.val().username, 
            bcc: childSnapshot.val().bcc, 
            cc: childSnapshot.val().cc,
            message: childSnapshot.val().message, 
            recipient: childSnapshot.val().recipient,
            subject: childSnapshot.val().subject,
            assistant: childSnapshot.val().assistant,
          })
        }
      });
    });

    // userRef.orderBy('username')
    // .startAt(executive_name).endAt(executive_name)
    // .orderBy('lead')                  // !!! THIS LINE WILL RAISE AN ERROR !!!
    // .startAt('Jack Nicholson').endAt('Jack Nicholson')
    // .on("value", function (snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //       data.push({ key: childSnapshot.key, status: childSnapshot.val().status, username: childSnapshot.val().username, bcc: childSnapshot.val().bcc, 
    //         cc: childSnapshot.val().cc,
    //         message: childSnapshot.val().message, 
    //         recipient: childSnapshot.val().recipient,
    //         subject: childSnapshot.val().subject,
    //         assistant: childSnapshot.val().assistant,
    //       })
    //   });
    // });

    const [state, setState] = React.useState(data);
    // return data;
    return (
      <div>
        <table id="draftlist_table">
          <thead>
            <tr>
              <th>Executive</th>
              <th>Assistant</th>
              <th>Status</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.username}</td>
                    <td>{item.assistant}</td>
                    <td>{item.status}</td>
                    <td>
                      <NavLink activeClassName='activelink' 
                      to={{ pathname:'/executive_updatedraft',
                      aboutProps: {
                      datakey:item.key,
                      bcc: item.bcc, 
                      cc: item.cc,
                      message: item.message, 
                      recipient: item.recipient,
                      subject: item.subject,}}} exact>
                        <span><i class="far fa-bell"></i>Review Draft</span>
                      </NavLink>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }

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
        <h2 style={{color: 'black'}}>Executive draftlist</h2>
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
            { handleread()}
          </div>
        </div>
      </div>
      <div className="homeside">

      </div>
    </div>
  );
}
export default Executive_draftlist;
