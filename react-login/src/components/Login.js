import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import {db} from '../Fire'
import firebase from 'firebase'
import Forgotpassword from './Forgotpassword'
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ReactFacebookLogin from 'react-facebook-login'

function Login(props){
  const {loginwithTwitter,loginwithFacebook,loginwithGoogle,setlName,lname,name, setRoleType, setName, email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props
  function determineLoading (){
      if(props.loading) {
       return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      }else {
        return 'Log in'
      }
  }

  return (
    <>
     <Route exact path='/'>
     <div className='image'>
     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
     </div>
     <div className='login'>    
        <div className='icon'>
          <label style={{display: hasAccount?'flex': 'none'}}>  
            <button className='login-btn gog-btn' onClick={loginwithGoogle()}> <i class="fab fa-google"></i></button>
            <button className='login-btn fb-btn' onClick={loginwithFacebook()}><i className="fab fa-facebook"></i></button>
          </label>    
        </div>  
        <div className="sub_title" style={{display: hasAccount?'flex': 'none'}}>
            <p className="text-center">Or</p>
        </div>

        <div className="title">
        <h2>{hasAccount?'Log In':'Register'}</h2>
        </div>        
        <div className="spacer1"></div>
            <fieldset className="choose_role">
                <legend>Choose your role</legend>
                <div>
                  <input type="radio" id="assistant" name="interest" class="slectOne" value="assistant" onChange={(e)=>setRoleType(e.target.value)} />
                  <label for="assistant" >Assistant</label>
                </div>
                <div>
                  <input type="radio" id="executive" name="interest" class="slectOne" value="executive" onChange={(e)=>setRoleType(e.target.value)} />
                  <label for="executive" >Executive</label>
                </div>
            </fieldset>  
          <div className="logincontainer">
            <form onSubmit={(e)=>e.preventDefault()}>
              <label style={{display: hasAccount?'none': 'flex'}}>   
                <span>Name</span>
                <input type="text" placeholder='Jennifer Chang' onChange={(e)=>setName(e.target.value)}/>
              </label>

              <label>
                <span>Email address</span>
                <input type="text" value={email} placeholder='username@mail.com' onChange={(e)=>setEmail(e.target.value)}/>
                <p className='errormsgLogin'>{emailError}</p>
              </label>
              <label>
                <span>Password</span>
                <input type="password" placeholder='password' value={password}onChange={(e)=>setPassword(e.target.value)}/>
                <p className='errormsgLogin'>{passwordError}</p>
              </label>
              {hasAccount?
              <div className='btnContainer'>
                <button className='themeBtn' onClick={handleLogin}>{determineLoading()}</button>
             <div className='flex' style={{textAlign: 'center'}}>
             <Link exact to='/forgotpassword' className='forgotPasswordButton' >Forgot your password?</Link>
             </div>
             <div className='flex_warn' style={{textAlign: 'center'}}>
             <small>Don't have an account<span onClick={()=>setHasAccount(!hasAccount)} style={{cursor: 'pointer'}}>? Register</span></small>
             </div>
              </div>:
              
              <div className='btnContainer'>
                  <button className='themeBtn' style={{marginBottom: '10px'}} onClick={handleSignup}>Register</button>
                  <div className='flexrow'>
                  <small>Already have an account<span onClick={()=>setHasAccount(!hasAccount)} style={{cursor:'pointer'}}>? Sign in</span></small>
                  </div>
                  
              </div>}
              
            </form> 
             
          </div>
        
      </div>


      <div className="footer">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. MOON AND CAKE.
        </div>
      </div>

     </Route>
     <Route exact path='/forgotpassword'>
          <Forgotpassword />
     </Route>
     </>
  )
}
export default Login
