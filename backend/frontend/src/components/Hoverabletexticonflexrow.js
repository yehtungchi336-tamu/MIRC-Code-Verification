import React, { useState, useEffect, useContext } from "react";
import { ContextApp } from "../ContextAPI";

function Hoverabletexticonflexrow(props) {
  const { themecolor } = useContext(ContextApp);
  const { icon, classNames, text, functionOne } = props;
  return (
    <div
     
      className={`${classNames} white`}
      onClick={functionOne}
    >
      <i className={"whiteel fad fa-" + icon} ></i>
        <p className='white' >{text}</p>
    </div>
  );
}
export default Hoverabletexticonflexrow;
