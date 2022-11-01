import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function File (props) {
  const {link, name}= props
  return (

      <a href={link} target='_blank' className='file'><i className='fal fa-file'> </i><span>Download {name}</span></a>

  )
}
export default File