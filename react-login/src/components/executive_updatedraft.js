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
import ReactTimeAgo from 'react-time-ago'
import emailjs from 'emailjs-com'
import Usersettings from "./Usersettings";
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";

// constructor(props) {
//   super(props);
//   console.log(props.location.aboutProps);
// }

function ExecutiveUpdatedraft(props) {

  let location = useLocation();
  // console.log(location.aboutProps);
  const button_state = {button: 1};
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
  const form = useRef();

  const [textarea, setTextarea] = useState();
  const [inputs, setInputs] = useState({})
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handle_textarea_Change = (event) => {
    setTextarea(event.target.value)
  }

  // const handleSave = (event) => 
  //   event.preventDefault();{
  //   // STEP 4：
  //   // 透過 inputLocationRef.current 可以指稱到該 input 元素
  //   // 透過 inputLocationRef.current.value 即可取得該 input 元素的值
  //   const locationName = inputLocationRef.current.value;
  //   console.log("locationName");
  //   console.log(locationName);
  //   // ...
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    

    const key = location.aboutProps['datakey'];
    // const locationName = inputLocationRef.current.value;
    // console.log("locationName");
    // console.log(locationName);
    console.log("handleSubmit");
    // console.log(form.current);
    console.log(form.current);
    console.log(form.current.message.value);

    const updates = {};
    updates[`draft/${key}/subject`] = form.current.subject.value;
    updates[`draft/${key}/cc`] = form.current.cc.value;
    updates[`draft/${key}/bcc`] = form.current.bcc.value;
    updates[`draft/${key}/message`] = form.current.message.value;
    updates[`draft/${key}/recipient`] = form.current.recipient.value;
    if (button_state.button === 1) {
      updates[`draft/${key}/status`] = "Accepted";
    }
    if (button_state.button === 2) {
      updates[`draft/${key}/status`] = "Rejected";
    }
    realtime_db.ref().update(updates);
    console.log("RRRRRRRR")


  }

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

  function data_form() {
    // const refContainer = useRef(initialValue);
    // const InputElement = () => (
    //   <input ref={refContainer} />
    // )

    const key = location.aboutProps['datakey'];
    const data = location.aboutProps;
    const recipient = location.aboutProps['recipient'];
    console.log("data_form")
    console.log(location.aboutProps)
    console.log(location.aboutProps['datakey'])
    console.log(location.aboutProps['datakey'])
    
    return (
      <div className="home">
        <div className="header flex sb">
          {/*<h2 className="marginBottom">{determinetext()}</h2>*/}
          <h2 style={{color: 'black'}}>Review Draft</h2>
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
  
        <div class="container">
          <div class="row">
            <div class="col align-self-center">
              <form action="" ref={form} onSubmit={handleSubmit}> 
              
                <div class="form-group">
                  <label for="subject">Subject
                  <input
                    type="subject"
                    name="subject"
                    class="form-control-xlg "
                    id="subject"
                    defaultValue={data.subject}
                    placeholder=" enter email subject"
                  />
                  </label>
                </div>
  
                <div class="form-group">
                  <label for="recipient">TO
                  <input
                    type="recipient"
                    name="recipient"
                    class="form-control-xlg"
                    id="recipient"
                    defaultValue={data.recipient}
                    placeholder=" enter the recipient's address"
                  />
                  </label>
                </div>
  
                <div class="form-group">
                  <label for="cc">CC
                  <input
                    type="cc"
                    name="cc"
                    class="form-control-xlg"
                    id="cc"
                    defaultValue={data.cc}
                    placeholder=" enter the Carbon Copy"
                  />
                  </label>
                </div>
  
                <div class="form-group">
                  <label for="bcc">BCC
                  <input
                    type="bcc"
                    name="bcc"
                    class="form-control-xlg"
                    id="bcc"
                    defaultValue={data.bcc}
                    placeholder=" enter the Blind Carbon Copy"
                  />
                  </label>
                </div>
  
                <div class="form-group">
                  <label htmlFor="message">Message
                  <textarea
                    class="form-control-xlg"
                    name="message"
                    id="message"
                    defaultValue={data.message}
                    rows="10"
                  ></textarea>
                  </label>
                </div>
                <button
                  onClick={() => (button_state.button = 1)}
                  type="submit"
                  name="Accept"
                  value="wow"
                >
                  Accept
                </button>
                <button
                  onClick={() => (button_state.button = 2)}
                  type="submit"
                  name="btn2"
                  value="oh no"
                >
                  Reject
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="homeside">
  
        </div>
      </div>
    );
  }

  return (data_form());
}
export default ExecutiveUpdatedraft;
