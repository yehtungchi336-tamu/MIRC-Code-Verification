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

function Updatedraft(props) {

  let location = useLocation();
  // console.log(location.aboutProps);
  
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
  const inputLocationRef = useRef(null);
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

    // const locationName = inputLocationRef.current.value;
    // console.log("locationName");
    // console.log(locationName);
    console.log("rrrr");
    console.log(inputs);
    console.log(inputs.subject);
    console.log(textarea);
    console.log(location.aboutProps['datakey'])
    const key = location.aboutProps['datakey'];
    // console.log(user.displayName);
    // console.log(inputs.subject);
    // console.log(inputs.recipient);
    // console.log(inputs.CC);
    // console.log(inputs.BCC);

    const test = '/draft/'+ key
    console.log('/draft/'+ key);

    const updates = {};
    updates[`draft/${key}/subject`] = inputs.subject;
    updates[`draft/${key}/cc`] = inputs.CC;
    updates[`draft/${key}/bcc`] = inputs.BCC;
    updates[`draft/${key}/message`] = textarea;
    updates[`draft/${key}/recipient`] = inputs.recipient;
    updates[`draft/${key}/status`] = "completed";
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
    const recipient = location.aboutProps['recipient'];
    console.log(location.aboutProps)
    console.log(location.aboutProps['datakey'])
    // var userRef = realtime_db.ref("/draft");
    // const data = [];
    // userRef.orderByKey().equalTo(key).once("value", function (snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //       // console.log(childSnapshot)
    //       data.push({ 
            // BCC: childSnapshot.val().bcc, 
            // CC: childSnapshot.val().cc,
            // message: childSnapshot.val().message, 
            // recipient: childSnapshot.val().recipient,
            // subject: childSnapshot.val().subject, 
    //       })
    //   });
    // });
    // console.log(BCC);
    // const [state, setState] = React.useState(data);
    // console.log(state[0].subject);
    return (
      <div className="home">
        <div className="header flex sb">
          {/*<h2 className="marginBottom">{determinetext()}</h2>*/}
          <h2 style={{color: 'black'}}>Update Draft</h2>
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
        <div class="container">
          <div class="row">
            <div class="col align-self-center">
            <form onSubmit={handleSubmit}>
            {/* <label>
              <input 
                type="text" 
                name="key" 
                defaultValue={location.aboutProps.datakey || ""} 
                placeholder="enter key"
                // onChange={handleChange}
              />
              </label> */}

              <label>Subject
              <input 
                type="text" 
                name="subject" 
                defaultValue={location.aboutProps.subject || ""} 
                placeholder=" enter email subject"
                onChange={handleChange}
              />
              </label>
              <label>TO
                <input 
                  type="text" 
                  name="recipient" 
                  defaultValue={location.aboutProps.recipient || ""} 
                  placeholder=" enter the recipient's address"
                  onChange={handleChange}
              />
              </label>
              <label>CC
                <input 
                  type="text" 
                  name="CC" 
                  defaultValue={location.aboutProps.cc || ""} 
                  placeholder=" enter the Carbon Copy"
                  onChange={handleChange}
              />
              </label>
              <label>BCC
                <input 
                  type="text" 
                  name="BCC" 
                  defaultValue={location.aboutProps.bcc || ""} 
                  // ref = {inputLocationRef}
                  placeholder=" enter the Blind Carbon Copy"
                  onChange={handleChange}
              />
              </label>
  
              <label>Message<textarea defaultValue={location.aboutProps.message  || ""} rows="10" onChange={handle_textarea_Change} />
              </label>
                <input type="submit" class="btn btn-primary" id='draft_submit' value='Submit' />
  
  
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
export default Updatedraft;
