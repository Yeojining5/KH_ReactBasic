import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthLogic from "./components/service/authLogic";
import firebaseApp from "./components/service/firebase";
import "@fortawesome/fontawesome-free/js/all.js"
//npm install --save @fortawesome/fontawesome-free

const authLogic = new AuthLogic(firebaseApp);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authLogic={authLogic} />
    </BrowserRouter>
  </React.StrictMode>
);
