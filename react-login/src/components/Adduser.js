import React, {useState, useEffect, useContext} from 'react'
import {ContextApp} from '../ContextAPI'
import Hoverablebutton from './Hoverablebutton'
function Adduser (props) {
  const {themecolor}= useContext(ContextApp)
let {allusers, setRecipientname,setRecipientid, recipientid, setMessage, sendMessage, msgpersonids, adduser,setAdduser, message} = props
const [keyword, setKeyword]=useState('')

function determineDisplay(user){
  if(msgpersonids && msgpersonids.includes(user.uid)){
    return <i className="fal fa-exclamation-circle"></i>
  }
else if(recipientid===user.uid){
  return <i className="fal fa-check slct" ></i>
}else {
  return <span className='slct' style={{color: themecolor, border: 'solid 1px'+themecolor}} onMouseOver={(e)=>e.target.style.cssText=`background-color:${themecolor}; border: solid 1px transparent`} onMouseLeave={(e)=>e.target.style.cssText=`background-color: transparent; border: solid 1px ${themecolor}; color: ${themecolor}`}>Select</span>
}

}
const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')
const allusersrow = allusers && allusers.map(user=>{
  if(pattern.test(user.userinfo.name.toLowerCase())) {
    return  <div className={msgpersonids && msgpersonids.includes(user.uid)?"profilepic selected":'profilepic'}>
      <div>
      <img src={user.userinfo.cover?user.userinfo.cover:"https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg"} alt=""/>
       <p>{user.userinfo.name}</p>
      </div>
      <small onClick={msgpersonids && msgpersonids.includes(user.uid)?() => {setAdduser(!adduser);}:() => {setRecipientid(user.uid); setRecipientname(user.userinfo.name)}} className={recipientid===user.uid?"usersrowselected":""}>
        {determineDisplay(user)}
      </small>
</div>
  }
  })
  function actions (){
    setMessage('')
    setAdduser(!adduser)
  }
  return (
    <>
    <div className="adduser"onClick={()=>props.setAdduser()}>
      
    </div>
    <div className="userlist bs" >
          <div className="hd">
          <h2>Add Contact</h2>
          <div className="search">
            <input type="text" placeholder='Search' onChange={(e)=>setKeyword(e.target.value)}/>
          </div>
          </div>
          <div className="overflow flex">
       {allusersrow}
          </div>
          <div className="search">
          <input type="text" placeholder='Send a message...' onChange={(e)=>setMessage(e.target.value)} value={message}/>
          <button className="themeBtn"  onClick={()=>{recipientid?sendMessage():actions()}}  style={{color: 'white', border: `solid 3px transparent`, backgroundColor: themecolor}} onMouseOver={(e)=>e.target.style.cssText=`background-color: transparent; border: solid 3px ${themecolor}; color: ${themecolor}`} onMouseLeave={(e)=>e.target.style.cssText=`background-color: ${themecolor}; border: solid 3px transparent; color: white`}>Send Message</button>
          </div>
          <i className="fal fa-times" onClick={()=>props.setAdduser()} style={{color: themecolor}}></i>
      </div>
    
    </>
  )
}
export default Adduser