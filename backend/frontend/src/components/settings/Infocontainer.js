import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function Infocontainer (props) {
  const {variable, title}=props
  return (
   <>
      <div className="flexrow sb" style={{margin: '10px 0'}}>
      <p>{title}:</p>
      <p className='light'>{variable?variable:'N/A'}</p>
    </div>
  </>
  )
}
export default Infocontainer