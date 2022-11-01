import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function Switches (props) {
  const {checked, setChecked, function1} =props
  return (
   <div className='switchdiv'>
  <div className="flexrow switchdiv">
  <p>{props.title}</p>
  <label className='form-switch'>
  <input type="checkbox" checked={checked} onChange={(e)=>{setChecked && setChecked(e.target.checked); function1 && function1()}}/>
  <i></i>
  </label>
  </div>
  </div>
  )
}
export default Switches