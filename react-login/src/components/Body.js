import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import firebase from "firebase";
import { db } from "../Fire";
import Usernav from "./Usernav";
import Userrow from "./Userrow";
import Dialogue from "./Dialogue";
import Userprofile from "./Userprofile";
import Adduser from "./Adduser";
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
import { StartConvo } from "./StartConvo";
import styled from 'styled-components'
import Paths from "./Paths";
import Account from "./settings/Account";
import Personalization from "./settings/Personalization";
import Chatsettings from "./Chatsettings";
import Usersettings from "./Usersettings";
import { ContextApp } from "../ContextAPI";
import Hoverableicondiv from "./Hoverableiconsdiv";
import Chatviewrow from './Chatviewrow'
const Div = styled.div ` 
      ::selection {
        background-color: ${props=>props.color};
        color: white;
      }
`
function Body(props) {
  const location = useLocation();
  const user = firebase.auth().currentUser;
  const [convoinfo, setConvoinfo] = useState({
    unreadmsgs: 0
  });
  const [convos, setConvos]=useState([])
  const { darkmode, widemode, themecolor,chatcolor } = useContext(ContextApp);
  const [chatuser, setChatuser] = useState("");
  const { handleLogout, setLoading } = props;
  const [msgpersonids, setMsgpersonids] = useState([]);
  const [adduser, setAdduser] = useState(false);
  const [convolist, setConvolist] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const [message, setMessage] = useState("");
  const [recipientid, setRecipientid] = useState("");
  const [recipientname, setRecipientname] = useState("");
  const [chatview, setChatview]=useState(false)
  const [chatstarted, setChatstarted]=useState(false)
  const [sidebar, setSidebar]=useState(false)

  const onedialogue =convolist && convolist.map((diag) => {
    return (
        <Route  exact path={"/chat/" + diag.convoinfo.convoid}>
          <Dialogue diag={diag} chatuser={chatuser}/>
        </Route>
      );
    });
    const [chatopen, setChatopen]=useState(false)
    const dialoguerow = convolist && convolist.map(diag=>{
        if(user) {
          if(chatuser===(user.uid===diag.convoinfo.creatorid?diag.convoinfo.recipientid:diag.convoinfo.creatorid)){
            return ( 
              <Dialogue  type={'small'} chatuser={chatuser} diag={diag} icon='fal fa-times' setState={setChatstarted} />     
              )
           }
        }
    })
    const usersrow = convos && convos.sort((a, b) => b.lastmsgdate - a.lastmsgdate).map(el=>{
      return <div className="profilepic"><Chatviewrow el={el} setChatopen={setChatopen} chatopen={chatopen} chatuser={chatuser} setChatuser={setChatuser} convoinfo={convoinfo} lnk={location.pathname.split('/').slice(1, 2)[0]} setChatstarted={setChatstarted} setChatview={setChatview} /></div>
    })
  const chatsettings = 
    convolist &&
    convolist.map((diag) => {
      return (
        <Route path={"/chatsettings/" + diag.convoinfo.convoid}>
          <Usersettings
            chatuser={chatuser}
            diag={diag}
            settings={"chat"}
            type={"chatsettings"}
            link={{
              link0: "chatsettings/" + diag.convoinfo.convoid,
              link1: diag.convoinfo.convoid + "/actions",
              link2: diag.convoinfo.convoid + "/privacy",
              link3: diag.convoinfo.convoid + "/support"
            }}
            linklabel={{
              link0: "Themes",
              link1: "Actions",
              link2: "Privacy",
              link3: "About"
            }}
            
          />
        </Route>
      );
    });
  const userprofile =
    convolist &&
    convolist.map((diag) => {
      return (
        <Route exact path={"/chat/" + diag.convoinfo.convoid}>
          <Userprofile diag={diag} chatuser={chatuser} />
        </Route>
      );
    });
    const imageRegexB = /(?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)/g;
    const photo = true
  function sendMessage() {
 if (message.length) {
      setAdduser(!adduser);
      let convoid = db.collection("conversations").doc().id;
      StartConvo(recipientid, message, convoid, recipientname);
    }
  }
  function chatFuncDisplay(){
    setChatstarted(false)
    setTimeout(()=>{
      setChatview(false); 
    },400)
  }
  function updateProfile(){
    db.collection('users').doc(user.uid).update({
        customization: {
          widemode: !widemode,
          darkmode,
          color: chatcolor,
          themecolor
        }
    })
}

  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(user=>{
      const userlist = user.data()
      setUserlist(userlist)
      db.collection('conversations').onSnapshot(snap=>{
        let convos = []
         snap.forEach(doc=>{
           if(userlist.msgids.includes(doc.id)){
             convos.push(doc.data())
           }
         })
         setConvos(convos)
      })
    })
   },[])
  useEffect(() => {
    if(user){
      db.collection("users")
      .doc(user.uid)
      .onSnapshot((user) => {
        const userlist = user.data();
        setMsgpersonids(userlist.msgpersonids);
        setUserlist(userlist);
        db.collection("conversations").onSnapshot((snap) => {
          let convos = [];
          snap.forEach((doc) => {
            if (userlist.msgids.includes(doc.id)) convos.push(doc.data());
          });
          setConvolist(convos);
        });
      });
    db.collection("users")
   
      .onSnapshot((snap) => {
        const users = [];
        snap.forEach((el) => {
          users.push(el.data());
        });
        setAllusers(users);
      });
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const user = snap.data()
        document.documentElement.style.setProperty(
          '--theme-color', user.customization.themecolor
        )
        document.documentElement.style.setProperty(
          '--chat-color', user.customization.color
        )
      })

    }
    setLoading(false);
  }, []);
  function deleteAccount(){
    var user = firebase.auth().currentUser;
    user.delete().then(()=>{
      db.collection('users').doc(user.uid).delete()
    }).catch(err=>{

    })
  }
  return (
    <Div
    color={themecolor}  
    className={widemode ? "body widebody" : "body"}
      style={{ backgroundColor: themecolor }}
    >
      <div className='sidebar'
      >
        <Sidebar updateProfile={updateProfile} chatFuncDisplay={chatFuncDisplay} setChatview={setChatview} setChatstarted={setChatstarted} handleLogout={handleLogout} />
      </div>
      <Switch>
        <Paths
          handleLogout={handleLogout}
          chatsettings={chatsettings}
          chatuser={chatuser}
          setChatuser={setChatuser}
          userprofile={userprofile}
          onedialogue={onedialogue}
          convoinfo={convoinfo}
          setConvoinfo={setConvoinfo}
          adduser={adduser}
          setAdduser={() => setAdduser(!adduser)}
        />
      </Switch>
     
        {location.pathname.slice(0, 5)==='/chat'?<div className='chattab'></div>:<><Hoverableicondiv  classNames={"chatdiv flex bs"} icon={"comment"} state={chatview} setState={setChatview}/></>}

        <CSSTransition in={chatview} timeout={300} unmountOnExit classNames='chatusers'>
      <div className="chatusers bs">
        <h2>Chat</h2>
        <div className="users flexrow">
          <i className="fal fa-times" onClick={()=>setChatview(false)} style={{color: 'var(--theme-color)', position: 'absolute', top: '15px',right: '20px'}}></i>
                {usersrow}
              </div>
        </div>
      </CSSTransition>
      <CSSTransition 
      in={chatstarted}
      classNames='chatview'
      unmountOnExit 
      timeout={300}
      >
        <div className='chatview bs' style={{right: chatview?'330px':'50px'}}>
            <div className="">
              <div className="dialogue">
                {dialoguerow}
              </div>
            </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={adduser}
        classNames={"adduser"}
        unmountOnExit
        timeout={300}
      >
        <Adduser
          setRecipientname={setRecipientname}
          message={message}
          msgpersonids={msgpersonids}
          sendMessage={sendMessage}
          setMessage={setMessage}
          setRecipientid={setRecipientid}
          allusers={allusers}
          setAdduser={setAdduser}
          recipientid={recipientid}
          adduser={adduser}
        />
      </CSSTransition>
      
    </Div>
  );
}
export default Body;
