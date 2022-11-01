import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Input from '../Input'
import Switches from '../Switches'
import {db} from '../../Fire'
import firebase from 'firebase'
function Actions (props) {
  const user = firebase.auth().currentUser
  const {notifibool, setNotifibool, convoid, creatorid}=props
  function changeNotifi(){
   
      if(user.uid===creatorid){
        db.collection('conversations').doc(convoid).update({
          notifications1: !notifibool
        })
     }else {
       db.collection('conversations').doc(convoid).update({
         notifications2: !notifibool
       })

     }
    
}
  return (
   <>
    <h2 o>Chat Configurations</h2>
    <hr/>
   <Switches title='Notifications' checked={notifibool}  function1={changeNotifi}/>
  </>
  )
}
export default Actions