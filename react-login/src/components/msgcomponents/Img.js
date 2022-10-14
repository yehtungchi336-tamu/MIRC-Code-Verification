import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function Img (props) {
  const {src, link}= props
  return (
    <>
    {link?   <span style={{fontSize: '0px', position:'absolute'}}>{src}</span>:''}
    <img src={src}/>
    </>
  )
}
export default Img