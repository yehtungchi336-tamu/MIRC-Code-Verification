import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Route, Link } from "react-router-dom";
import Users from "./Users";
import firebase from "firebase";
import { db } from "../Fire";
import Contextmenu from "./Contextmenu";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ElapsedTime from "./Elapsedtime";
import { ContextApp } from "../ContextAPI";
import Hoverableicondiv from "./Hoverableiconsdiv";
import InnerImageZoom from "react-inner-image-zoom";
import Iframe from "./msgcomponents/Iframe";
import Img from './msgcomponents/Img'
import Filemsg from './msgcomponents/File'
import P from './msgcomponents/P'
import Recording from "./msgcomponents/Recording";
import Gif from "./Gifs.js/Gif";
import ReactTimeAgo from 'react-time-ago'
import ReactImageMagnify from 'react-image-magnify';
import Contextoptions from "./msgcomponents/Contextoptions";
import Threedots from "./msgcomponents/Threedots";
import ScrollContainer from 'react-indiana-drag-scroll';
import { ReactTinyLink } from 'react-tiny-link'
import Picker from 'emoji-picker-react';

function Dialogue(props) {
  const {
    themecolor,
    notifi,
    setNotifi,
    notificont,
    setNotificont
  } = useContext(ContextApp);
  const [gif, setGif]=useState(false)
  const [msgs, setMsgs] = useState([]);
  const [msgstring, setMsgstring] = useState("");
  const [updateelapsed, setUpdateelapsed] = useState(0);
  const [typing, setTyping] = useState(false);
  const [realtyping, setRealtyping] = useState(false);
  const [typerid, setTyperid] = useState("");
  const [activestatus, setActivestatus] = useState(false);
  const [recipname, setRecipname] = useState("");
  const [recipimg, setRecipimg] = useState("");
  const [recipcity, setRecipcity] = useState("");
  const [recipcountry, setRecipcountry] = useState("");
  const [userimg, setUserimg] = useState("");
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState(false);
  const [contextmenu, setContextmenu] = useState(false);
  const [contextstyle, setContextstyle] = useState({
    top: 0,
    left: 0
  });
  const [notifibool, setNotifibool]=useState(true)
  const [emojitype, setEmojitype] = useState("");
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(true);
  const [chatcolor, setChatcolor] = useState("");
  const [userChatcolor, setUserchatcolor] = useState("");
  const [showinput, setShowinput] = useState(false);
  const [updatedMsg, setUpdatedMsg] = useState("");
  const [emojilist, setEmojilist] = useState(false);
  const [theme, setTheme] = useState("");
  const [msgid, setMsgid] = useState("");
  const [chatname, setChatname] = useState("");
  const [chatimg, setChatimg] = useState("");
  const [chatcity, setChatcity] = useState("");
  const [chatcountry, setChatcountry] = useState("");
  const [chatactive, setChatactive] = useState("");
  const [nickname, setNickname] = useState([]);
  const [emojipicker, setEmojipicker]=useState(false)
  const emojis = []
  const { chatuser, setState, icon, type } = props;
  const { messages } = props.diag;
  const { convoid, creatorid, recipientid } = props.diag.convoinfo;
  const user = firebase.auth().currentUser;
  const date = firebase.firestore.FieldValue.serverTimestamp()
  const typerRef = useRef();
  const id =db.collection('users').doc().id
  const reg = /((?:(?!(?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)).)+)|((?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)(?:\?\S+=\S*(?:&\S+=\S*)*)?)/gm;
  const imageRegexB = /(?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)/g;
  var urlreg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  var ureg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  function ytVidId(url) {
    var p = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
    return url.match(p) ? RegExp.$1 : false;
  }

  
  function determineMsgtype(msg) {
    if (msg.base64) {
      return <Img src={msg.message} link={true}/>
     
    }
    else if (msg.file) {
      return <Filemsg name={msg.name} link={msg.message}/>
    } else if (msg.audio) {
      return <Recording src={msg.message}/>
      
    } else if (msg.video){
      return <Iframe type='video' link={msg.message}/>
    }
    else if (ytVidId(msg.message)) {
      return <Iframe link={"https://www.youtube.com/embed/" + ytVidId(msg.message)} />

    }
    // else if(urlreg.test(msg.message)){
    //   const stringWithOnlyURLS = msg.message.match(urlreg).join(' ');
    //   const string = msg.message.replace(stringWithOnlyURLS, ' ')
    //   return <>
    //   <p className='bg'>{string}</p>
    //     <div>
    //     <ReactTinyLink
    //   cardSize="small" 
    //   showGraphic={true}
    //   maxLine={2}
    //   minLine={1}
    //   url={stringWithOnlyURLS}
    //   />
    //     </div>
    //   </>
    // }  
    else {
      const sm = msg.message.replace(reg, (_, text, img)  => 
      text ?  `<p>${text.trim()}</p>`:`<img src="${img}"/>`
      ) 
      return  <div dangerouslySetInnerHTML={{__html:sm}} ></div>
    }
  }
  function determineClass(msg) {
    var urreg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    if(user.uid===msg.senderid){
      if (msg.file) {
        return "msg file";
      }else if (msg.video) {
        return 'msg video'
      }
       else if (msg.audio) {
        return "msg audio";
      } else if (msg.emoji) {
        return "msg emojimsg";
      } else if (msg.nobackground) {
        return "no-bg msg";
      } else if (ytVidId(msg.message)) {
        return `msg youtube`;
      }
      //   else if(urreg.test(msg.message)){
      //   return 'msg emojimsg imp'
      // }
      else {
        return "msg";
      }
    }else {
      if (msg.file) {
        return "msg file trans";
      }else if (msg.video) {
        return 'msg video trans'
      }
       else if (msg.audio) {
        return "msg audio trans";
      } else if (msg.emoji) {
        return "msg emojimsg trans";
      } else if (msg.nobackground) {
        return "no-bg msg trans";
      } else if (ytVidId(msg.message)) {
        return `msg youtube trans`;
      }
      //   else if(urreg.test(msg.message)){
      //   return 'msg emojimsg imp'
      // }
      else {
        return "msg trans";
      }
    }
  }
  const [opti, setOpti]=useState(false)
  function msgOptions(msg){
    const allel = document.querySelectorAll('.optionsEdit')
    allel.forEach(el=>{
      el.style.display='none'
    })
    const el = document.querySelector(`div[data-id="${msg.msgid}"]`)
    el.style.display='flex'
  }
  const [modal, setModal] = useState(false);
  const imgsrc = useRef();
  const [imgSrcModal, setImgSrcModal]=useState('')
  function clickHandler(e) {
    const audio = e.target.querySelector(".controls");
    const video = e.target.closest("VIDEO");

    const play = e.target.querySelector(".fa-play");
    const el = e.target.closest("IMG");
    if (el && e.currentTarget.contains(el)) {
      setModal(true);
      const imgsrc = document.querySelector(".modal img");
      setImgSrcModal(el.getAttribute('src'))
      imgsrc.setAttribute("src", el.getAttribute("src"));
    }
    if (video && e.currentTarget.contains(video)) {
    }
  }
  const allmsgs =
    messages &&
    messages
      .slice(0)
      .reverse()
      .map((msg) => {
        return (
          <div
            id={msg.msgid}
            className={msg.senderid === user.uid ? "right m" : "left m"}
            onContextMenu={(e) => contextMenu(e)}
          >
            <div className="flex">
              <p
                className={determineClass(msg)}
                contentEditable={false}
                style={
                  msg.nobackground
                    ? { backgroundColor: "transparent" }
                    : msg.emoji
                    ? { backgroundColor: "transparent" }
                    : ytVidId(msg.message)
                    ? { backgroundColor: "transparent" }
                    : msg.senderid === user.uid
                    ? { backgroundColor: chatcolor }
                    : null
                }
                onClick={(e) => clickHandler(e)}
     
              >    { determineMsgtype(msg) }</p>

             <Threedots msgs={msgs} user={user} msg={msg} convoid={convoid}/>

                <small
                className={
                  msg.senderid === user.uid
                    ? "alignRight elapsedtime"
                    : "alignLeft elapsedtime"
                }
              ><ReactTimeAgo date={msg.msgdate.toDate()}/></small>
              <div
                className="reaction"
                style={{ display: (msg.reaction1||msg.reaction2) ? "flex" : "none", width: (msg.reaction1===''||msg.reaction2==='')?'22px':'42px' }}
              >
                <i className={ msg.reaction1 === "fad fa-heart"? "emoj fas fa-" + msg.reaction1: "emoj fad fa-" + msg.reaction1 }></i>
                <i style={{marginLeft: msg.reaction2===''?'':'5px'}}className={ msg.reaction2 === "fad fa-heart"? "emoj fas fa-" + msg.reaction2: "emoj fad fa-" + msg.reaction2}></i>
              </div>
            </div>
            <img src={msg.senderid === user.uid ? userimg : chatimg} alt="" />
          </div>
        );
      });
  const progressbar = useRef();
  const progresswidth = useRef();
  const [img, setImg] = useState();
  const inputref = useRef()
  function sendFile(type) {
    let file = document.querySelector(`.${type}file`).files[0];
    if (file) {
      var idxDot = file.name.lastIndexOf(".") + 1;
      var extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

      const storageRef = firebase.storage().ref(`${convoid}/${file.name}`);
      const task = storageRef.put(file);
      task.on(
        "state_changes",

        function progress(snap) {
          progressbar.current.style.display = "flex";
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          progresswidth.current.style.height = `${percentage}%`;
        },
        function error(err) {},
        function complete() {
          if (type === "image") {
            if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
              let msgobject = {
                message: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${file.name}?alt=media`,
                reaction1: "",
                reaction2: "",
                msgdate: firebase.firestore.Timestamp.now(),
                msgid: db.collection("conversations").doc().id,
                read: false,
                senderid: user.uid,
                editing: false,
                nobackground: true,
                emoji: true,
                base64: true
              };
              let notificationobj = {
                notifimsg: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${file.name}?alt=media`,
                notifidate: firebase.firestore.Timestamp.now(),
                read: false,
                sender: user.displayName,
                base64: true,
                id: convoid,
                senderid: user.uid,
                notifiid: db.collection('users').doc().id              }      
                if(notifibool){
                  db.collection('notifications').doc(chatuser).update({
                    notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
                  })
                }
              db.collection("conversations")
                .doc(convoid)
                .update({
                  lastmsgdate: date,
                  messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
                });
            } else {
              setNotifi(true);
              setNotificont({
                emoji: "fal fa-exclamation-circle",
                msg: "Only Images are allowed!"
              });
              setTimeout(() => {
                setNotifi(false);
              }, 300500);
            }
          } else if (type === "paperclip") {
            let msgobject = {
              message: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${file.name}?alt=media`,
              reaction1: "",
              reaction2: "",
              msgdate: firebase.firestore.Timestamp.now(),
              msgid: db.collection("conversations").doc().id,
              read: false,
              senderid: user.uid,
              editing: false,
              nobackground: true,
              emoji: true,
              file: true,
              name: file.name,
              base64: false
            };
            let notificationobj = {
              notifimsg: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${file.name}?alt=media`,
              notifidate: firebase.firestore.Timestamp.now(),
              read: false,
              sender: user.displayName,
              file: true,
              id: convoid,
              senderid: user.uid,
              notifiid: db.collection('users').doc().id            }      
            if(notifibool){
              db.collection('notifications').doc(chatuser).update({
                notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
              })
            }
            db.collection("conversations")
              .doc(convoid)
              .update({
                lastmsgdate: date,
                messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
              });
          } else if (type === "microphone") {
          }else if(type==='film') {
              if(extFile==='mp4'||'gif'||'avi'){
                let msgobject = {
                  message: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${file.name}?alt=media`,
                  reaction1: "",
                  reaction2: "",
                  msgdate: firebase.firestore.Timestamp.now(),
                  msgid: db.collection("conversations").doc().id,
                  read: false,
                  senderid: user.uid,
                  editing: false,
                  nobackground: true,
                  emoji: true,
                  video: true
                };
                let notificationobj = {
                  notifimsg: `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${convoid}%2F${file.name}?alt=media`,
                  notifidate: firebase.firestore.Timestamp.now(),
                  read: false,
                  sender: user.displayName,
                  video: true,
                  id: convoid,
                  senderid: user.uid,
                  notifiid: db.collection('users').doc().id                }      
                if(notifibool){
                  db.collection('notifications').doc(chatuser).update({
                    notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
                  })
                }
                db.collection("conversations")
                  .doc(convoid)
                  .update({
                    lastmsgdate: date,
                    messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
                  });
              }else {

              }
          }
          progressbar.current.style.display = "none";
        }
      );
    }
  }

  const icons = [
    { icon: "image", type: "file" },
    {icon: 'film', type:'file'},
    { icon: "paperclip", type: "file" },
    { icon: "microphone", type: "microphone" },

  ];

  let iconsrow = icons.map((icon) => {
    return (
      <Hoverableicondiv
        progressbar={progressbar}
        progresswidth={progresswidth}
        classNames=""
        icon={icon.icon}
        type={icon.type}
        special={true}
        sendFile={sendFile}
        convoid={convoid}
        inputref={inputref}
        
      />
    );
  });

  function editMsg() {
    msgs &&
      msgs.map((msg) => {
        if (msgid === msg.msgid) {
          let itemindex = msgs.indexOf(msg);
          msgs[itemindex].message = updatedMsg;
          db.collection("conversations").doc(convoid).update({
            messages: msgs
          });
        }
      });
  }

  function contextMenu(e) {
    let customcontext = document.querySelector(".contextmenu");
    const bounding = customcontext.getBoundingClientRect();
    e.preventDefault();
    setMsgid(e.currentTarget.getAttribute("id"));
    setContextmenu(true);
    if (type === "small") {
      customcontext.style.top = `${e.pageY - 201}px`;
      customcontext.style.left = `${0}px`;
    } else {
    const bounding = customcontext.getBoundingClientRect()
    customcontext.style.top = `${e.pageY -200}px`;
    customcontext.style.left = `${e.pageX -150 }px`;
    }

    if (!updatedMsg === "") {
      editMsg();
    }
  }
  function sendEmoji(emoji) {
    let msgobject = {
      message: emoji,
      reaction1: "",
      reaction2: "",
      msgdate: firebase.firestore.Timestamp.now(),
      msgid: db.collection("conversations").doc().id,
      read: false,
      senderid: user.uid,
      editing: false,
      nobackground: false,
      emoji: true
    };
    db.collection("conversations")
      .doc(convoid)
      .update({
        lastmsgdate: date,
        messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
      });
      let notificationobj = {
        notifimsg: emoji,
        notifidate: firebase.firestore.Timestamp.now(),
        read: false,
        sender: user.displayName,
        id: convoid,
        senderid: user.uid,
        notifiid: db.collection('users').doc().id
      }      
      if(notifibool){
        db.collection('notifications').doc(chatuser).update({
          notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
        })
      }
    setMsgstring("");
    typerRef.current.setAttribute("style", "height: 50px");
  }
  const scrollto = useRef()
  function  sendMessage() {
    scrollto.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const imageRegex = /(?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)/g;
    if (msgstring.match(imageRegexB) != null) {
      let msgobject = {
        message: msgstring,
        reaction1: "",
        reaction2: '',
        msgdate: firebase.firestore.Timestamp.now(),
        msgid: db.collection("conversations").doc().id,
        read: false,
        senderid: user.uid,
        editing: false,
        nobackground: true,
        emoji: false
      };
      db.collection("conversations")
        .doc(convoid)
        .update({
          lastmsgdate: date,
          messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
        });
        let notificationobj = {
          notifimsg: msgstring,
          notifidate: firebase.firestore.Timestamp.now(),
          read: false,
          sender: user.displayName,
          id: convoid,
          senderid: user.uid,
          notifiid: db.collection('users').doc().id,

        }      
        if(notifibool){
          db.collection('notifications').doc(chatuser).update({
            notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
          })
        }else {
          return null
        }
      setMsgstring("");
      typerRef.current.setAttribute("style", "height: 50px");
    } else if (msgstring.replace(/\s/g, "").length) {
      let msgobject = {
        message: msgstring,
        reaction1: "",
        reaction2: "",
        msgdate: firebase.firestore.Timestamp.now(),
        msgid: db.collection("conversations").doc().id,
        read: false,
        senderid: user.uid,
        editing: false,
        nobackground: false,
        emoji: false
      };
      let notificationobj = {
        notifimsg: msgstring,
        notifidate: firebase.firestore.Timestamp.now(),
        read: false,
        sender: user.displayName,
        id: convoid,
        senderid: user.uid,
        notifiid: db.collection('users').doc().id
      }      
      if(notifibool){
        db.collection('notifications').doc(chatuser).update({
          notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
        })
      }
      db.collection("conversations")
        .doc(convoid)
        .update({
          lastmsgdate: firebase.firestore.Timestamp.now(),
          messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
        });
      setMsgstring("");
      typerRef.current.setAttribute("style", "height: 50px");
    }
  }
  function triggerSend(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
  function formatTextarea() {

    // setTyping(true)
    // showTypingAnim()
  }
  const emojipickerref = useRef()
  function inputFunc(){
    typerRef.current.focus()
    setEmojipicker(!emojipicker)
  }
  function showTypingAnim() {
    setTyperid(user.uid);
    let infoobj = {
      convoid,
      creatorid,
      recipientid,
      usertyping: typing,
      userref: db.collection("users").doc(recipientid),
      typerid
    };
    db.collection("conversations")
      .doc(convoid)
      .update({
        // convoinfo: infoobj
      })
      .then(() => {
        db.collection("conversations")
          .doc(convoid)
          .onSnapshot((snap) => {
            // setTyperid(snap.data().convoinfo.typerid)
            // setRealtyping(snap.data().convoinfo.usertyping)
          });
      });
  }
  const [zoomamount, setZoomamount]=useState(1)
  function zoom(el){
   if(el.type==='in'){
    setZoomamount(prev=>prev+ 0.1);
   }else {
    if(zoomamount>1){
      setZoomamount(prev=>prev- 0.1);
    }
   }

  }
  const onEmojiClick = (event, emojiobject)=>{
   setMsgstring(msgstring + emojiobject.emoji)
  }
  useEffect(() => {
    let timer = setInterval(() => {
      setUpdateelapsed((prev) => prev + 1);
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    let timer = setInterval(() => {
      setTyping(false);
    }, 4000);
    // showTypingAnim()
    return () => {
      clearInterval(timer);
    };
  }, [typing]);

  useEffect(() => {
    db.collection("users")
      .doc(creatorid)
      .onSnapshot((snap) => {
        const user = snap.data();
        setRecipname(user.userinfo.name);
        setRecipimg(user.userinfo.cover);
        setRecipcity(user.userinfo.city);
        setRecipcountry(user.userinfo.country);
      });
    db.collection("users")
      .doc(recipientid)
      .onSnapshot((snap) => {
        const user = snap.data();
        setUserimg(user.userinfo.cover);
        setUsername(user.userinfo.name);
      });
    db.collection("users")
      .doc(chatuser)
      .onSnapshot((snap) => {
        const user = snap.data();
        setChatname(user.userinfo.name);
        setChatimg(user.userinfo.cover);
        setChatcity(user.userinfo.city);
        setChatcountry(user.userinfo.country);
        setChatactive(user.online);
        setActivestatus(user.userinfo.online);
        setLoading(false);
      });
  }, [creatorid, recipientid, chatuser]);
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const user = snap.data();
        setChatcolor(user.customization.color);
        setUserimg(user.userinfo.cover);
      });
  }, [chatcolor, chatuser]);
  useEffect(() => {
    db.collection("users")
      .doc(chatuser)
      .onSnapshot((snap) => {
        let user = snap.data();
        setUserchatcolor(user.customization.chatcolor);
      });
  }, [chatuser]);
  useEffect(() => {

    db.collection("conversations")
    .doc(convoid)
    .get().then((snap) => {
      let use = snap.data();
      setMsgs(use.messages);
      setLoader(false);
      setTheme(use.customizedconvo.theme);
      setEmojitype(use.customizedconvo.emoji);
      if(user.uid===props.diag.convoinfo.creatorid) {
        setNotifibool(use.notifications2)
        setNickname(use.nickname1)
      }else {
        setNotifibool(use.notifications1)
        setNickname(use.nickname2)
      }
    }); 

  
  }, [convoid]);

  return (

    <>  

         <div className="top br-l">
        <div className="profilepic">
          <div className="relative">
            {loading ? (
              <div className={"loader blue reloader"}>
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              [
                <img src={chatimg} alt="" />,
                <div
                  className="notifi"
                  style={{
                    backgroundColor: chatactive ? "rgb(44, 255, 44)" : "#FF3D3D"
                  }}
                ></div>
              ]
            )}
          </div>
          <div>
            {nickname===''?<p className='username'>{chatname.length>15?chatname.slice(0, 15)+'...':chatname}</p>:<p className='username'>{nickname}</p>}
            <small>{chatactive ? "Online" : "Offline"}</small>
          </div>
        </div>
        <div className="controls">
          <i class="fal fa-phone-alt" style={{ color: themecolor }}></i>
          <i class="fal fa-video" style={{ color: themecolor }}></i>
          {icon && icon === "fal fa-times" ? (
            <i
              className={icon}
              style={{ padding: "0 5px", color: themecolor }}
              onClick={() => setState(false)}
            ></i>
          ) : (
            <Link exact to={"/chatsettings/" + convoid}>
              <i
                style={{ padding: "0 5px", color: themecolor }}
                class="fal fa-ellipsis-v"
              ></i>
            </Link>
          )}
        </div>
      </div>
 
      <Route
        render={({ location }) => (
          <div
            className={!theme?"msgs black":theme==='https://i.imgur.com/4hzNTTq.png'?'msgs black':'msgs'}
            style={
              theme
                ? { backgroundImage: "url(" + theme + ")" }
                : { backgroundImage: "url(https://i.imgur.com/4hzNTTq.png)" }
            }
          >
            <div className="grid">
              <div className="scrollto" ref={scrollto}></div>

              {loader ? (
                <div className={loader ? "loader opa" : "loader"}>
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                allmsgs
              )}
            </div>
          </div>
        )}
      />
   <div className="search whiteb br-l">
    <div className="plus">
      <i
        class={visible ? "fal fa-minus" : "fal fa-plus"}
        style={{ color: themecolor }}
        onClick={() => setVisible(!visible)}
      ></i>
      <CSSTransition
        in={visible}
        timeout={300}
        classNames="iconshover"
        unmountOnExit
      >
        <div className={"icons"}>
          {iconsrow}
          <span className="uploader bs" ref={progressbar}>
            <span className="percent" ref={progresswidth}></span>
          </span>
        </div>
      </CSSTransition>
    </div>
    <div className="textarea flexrow">
    <textarea
      type="text"
      placeholder="Send a message..."
      onKeyUp={(e) => triggerSend(e)}
      ref={typerRef}
      value={msgstring}
      onChange={(e) => {
        setMsgstring(e.target.value);

      }}
      onInput={()=>formatTextarea()}

    ></textarea>
    <div className="gif_emoji">
    <i className="fal fa-laugh" onClick={()=>{inputFunc()}}></i>
    <i class="fal fa-comment-alt-smile" onClick={()=>setGif(!gif)}></i>
    </div>

   </div>
      <div className="flexrow">
      <span
      role="img"
      aria-label="emoji"
      onClick={() => sendEmoji(emojitype)}
      style={{ cursor: "pointer" }}
    >
      {emojitype}
    </span>
    <i
      class="fal fa-paper-plane"
      style={{ color: themecolor }}
      onClick={() => {sendMessage();setEmojipicker(false)}}
    ></i>
      </div>
  </div>
 
      <Contextmenu
        setShowinput={setShowinput}
        editMsg={editMsg}
        setUpdatedMsg={setUpdatedMsg}
        convoid={convoid}
        type={"msg"}
        msgid={msgid}
        setMsgid={setMsgid}
        setContextmenu={setContextmenu}
        contextmenu={contextmenu}
        contextstyle={contextstyle}
      />

      <CSSTransition in={gif} unmountOnExit classNames='gif' timeout={300}>
        <Gif chatimg={chatimg} setGif={setGif} convoid={convoid} notifibool={notifibool} chatuser={chatuser}/>
      </CSSTransition>
      <CSSTransition
        in={notifi}
        timeout={300}
        classNames="displayerror"
        unmountOnExit
      >
        <div className="errormsg bs diagmsg">
          <i
            className={notificont.emoji}
            style={{ position: "absolute", left: "20px" }}
          ></i>{" "}
          <p>{notificont.msg}</p>
          <i
            className="far fa-times"
            style={{ color: themecolor }}
            onClick={() => setNotifi(false)}
          ></i>
        </div>
      </CSSTransition>
      <CSSTransition in={modal} classNames="modal" timeout={0}>
        <div className="modal overflowimgcontainer">
         <div className="buttons">
         
         <i className="fal fa-search-minus" onClick={()=>zoom({type: 'out'})}></i>
         <i class="fal fa-redo-alt" onClick={()=>setZoomamount(1)}></i>
         <i class="fal fa-search-plus" onClick={()=>zoom({type: 'in'})}></i>
         </div>
          <ScrollContainer className='grabbercontainer' hideScrollbars={true}>
          <img src="" alt="" ref={imgsrc}style={{width: 100*zoomamount+'%', height: 100*zoomamount+'%'}} />
          </ScrollContainer>
          <i className="fal fa-times" onClick={() => {setModal(false); setZoomamount(1)}}></i>
        </div>
      </CSSTransition>
      <CSSTransition in={emojipicker}  classNames='emojipicker' timeout={300} >
       <div className="emojipicker" ref={emojipickerref} onMouseOver={()=>typerRef.current.focus()} onClick={()=>typerRef.current.focus()}>
        <div className="times"> <i className="fal fa-times" onClick={()=>setEmojipicker(false)}></i></div>
       <Picker onEmojiClick={onEmojiClick}/>
       </div>
      </CSSTransition>
    </>
  );
}
export default Dialogue;
