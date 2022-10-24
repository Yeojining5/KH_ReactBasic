import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import AuthLogic from "./components/service/authLogic"
import firebaseApp from "./components/service/firebase"
import "@fortawesome/fontawesome-free/js/all.js"
import PictureUpload from "./components/service/pictureUpload"
import CartApp from './components/cartExam/CartApp';
import { Provider, useSelector } from "react-redux"
import { legacy_createStore } from "redux"
import reducer, { initAuth } from "./store"

const authLogic = new AuthLogic(firebaseApp)
const pictureUpload = new PictureUpload()
const root = ReactDOM.createRoot(document.getElementById("root"));

let store = legacy_createStore(reducer)
//const auth = useSelector((store) => store.auth)
store.dispatch(
  initAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider()))
console.log(store.getState());

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App authLogic={authLogic} pictureUpload={pictureUpload} />
        {/* <CartApp /> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
//npm install --save @fortawesome/fontawesome-free 설치할 것
