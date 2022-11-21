import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import {db, realtime_db} from '../Fire'
import Usernav from './Usernav'
import Userrow from './Userrow'
import Userprofile from './Userprofile'
import Usersettings from './Usersettings'
import Home from './Home'
import Adddraft from './adddraft'
import Assigntask from './assigntask'
import Updatedraft from './updatedraft'
import Assistant_draftlist from './assistant_draftlist'
import Executive_draftlist from './executive_draftlist'
import ExecutiveUpdatedraft from './executive_updatedraft'
import Linkage from './linkage'
import MailSend from './MailSend'
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
      <Route  path='/adddraft'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Adddraft handleLogout={props.handleLogout}/>
        </div>
      </Route>

      <Route  path='/linkage'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Linkage handleLogout={props.handleLogout}/>
        </div>
      </Route>

      <Route  path='/MailSend'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <MailSend handleLogout={props.handleLogout}/>
        </div>
      </Route>
      
      <Route  path='/assigntask'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Assigntask handleLogout={props.handleLogout}/>
        </div>
      </Route>

      <Route  path='/updatedraft'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Updatedraft handleLogout={props.handleLogout}/>
        </div>
      </Route>
      
      <Route  path='/assistant_draftlist'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Assistant_draftlist handleLogout={props.handleLogout}/>
        </div>
      </Route>

      <Route  path='/executive_draftlist'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <Executive_draftlist handleLogout={props.handleLogout}/>
        </div>
      </Route>

      <Route  path='/executive_updatedraft'>
        <div className={darkmode? "conversations darkmode":'conversations'} style={{backgroundColor: themecolor}}>
          <ExecutiveUpdatedraft handleLogout={props.handleLogout}/>
        </div>
      </Route>

      
  </>
  )
}
export default Paths