import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function Iframe (props) {
  const {link, type}= props
  return (
<>
  {
    type==='video'?
      <video controls src={link}  allowFullScreen>
         
      </video>
      :
      <iframe src={link} allowFullScreen>

      </iframe>
}
</>
  )
}
export default Iframe