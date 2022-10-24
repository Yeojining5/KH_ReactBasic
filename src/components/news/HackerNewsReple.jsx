import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NewsRepleList from "./NewsRepleList"

const HackerNewsReple = (props) => {
  const { id } = useParams()
  //const [title, setTitle] = useState(null);
  //const [title, setTitle] = useState({});//객체 - Object - XXVO or Map
  //const [title, setTitle] = useState([{},{},{}]);// 배열 - Array - 중요 - 빈도 높다
  //const [title, setTitle] = useState([0,0,0]);// 배열 - Array - 중요 - 빈도 높다
  //const [title, setTitle] = useState("");
  const [title, setTitle] = useState("")
  const [comments, setComments] = useState([])
  useEffect(() => {
    const CONTENT_URL = `https://api.hnpwa.com/v0/item/${id}.json`
    axios
      .get(CONTENT_URL) //
      .then((response) => {
        const result = JSON.stringify(response.data)
        //계층형으로 볼 수 있고 직관적이며 반복되는 내부구조 패턴 파악이 용이함
        //아래와(문자열로 치환하지 않고서...) 같이 출력하면 state hook의 타입을 볼수 있다
        console.log(response.data)
        console.log(result)
        const jsonDoc = JSON.parse(result)
        console.log(jsonDoc.title)
        setTitle(jsonDoc.title)
        setComments(jsonDoc.comments)
      })
  })
  return (
    <>
      <h2>{title}</h2>
      <div>
        {comments.map((comment) => (
          <NewsRepleList key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  )
}

export default HackerNewsReple
