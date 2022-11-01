import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import {db} from '../Fire'
import firebase from 'firebase'
import {ContextApp} from '../ContextAPI'
import styled from 'styled-components'  

const Input = styled.input ` 
      &:valid {
         border: solid 2px ${props=>props.color}
      }
      &:focus {
         border: solid 2px ${props=>props.color}
      }
`
function Inputs (props) {
   const {themecolor}=useContext(ContextApp)
    const {disabled, determineDelete, updateProfile,age, setAge, name, setName, city, setCity, phonenumber, setPhonenumber, website, setWebsite, country, setCountry}=props
    const user = firebase.auth().currentUser
   function deleteUser(){
      db.collection('users').doc(user.uid).delete()
      db.collection('notifications').doc(user.uid).delete()
      user.delete().then(()=>{

      }).catch(err=>{

      })
   }
 return (
<div className="inputs inps">
  <label>
    <span>Name</span>
    <Input type='text' value={name} onChange={(e)=>setName(e.target.value)} required placeholder='Name' color={themecolor}/>
  </label>
  <label>
      <span>Age</span>
     <Input color={themecolor} type="number" value={age}onChange={(e)=>setAge(e.target.value)} min='1' required placeholder='Age'/>
  </label>
  <label>
      <span>Phone Number</span>
      <Input  color={themecolor} type="number" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} required placeholder='Phone Number' />
  </label>
  <label>
      <span>City</span>
     <Input  color={themecolor} type="text" value={city} onChange={(e)=>setCity(e.target.value)} required placeholder='City'/>
  </label>
  <label>
     <span>Country</span>
     <Input  color={themecolor} type="text" value={country} onChange={(e)=>setCountry(e.target.value)} required placeholder='Country' />
  </label>
  <label>
     <span>Website URL</span>
     <Input  color={themecolor} type="text" value={website}  onChange={(e)=>setWebsite(e.target.value)} required placeholder='https://example.com'/>
  </label>
    <label className='btnContainer'>
    <button className="themeBtn" onClick={()=>updateProfile()}style={{color: 'white', border: `solid 3px transparent`, backgroundColor: themecolor}} onMouseOver={(e)=>e.target.style.cssText=`background-color: transparent; border: solid 3px ${themecolor}; color: ${themecolor}`} onMouseLeave={(e)=>e.target.style.cssText=`background-color: ${themecolor}; border: solid 3px transparent; color: white`}>Save</button>
    </label>
    <label>
       <span><strong>Delete Account</strong></span>
       <Input color={themecolor} required onChange={e=>determineDelete(e)} placeholder={'Type in '+user.displayName+' to delete account.'}/>
      <small >Key: {user.displayName}</small>
      <button disabled={disabled} className='themeBtn warning' onClick={()=>deleteUser()}>Delete Account</button>
    </label>
</div>
  )
}
export default Inputs