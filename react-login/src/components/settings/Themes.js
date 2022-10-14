import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Switches from '../Switches'
import Input from '../Input'
import firebase from 'firebase'
import { db } from '../../Fire'
import Button from '../Button'
import {ContextApp} from '../../ContextAPI'
function Themes (props) {
  const  {themecolor,notifi, setNotifi, notificont, setNotificont}=useContext(ContextApp)
  const user = firebase.auth().currentUser
  const {themeimg,setThemeimg,themebool,setEmojibool,setThemebool} = props
  const [hovered, setHovered]=useState(false)
  const [nickname, setNickname]=useState('')
  const [emoji, setEmoji]=useState('')
  const {creatorid,convoid, setEmojitype, emojitype, miniview, setMiniview}=props
  function updateProfile(){
    setNotifi(true)
    setNotificont({
      msg: 'Profile was updated!',
      emoji: 'fal fa-check-circle'
    })

    if(user.uid===creatorid){
      db.collection('conversations').doc(convoid).update({
        nickname1: nickname,
      })
    }
    else {
      db.collection('conversations').doc(convoid).update({
        nickname2: nickname,
      })
    }
    setTimeout(()=>{
      setNotifi(false)
    },3500)
  }
  useEffect(()=>{
    db.collection('conversations').doc(convoid).onSnapshot(snap=>{
        const convo =  snap.data()
        setThemeimg(convo.customizedconvo.theme) 
        setEmojitype(convo.customizedconvo.emoji)
        if(user.uid===creatorid) {
          setNickname(convo.nickname1)
        }
        else {
          setNickname(convo.nickname2)
        }
      })
  },[convoid])
  return (
   <div className='customize'>
 <div><h2>Themes</h2></div>
    <small>Customize your conversation settings.</small>
    <hr/>
      <div className="spacer1"></div>
    <div className="flex">
       <Button type='emoji' emoji='fad fa-adjust' title={'Theme'} setState1={setThemebool} state1={themebool} state3={miniview} setState3={setMiniview}/>
       <Button type={'emoji'} emoji={emojitype} title={'Emoji'} state1={emoji} setState1={setEmoji} setState2={setEmojibool}/>
       <Input  placeholder={'Nickname'} type={'text'}  title={'Nickname'} value={nickname} setValue={setNickname} />
        <div className='flexrow sb'><span></span><button className='btn' style={{color: 'white', border: `solid 3px transparent`, backgroundColor: themecolor}} onMouseOver={(e)=>e.target.style.cssText=`background-color: transparent; border: solid 3px ${themecolor}; color: ${themecolor}`} onMouseLeave={(e)=>e.target.style.cssText=`background-color: ${themecolor}; border: solid 3px transparent; color: white`} onClick={()=>updateProfile()}>Save</button></div>
    </div>
  </div>
  )
}
export default Themes