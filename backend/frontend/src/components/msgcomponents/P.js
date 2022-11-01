import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function P (props) {
  const {msg}= props
  return (
    <p>{msg}</p>
  )
}
export default P