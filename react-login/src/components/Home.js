import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase";
import { db, realtime_db } from "../Fire";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
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
import linkage from "./linkage";
function Body(props) {
  const { themecolor } = useContext(ContextApp)
  const user = firebase.auth().currentUser
  const [cover, setCover] = useState("")
  //const [print_role, setRoleType] = useState("")
  const { handleLogout } = props
  const links = ["comment", "notifications", "settings", "logout"]
  const [notifi, setNotifLength]=useState(0)
  const lnks = [
    { icon: "fal fa-comment-alt", txt: "Comment" },
    { icon: "fal fa-bell", txt: "Notifications" },
    { icon: "fal fa-cog", txt: "Settings" },
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

  const form = useRef();
  function MailSending(e){
    e.preventDefault();

    emailjs.sendForm(
      "service_k0epgii",
      "template_a0nogel",
      form.current,
      "J14Ld2x5lECND_Nx1"
    )
    .then(
      (result) => {
        console.log(result.text);
        alert("SUCCESS!");
      },
      (error) => {
        console.log(error.text);
        alert("FAILED...", error);
      }
    );
  }

  const history = useHistory();
  const nav2emaillinkage = () => {
    history.push('/linkage');
  };



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

 /* 
  useEffect(()=>{
      if (user){
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const tmp = snap.data()
        setRoleType(tmp.msgids)
        console.log("home set role.." + tmp.msgids)
      })
      }
    })
*/
  function determinetext() {
    if (user) {
        return determineTime() + " " + user.msgids + " " + user.displayName + " (login type: " + user.providerData[0].providerId + ")"
    }
  }

  return (

    <div className="home">
      <div className="header flex sb">
        <h2 className="marginBottom">{determinetext()}</h2>
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
      <div>
        {/*
        <button className="btn btn-success" onClick={nav2emaillinkage}>
          Email Linkage
        </button>
        */}
      </div>
      {/*
      <div class="container">
        <div class="row">
          <div class="col align-self-center">
            <form action="" ref={form} onSubmit={MailSending}> 
              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  type="subject"
                  name="subject"
                  class="form-control-lg "
                  id="subject"
                  placeholder=" enter email subject"
                />
              </div>

              <div class="form-group">
                <label for="recipient">TO: </label>
                <input
                  type="recipient"
                  name="recipient"
                  class="form-control-lg"
                  id="recipient"
                  placeholder=" enter the recipient's address"
                />
              </div>

              <div class="form-group">
                <label for="cc">CC:</label>
                <input
                  type="cc"
                  name="cc"
                  class="form-control-lg"
                  id="cc"
                  placeholder=" enter the Carbon Copy"
                />
              </div>

              <div class="form-group">
                <label for="bcc">BCC:</label>
                <input
                  type="bcc"
                  name="bcc"
                  class="form-control-lg"
                  id="bcc"
                  placeholder=" enter the Blind Carbon Copy"
                />
              </div>

              <div class="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  class="form-control-lg"
                  name="message"
                  id="message"
                  rows="5"
                ></textarea>
              </div>
                
              <button type="submit" class="btn btn-primary" id="submit_form">Submit</button>

            </form>
          </div>
        </div>
      </div>
      */}
      <div className="homeside">

      </div>
    </div>
  );
}
export default Body;
