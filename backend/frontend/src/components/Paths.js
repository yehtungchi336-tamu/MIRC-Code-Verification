import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import {db} from '../Fire'
import Usernav from './Usernav'
import Userrow from './Userrow'
import Userprofile from './Userprofile'
import Usersettings from './Usersettings'
import Home from './Home'
import Notifications from './Notifications'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {ContextApp} from '../ContextAPI'
function Paths (props) {
    let {chatsettings,convoinfo, onedialogue, setConvoinfo,adduser, setAdduser, userprofile, chatuser, setChatuser} =props
    const {darkmode, themecolor}=useContext(ContextApp)
    return (
   <>
   
    <Route  path='/chat'>
        <div className={darkmode?"conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>

          <div className={"chatcontainer"}>
          <div className={"userrow spanall "}>
            <Userrow chatuser={chatuser} setChatuser={setChatuser} convoinfo={convoinfo} setConvoinfo={setConvoinfo} setAdduser={()=>setAdduser(!adduser)}/>
        </div>
        
          <div className='dialogue spanall'>
                  <Switch >
                  {onedialogue}
                  </Switch>  
          </div>
            
        
        <div className="userprofile spanall">
        <Switch>
         {userprofile}
         </Switch>
        </div>
        
          </div>
      </div>
    </Route>
      <Route  path='/home'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Home handleLogout={props.handleLogout}/>
        </div>
      </Route>
    <Switch>
          {chatsettings}
    </Switch> 
      <Route path='/notifications'>
        <Notifications setChatuser={setChatuser}/>
      </Route>
    <Route  path='/settings'>
      <Usersettings  settings={'settings'} type={'settings'} link={{link0: 'settings',link1: 'preferences', link2:'themes', link3: 'support'}} linklabel={{link0: 'Account',link1: 'Preferences', link2: 'Customize', link3: 'Support'}}/>
    </Route>
  </>
  )
}
export default Paths