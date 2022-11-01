import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import {ContextApp} from '../ContextAPI'
import {createGlobalStyle, createglobalStyle} from 'styled-components'

function Input (props) {
  const {themecolor}=useContext(ContextApp)
  const {type, title, value, setValue, placeholder, changeCSSVar} = props

  return (
   <div className='input flexrow sb'>
     <p>{title}</p>
     {type==='text'?<input required onBlur={(e)=>e.target.style.border='solid 2px #eee'} onFocus={(e)=>e.target.style.border=`solid 2px ${value}`} placeholder={placeholder} type={type} value={value} onChange={(e)=>{setValue(e.target.value)}}/>:
         <input required onBlur={(e)=>e.target.style.border='solid 2px #eee'} onFocus={(e)=>e.target.style.border=`solid 2px ${value}`} placeholder={placeholder} type={type} value={value} onChange={(e)=>{setValue(e.target.value); changeCSSVar(e)}}/>
    }
    </div>
  )
}
export default Input