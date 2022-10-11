import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AuthLogic from "./components/service/authLogic"
import firebaseApp from "./components/service/firebase"
import "@fortawesome/fontawesome-free/js/all.js"
import PictureUpload from "./components/service/pictureUpload"

const authLogic = new AuthLogic(firebaseApp)
const pictureUpload = new PictureUpload()
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authLogic={authLogic} pictureUpload={pictureUpload} />
    </BrowserRouter>
  </React.StrictMode>
)
//npm install --save @fortawesome/fontawesome-free 설치할 것
