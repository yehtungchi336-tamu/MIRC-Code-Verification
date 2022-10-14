import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import { ContextApp } from "../ContextAPI";
import styled from 'styled-components'  
import Recorder from "./Recorder";

const Button =  styled.button `
&:hover {
  background-color: ${props=>props.color}
}
`
const Icon = styled.i `
color: ${props=>props.color};

`;
const Iconspecial = styled.i `
color: ${props=>props.color};
z-index: 10;
background-color: white;
&:hover {
  color: white;
  background-color:  ${props=>props.color};
}
`
const Span = styled.span `
&:hover {
  background-color: ${props=>props.color}
}
`;
function Hoverableicondiv(props) {
  const { inputref,progresswidth, progressbar,convoid,setImg,sendFile,special,icon,type, classNames, setState, state, lnk, setState2, handleEvent } = props;
  const { themecolor } = useContext(ContextApp);
  function chatFuncDisplay(){
    setState2(false);
     setTimeout(()=>{
      setState(false)
     },400)
  }
  return  (
    <>
    { type && type==='link'?    
      <Link  to={lnk} id='sth' onClick={()=>{chatFuncDisplay()}}>
      <Span color={themecolor} className={`icondiv ${classNames}`}>
      <Icon color={themecolor} className={" fal fa-" + icon}></Icon>
     </Span>
    </Link>
    :special?
    <label style={{zIndex: 4, cursor: 'pointer'}}>
        {type==='microphone'?<Recorder convoid={convoid} progressbar={progressbar} progresswidth={progresswidth}/>: 
        <><input type={type} ref={inputref} className={`${icon}file`}style={{display: 'none'}} onChange={()=>sendFile(icon)} accept={icon==='image'?"image/*":icon==='film'?'"video/mp4,video/x-m4v,video/*, mp4"':''}/>
         <Iconspecial color={themecolor} className={"icondiv fal fa-" + icon} ></Iconspecial></>}

    </label>
    :
    <Button color={themecolor} className={`icondiv ${classNames}`} onClick={()=>{setState && setState(!state); handleEvent&&handleEvent()}}>
         <Icon color={themecolor} className={" fal fa-" + icon} ></Icon>
      </Button>
  }
    </>

  );
}
export default Hoverableicondiv;
