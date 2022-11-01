import React, { Component, useContext, useState } from 'react'
import { saveAs } from 'file-saver';

import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import styled from 'styled-components'  
import { ContextApp } from '../ContextAPI'
import firebase from 'firebase'
import { db } from '../Fire'

const Iconspecial = styled.i `
color: ${props=>props.color};
background-color: white;
&:hover {
  color: white;
  background-color:  ${props=>props.color};
}
`
function Recorder(props) {
  
  const user = firebase.auth().currentUser
  const {convoid, progressbar, progresswidth}=props
  const {themecolor}= useContext(ContextApp)
  const [record, setRecord] = useState(null)
  const [audio, setAudio] = useState('blob:https://5guz4.csb.app/2ff8746b-44d6-4c3f-b531-480291e7aa84')
  const [update, setUpdate]=useState(0)
  const [clicked, setClicked]=useState(false)
  const [reset, setReset]=useState(false)
  let id = db.collection('conversations').doc().id

  function start() {
    setRecord(RecordState.START)
  }
 
  function stop() {
      setRecord(RecordState.STOP)
  }
  //audioData contains blob and blobUrl
    const onStop = (audioData) => {
    if(!reset){
      var FileSaver = require('file-saver');
      const storageRef =  firebase.storage().ref(`${convoid}/recording.mp3`)
      var reader = new FileReader();
      reader.readAsDataURL(audioData.blob); 
      reader.onloadend = function() {
          var base64data = reader.result;                
          function urltoFile(url, filename, mimeType){
            return (fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], filename,{type:mimeType});})
            );
        }
        
        //Usage example:
        urltoFile(base64data, 'recording.wav','audio/wav')
        .then(
          function(file){ 

              const storageRef =  firebase.storage().ref(`${convoid}/${id}.wav`)

    const task =  storageRef.put(file)
      task.on('state_changes',

        function progress(snap){
          progressbar.current.style.display='flex'
          const percentage =( snap.bytesTransferred/snap.totalBytes)*100
         progresswidth.current.style.height=`${percentage}%`
        }, 
        function error(err){

        },
        function complete(){
  
              let msgobject = {
            message: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${id}.wav?alt=media`,
            reaction: "",
            msgdate: firebase.firestore.Timestamp.now(),
            msgid: db.collection("conversations").doc().id,
            read: false,
            senderid: user.uid,
            editing: false,
            nobackground: true,
            emoji: true,
            base64: false,
            audio: true
          };
          db.collection("conversations")
          .doc(convoid)
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
          });
          progressbar.current.style.display='none'

    })    
          });

}

    }else {
      setReset(false)
    }
  }
  
  const [time, setTime] = useState(0)
  const [intervalId, setIntervalId] = useState();
  function startRecord() {
      start()
      setClicked(true)
      setIntervalId(setInterval(() => {
          setTime(prev => prev + 1)
      }, 1000));
  }
  
  function stopRecord() {
      setTime(0)
      stop()
      setClicked(false)
      clearInterval(intervalId);
  }
  function resetRecord(){
    setReset(true)
    stop()
  }
    return (
      <>
        <AudioReactRecorder state={record} onStop={onStop} />
        {!clicked?<Iconspecial color={themecolor} className='icondiv fal fa-microphone' onClick={()=>{startRecord(); }}></Iconspecial>:
        <div class="spinner-wave" onClick={()=>{stopRecord(); }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
       
        <span className="time">
          {time}
        </span>
        <Iconspecial color={themecolor} className="left fal fa-times-circle" onClick={()=>resetRecord()}></Iconspecial>

      </div>
      }
        {/* <button onClick={()=>start()}>Start</button>
        <button onClick={()=>stop()}>Stop</button> */}
      </>
    )
  }

export default Recorder