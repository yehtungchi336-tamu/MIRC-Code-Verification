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
import ReactTimeAgo from 'react-time-ago'

import Usersettings from "./Usersettings";
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";

///////////audioUpload.js////////////

document.getElementById('gg').innerHTML= "gggggg";
$("#fileInput").change(function(){
    var file = $("#fileInput").get(0).files;
    console.log(file.type);
    for(var i=0; i<file.length;i++){
        var path = URL.createObjectURL(file[i]);
        var audio = document.createElement('audio');
        audio.src = path;
        audio.controls = true;
        audio.volume = '0.2';
        $('#audio1').append(audio);
    }
});
$("#upload").change(function(){
    var file = $("#fileInput").get(0).files;
    var formData = new FormData();
    for(var i = 0; i<file.length; i++){
        formData.append("recording", file[i]);
    }
    console.log(formData.getAll("recording"));
    //ajax upload to backend
    uploadAudio(formData); 
});
/////////////Ajax upload code//////////
function uploadAudio(data){
    $.ajax({
        type:"post",
        contentType:false,
        processData:false,
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "你要请求的后台地址",  //请求发送到TestServlet处
        data:data,
        dataType:"json",      //返回数据形式为json
        success:function(result){
            uploadAudioEnd(true, result);
        },
        error:function(errorMsg){
            uploadAudioEnd(false, "");
        }
    });
}
//录音上传返回结果
function uploadAudioEnd(flg,result){
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var res = result.response;
            //对返回结果的处理
        }else{
            alertDialog(result.retmsg);
        }
    }else{
        alertDialog("Audio upload failed!!!");
    }
}
///////////////////

function Body(props) {
  const { themecolor } = useContext(ContextApp)
  const user = firebase.auth().currentUser
  const [roleType, setRoleType] = useState('')
  //var roleType = 'assistant'
  const [cover, setCover] = useState("")
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
    <div className="executive_home">
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
      
      <form> 
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
              placeholder=" enter the recipient"
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
            <label for="email_body">Message</label>
            <textarea
              class="form-control-lg"
              id="email_body"
              rows="5"
            ></textarea>
          </div>
          
      <div >
        <div className="gridobjects  bs marginBottom">
          <Hoverlink
            
            txt="Submit"
            classNames="blueback all flexrow center"
            lnk="/"
            
          />
        </div>
      </div>
      

      </form>

    </div>
  );
}
export default Body;
