import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProviders from "./context";
import "./index.css";
import App from "./App";

// ReactDOM.render(
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>,
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </BrowserRouter>
);
