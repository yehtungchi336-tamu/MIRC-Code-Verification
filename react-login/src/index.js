import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

import App from "./App";
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
