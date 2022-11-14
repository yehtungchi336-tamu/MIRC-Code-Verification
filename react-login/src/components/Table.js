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
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";
import Updatedraft from './updatedraft'

export default function Table(props) {
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
  
    var assistant_name = 'YaoWen'
    var userRef = realtime_db.ref("/draft");
    const data = [];
    userRef.orderByChild("assistant").equalTo(assistant_name).once("value", function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
            data.push({ key: childSnapshot.key, status: childSnapshot.val().status, username: childSnapshot.val().username, bcc: childSnapshot.val().bcc, 
            cc: childSnapshot.val().cc,
            message: childSnapshot.val().message, 
            recipient: childSnapshot.val().recipient,
            subject: childSnapshot.val().subject,})
        });
    });
    const [state, setState] = React.useState(data);
    return (
        <table>
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
                {/* to={{ pathname:'/updatedraft',state: {title:'from home page'}}} */}
                <NavLink activeClassName='activelink'  to={{ pathname:'/updatedraft',aboutProps: {datakey:item.key,bcc: item.bcc, 
                cc: item.cc,
                message: item.message, 
                recipient: item.recipient,
                subject: item.subject,}}}exact><span><i class="far fa-bell"></i>Write Draft</span></NavLink>
                {/* <Updatedraft arr={item.key}> test  </Updatedraft> */}
                </td>
                </tr>
            ))}
        </table>
    );
}