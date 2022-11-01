import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { db } from "../Fire";
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
import Usersettings from "./Usersettings";
import { ContextApp } from "../ContextAPI";
import Calendars from "./Calendars";
import Hoverlink from "./Hoverlink";
import ElapsedTime from "./Elapsedtime";
import ReactTimeAgo from 'react-time-ago'
function Notifications(props) {
  const { themecolor } = useContext(ContextApp);
  const {setChatuser} = props
  const user = firebase.auth().currentUser;
  const [cover, setCover] = useState("");
  const [notifi, setNotifLength]=useState(0)
  const [notifications, setNotifications]=useState([])

  const imageRegexB = /(?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)/g;

  function determineNotiMsg(msg){
    if(msg.gif){
      return 'Sent a GIF'
    }else if(msg.file){
      return 'Sent a file'
    }else if(msg.video){
      return 'Sent a video'
    }else if(msg.base64||msg.notifimsg.match(imageRegexB) != null){
      return 'Sent a photo'
    }
    else {
      return msg.notifimsg
    }
  }
  const id =db.collection('users').doc().id
  function deleteNotifi(el){
      notifications && notifications.map(noti=>{
        if(el.notifiid===noti.notifiid){
          let itemindex = notifications.indexOf(noti)
          notifications.splice(itemindex, 1)
          db.collection('notifications').doc(user.uid).update({
            notifications: notifications
          })
        }
      })
  }
  function deleteAllNotifi(){
    db.collection('notifications').doc(user.uid).update({
      notifications: []
    })
  }
  const notificationsrow = notifications && notifications.slice(0).reverse().map(noti=>{
    return <div ><Link to={'/chat/'+noti.id} onClick={()=>{setChatuser(noti.senderid); deleteNotifi(noti)}}>
    <div className="notification flex">
      <div className="userprofile">
        <img src={cover} alt=""/>
      </div>
     <strong> <p>From: {noti.sender}</p></strong>
      <span>Message: {determineNotiMsg(noti)}</span>
      <span>Sent: <ReactTimeAgo date={noti.notifidate.toDate()} locale='en-US'/></span>
      
   </div>
    </Link>
    <i className="fal fa-times" onClick={()=>deleteNotifi(noti)}></i></div>
  })
  useEffect(()=>{
    
    db.collection('notifications').doc(user.uid).onSnapshot(snap=>{
      const notifi = snap.data()
      setNotifLength(notifi.notifications.length)
      setNotifications(notifi.notifications)
      setCover(notifi.notifications.cover)
    }) 
  },[])
  return (
    <div className="notificationspage">
      <div className="tp">
      <div className="header flexrow ">
      <i class="far fa-inbox" style={{color: themecolor, cursor: 'auto'}}></i>
        <h2>Your Notifications</h2>
      </div>   
       <hr style={{width: '100%'}}/>
      </div>
      <div className="notificationsrow flex">
        <div className='notifiBtnCont'>
          <button className=' themeBtn notifiBtn' onClick={()=>deleteAllNotifi()}>Clear Notifications </button>
          </div>
        {notificationsrow}
      </div>
    </div>
  );
}
export default Notifications;
