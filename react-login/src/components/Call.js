import React, { useState, useEffect, useContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import Videochat from './Videochat'

function Call() {
  const [database, setDatabase] = useState(null);
  const [connectedUser, setConnectedUser] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [localConnection, setLocalConnection] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  function startCall(username, userToCall){
  
  }
  function onLogin (username){

  }
  function setLocalVideoRef (ref){
    remoteVideoRef=ref
  }
  function setRemoteVideoRef(ref){
    localVideoRef = ref
  }
  function handleUpdate (notif,username){

  }
  useEffect(()=>{
  },[])
  return <div className="call">
      <Videochat startCall={startCall} onLogin={onLogin} setLocalVideoRef={setLocalVideoRef} setRemoteVideoRef={setRemoteVideoRef} connectedUser={connectedUser}/>   
  </div>
}
export default Call;
