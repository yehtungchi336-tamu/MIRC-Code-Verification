import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import {db} from '../Fire'
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
    const {convoinfo, setConvoinfo, el, setChatuser, chatuser}=props
    const [recipimg, setRecipimg]=useState('')
    // const {recipname, setRecipname, sendername, setSendername}=props
    const [recipname, setRecipname] = useState('')
    const [sendername, setSendername]=useState('')
    const [activestatus, setActivestatus]=useState(false)
    const [senderimg, setSenderimg]=useState('')
    const [loading, setLoading]=useState(true)
    const [msg, setMsg]=useState('')
    const reg = /((?:(?!(?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)).)+)|((?:https?|ftp):\/\/[\S]*\.(?:png|jpe?g|gif|svg|webp)(?:\?\S+=\S*(?:&\S+=\S*)*)?)/gm
    function ytVidId(url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false
    }
    let user = firebase.auth().currentUser
    function determineMsgtype(msg){
      if(msg.message!==undefined){
        if(msg.base64){
          return `<span style='font-size: 0px; position: absolute'>${msg.message}</span><img src="${msg.message}"/>`
        }else if(msg.file){
        return 'Sent a File'
        }else if(msg.audio){
            return 'Sent a recording'
        }
        else if(ytVidId(msg.message)){
          return 'Sent a Video'
        }
        else {
          return msg.message.replace(reg, (_, text, img) => text ? `<p>${text.trim()}</p>` : `<img src="${img}" />`)

        }
      }

    }
    function lastMsg(msg) {
      if(msg) {
        if(msg.senderid===user.uid) {
          return `<p>You:</p> ${determineMsgtype(msg)}`
        }else {
          return determineMsgtype(msg)
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
      })
      db.collection('users').doc(el.convoinfo.creatorid).onSnapshot(snap=>{
        const user = snap.data()
        setSendername(user.userinfo.name)
        setSenderimg(user.userinfo.cover)
        setLoading(false)
      })
      db.collection('conversations').doc(el.convoinfo.convoid).onSnapshot(snap=>{
        const msgs = snap.data()  
        setMsg(msgs.messages[msgs.messages.length-1])
      })
    },[el.convoinfo.recipientid, el, chatuser])
    return (
   <>
  <NavLink activeClassName='activelink' to={'/chat/'+el.convoinfo.convoid} onClick={()=>{setChatuser(el.convoinfo.creatorid===user.uid?el.convoinfo.recipientid:el.convoinfo.creatorid)}}>
      <div className="user">
          <div className="profilepic">
          {loading?<div class="lds-ring"><div></div><div></div><div></div><div></div></div>: <img src={el.convoinfo.creatorid===user.uid?recipimg:senderimg} alt=""/>}
          </div>
        <div className="info flex">
          <p className='username'>{el.convoinfo.creatorid===user.uid?recipname.length>15?recipname.slice(0, 15)+'...':recipname:sendername.length>15?sendername.slice(0, 15)+'...':sendername}</p>
          <small dangerouslySetInnerHTML={{__html: lastMsg(msg)}}></small>        
          </div>
      </div>
  </NavLink>
  </>
  )
}
export default Users