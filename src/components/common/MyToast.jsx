import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setToastFalse } from "../../store"
import styled from "styled-components"
import "./toast.css"

const ToastDIV = styled.div`
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
`

const MyToast = () => {
  //const all = useSelector(store => store)
  const status = useSelector((store) => store.status)
  const msg = useSelector((store) => store.msg)
  const dispatch = useDispatch()
  useEffect(() => {
    if (true) {
      let snackbar = document.getElementById("snackbar")
      snackbar.className = "show"
      setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "")
      }, 3000)
      //insert here
      setTimeout(() => {
        dispatch(setToastFalse())
      }, 5500)
    }
  }, [status, dispatch])

  return <ToastDIV id="snackbar">{JSON.stringify(msg)}</ToastDIV>
}

export default MyToast
