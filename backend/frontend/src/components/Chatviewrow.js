import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect, useLocation } from "react-router-dom" 
import firebase from 'firebase'
import {db} from '../Fire'
import Hoverableicondiv from './Hoverableiconsdiv'
function Users (props) {
  // const [name, setName]=useState('')
  // const [img, setImg]=useState('')
  // const [city, setCity]=useState('')
  // const [country, setCountry]=useState('')
  // const [job, setJob]=useState('')
  // const [recipnumber, setRecipnumber]=useState('')
  // const [recipemail, setRecipemail]=useState('')
  // const [recipwebsite, setRecipwebsite]=useState('')
  // const [extend, setExtend]=useState(false)
    const {lnk,convoinfo, setConvoinfo, el, setChatuser, chatuser, setChatstarted, setChatview}=props
    const [recipimg, setRecipimg]=useState('')
    // const {recipname, setRecipname, sendername, setSendername}=props
    const [recipname, setRecipname] = useState('')
    const [sendername, setSendername]=useState('')
    const [activestatus, setActivestatus]=useState(false)
    const [senderimg, setSenderimg]=useState('')
    const [senderonline, setSenderonline]=useState(false)
    const [reciponline, setReciponline]=useState(false)
    const [loading, setLoading]=useState(true)
    const [msg, setMsg]=useState('')
    const location = useLocation()
    let user = firebase.auth().currentUser
  function colorFunc(){
    if(el.convoinfo.creatorid===user.uid){
        if(reciponline){
          return 'rgb(44, 255, 44)'
        }else {
          return '#FF3D3D'
        }
    }else {
      if(senderonline){
        return 'rgb(44, 255, 44)'
      }else {
        return '#FF3D3D'
      }
    }
  }
    useEffect(()=>{
      db.collection('users').doc(el.convoinfo.recipientid).onSnapshot(snap=>{
        const user = snap.data()
        setRecipname(user.userinfo.name)
        setRecipimg(user.userinfo.cover)
        setActivestatus(user.userinfo.online)
        setLoading(false)
        setReciponline(user.online)
      })
      db.collection('users').doc(el.convoinfo.creatorid).onSnapshot(snap=>{
        const user = snap.data()
        setSendername(user.userinfo.name)
        setSenderimg(user.userinfo.cover)
        setLoading(false)
        setSenderonline(user.online)
      })
      db.collection('conversations').doc(el.convoinfo.convoid).onSnapshot(snap=>{
        const msgs = snap.data()  
        setMsg(msgs.messages[msgs.messages.length-1])
      })
    
    },[el.convoinfo.recipientid, el, chatuser])
    return (
   <>
  <Link   onClick={()=>{setChatuser(el.convoinfo.creatorid===user.uid?el.convoinfo.recipientid:el.convoinfo.creatorid)}} >
    {loading?<div class="lds-ring"><div></div><div></div><div></div><div></div></div>:<div className='flexrow' onClick={()=>setChatstarted(true)}> <img src={el.convoinfo.creatorid===user.uid?recipimg:senderimg} alt=""/>  <small>{el.convoinfo.creatorid===user.uid?recipname:sendername}</small>    <div className="notifi" style={{backgroundColor: colorFunc()}}></div> </div>}

      <Hoverableicondiv icon={'ellipsis-h-alt'} classNames={'white'} type={'link'} lnk={`/chatsettings/${el.convoinfo.convoid}`} setState={setChatview} setState2={setChatstarted}/>
  </Link>
  </>
  )
}
export default Users