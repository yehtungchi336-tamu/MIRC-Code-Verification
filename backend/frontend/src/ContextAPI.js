import React, { createContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { db } from './Fire'
export let ContextApp=createContext()
let ContextAppProvider=(props)=>{
  const user = firebase.auth().currentUser
  const [darkmode, setDarkmode]=useState(false)
  const [widemode, setWidemode]=useState(false)
  const [chatcolor, setChatcolor]=useState('')
  const [themecolor, setThemecolor]=useState('')
  const [notifi, setNotifi]=useState(false)
  const [notificont, setNotificont]=useState({
    emoji: '',
    msg: ''
  })
  if(user) {
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      let user = snap.data()
      setDarkmode(user.customization.darkmode)
      setWidemode(user.customization.widemode)
      setChatcolor(user.customization.color)
      setThemecolor(user.customization.themecolor)
    })
  }
  return (
    <ContextApp.Provider value={{darkmode, widemode, chatcolor, themecolor, notificont, notifi, setNotificont, setNotifi}}>
      {props.children}
    </ContextApp.Provider>
  )
}
export default ContextAppProvider