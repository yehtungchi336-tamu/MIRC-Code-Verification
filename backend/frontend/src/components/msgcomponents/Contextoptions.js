import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function Contextoptions (props) {
  const {text,classNames, icon, function1, setState, re}= props
  return (
    <div className={classNames} ref={re &&re}onClick={(e)=>{setState && setState(prev=>!prev);e.stopPropagation(); function1 && function1()}}>
    <i className={icon} ></i>
    </div>
  )
}
export default Contextoptions