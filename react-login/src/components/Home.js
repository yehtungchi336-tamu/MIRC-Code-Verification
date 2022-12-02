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


  useEffect(()=>{
      if (user){
          if (!user.msgids)
          {
            props.handleLogout()
            return;
          }
      }
    })

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

      <div className="homeside">

      </div>
    </div>
  );
}
export default Body;
