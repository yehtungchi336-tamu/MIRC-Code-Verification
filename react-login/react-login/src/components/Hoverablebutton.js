import React, { useState, useEffect, useContext } from "react";

import { ContextApp } from "../ContextAPI";
import styled from 'styled-components'
const Button = styled.button ` 
background-color: ${props=>props.color};
border: solid 3px transparent;
  &:hover {
    background-color: white;
    border: solid 3px ${props=>props.color}
  }
`
function Hoverablebutton(props) {
  const { themecolor } = useContext(ContextApp);
  const { state, setState, type, text } = props;

  return (      
      <Button 
      color={themecolor}
       className={state===type?'themeBtn active':'themeBtn'}
        onClick={()=>setState(type)}
      > 
        {text}
      </Button>
    );
}
export default Hoverablebutton;
