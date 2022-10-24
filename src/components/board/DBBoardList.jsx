import React, { useEffect, useState } from "react"
import { jsonBoardList } from "../service/dbLogic"

function DBBoardList(props) {
  // useState(""), useState({}), useState([])
  // useEffect보다 먼저 호출 - 시점문제
  const [boards, setBoards] = useState([])
  const userId = window.localStorage.getItem("userId")
  useEffect(() => {
    const boardsDB = async () => {
      console.log("boardsDB 호출")
      const result = await jsonBoardList({ bm_no: 1 })
      console.log(result.data)
      /*      */
      if (result.data) {
        setBoards(result.data)
      }

      console.log(boards)
    }
    boardsDB()
  })
  return <div>여기에 반영해줘</div>
}

export default DBBoardList
