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
const Icon = styled.i `
color: ${props=>props.color}
`;
const Span = styled.span `
    background-color: red;
    &:hover {
      background-color: ${props=>props.color};
      span {
        color: white;
      }
      i {
        color: white;
      }
    }
`;

function Hoverlink(props) {
  const { themecolor } = useContext(ContextApp);
  const { num,icon,type, classNames, setState, state, lnk, txt, clk } = props;


  return  (
    <>
        <Link to={lnk} onClick={clk }>
            <Span color={themecolor} className={classNames}>
            <span>{txt}</span>
            <Icon color={themecolor} className={icon}></Icon>
            </Span>
        </Link>
    </>

  );
}
export default Hoverlink;
