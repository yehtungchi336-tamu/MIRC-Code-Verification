import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'



function Button (props) {
  const {emoji,state1, setState1, setState2,style, function1, type, title, addstyle, state3, setState3, stylebtn}=props
  function styleFunc(){
    if(addstyle){
      if(state1){
        return {backgroundColor: 'transparent', border: 'solid 3px'+style, color: style}
      }else {
        return {backgroundColor: style, border: 'solid 3px transparent'}
      }
    }
  }
  return (
      <div className='flexrow sb'>
      {type==='button'?<div></div>:<p>{title}</p>}
      {type==='button'?<button className='btn'   onClick={()=>{function1()}} >Save</button>:<i class={emoji} onClick={()=>{props.setState1(!state1); setState2 && setState2(true)}} onMouseOver={()=>setState3 && setState3(true)} onMouseLeave={()=>setState3 && setState3(false)}></i>}
      {(emoji!=='fad fa-adjust'&&type!=='button')?<span role='img' aria-label='emoji' onClick={()=>{props.setState1(!state1); setState2 && setState2(true)}}>{emoji}</span>:''}
      </div>
  )
}
export default Button
