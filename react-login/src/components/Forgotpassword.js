import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import { BrowserRouter as Router,Switch,Route,Link,NavLink } from "react-router-dom" 

function Forgotpassword (props){
  let [email, setEmail]=useState('')
  function sendEmail(){
      if(email!==''){
       firebase.auth().sendPasswordResetEmail(email).then(()=>{
          window.alert('email has been sent')
       })
       .catch(err=>{
          let errorcode = err.code
          let errormsg = err.message
          window.alert(errormsg)
       })
      }else {
        window.alert('Please input an email')
      }
  }
return (
  <div className='forgotpassword'>
         <div className='login'>
<div className="spacer1"></div>

    <div className="title">
    <i class="fa-unlock fad"></i>
      <h1>Forgot Password</h1>
    </div>
    <div className="spacer1"></div>
      <div className="logincontainer">
        <form onSubmit={(e)=>e.preventDefault()}>
          <label >
            <span>Email</span>
            <input type="text" placeholder='example@mail.com' onChange={(e)=>setEmail(e.target.value)}/>
          </label>
            <button className='themeBtn' onClick={()=>sendEmail()}>Send email</button>
         
        </form> 
   
       <Link to='/' className='forgotPasswordButton'>Return to login page</Link>
      </div>
    
  </div>
  </div>
)
}
export default Forgotpassword