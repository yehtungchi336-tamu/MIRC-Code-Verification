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


export default function Linkage(props) {
    const { themecolor } = useContext(ContextApp)
    const user = firebase.auth().currentUser
    const [roleType, setRoleType] = useState('')
    //var roleType = 'assistant'
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

    const [inputs, setInputs] = useState({})
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        console.log(inputs.serviceid);
        console.log(inputs.templateid);
        console.log(inputs.key);

        var tutorialsRef = realtime_db.ref("/EmailLinkage");
        tutorialsRef.push({
        serviceid: inputs.serviceid,
        templateid: inputs.templateid,
        key: inputs.key
        })
        .then(
            (result) => {
              console.log(result.text);
              alert("Email Linkage SUCCESS!");
            },
            (error) => {
              console.log(error.text);
              alert("Email FAILED...", error);
            }
          );
    }


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
            return determineTime() + " " + user.msgids + " " + user.displayName + " (login type: " + user.providerData[0].providerId + ")"
        }
    }

    /*function Button({children}) {
        return <button>{children}</button>;
    }*/

    return (
        <div className="home">
        <div className="header flex sb">
            {/*<h2 className="marginBottom">{determinetext()}</h2>*/}
            <h2 style={{color: 'black'}}>Email Linkage</h2>
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
                <label>ServiceID
                <input 
                type="text" 
                name="serviceid" 
                value={inputs.serviceid || ""} 
                placeholder=" Enter ServiceID"
                onChange={handleChange}
                />
                </label>
                <label>TemplateID
                <input 
                    type="text" 
                    name="templateid" 
                    value={inputs.templateid || ""} 
                    placeholder=" Enter TemplateID"
                    onChange={handleChange}
                />
                </label>
                <label>Key (Provide Private Key if You Check the Secured Mode in EmailJS)
                <input 
                    type="text" 
                    name="key" 
                    value={inputs.key || ""} 
                    placeholder=" Enter Key"
                    onChange={handleChange}
                />

                </label>
                <input type="submit" class="btn btn-primary" id='draft_submit' value='Submit' />

            </form>


            </div>
                <a href="https://www.emailjs.com">
                    <button className="btn btn-primary" id="linkage_btn">EmailJS Linkage</button>
                </a>
            </div>
        </div>
        <div className="homeside">

        </div>
        </div>
    );
}
