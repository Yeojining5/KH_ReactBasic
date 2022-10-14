import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import HackerFooter from "../page/HackerFooter"
import HackerHeader from "../page/HackerHeader"
import VideoDetail from "./VideoDetail"
import VideoList from "./VideoList"

const YoutubeList = ({ authLogic }) => {
  const navigate = useNavigate()
  //useState(""), useState(null), useState({}), useState([])
  const [videos, setVideos] = useState([])
  // null과 undefined 차이 정리해 둘 것
  const [keyword, setKeyword] = useState()
  // 상세화면 추가 작성 건
  const [selectedVideo, setSelectedVideo] = useState(null)
  // 비디오를 선택하면 호출할 함수구현
  const videoSelect = (video) => {
    console.log(video)
    setSelectedVideo(video)
  }
  const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
  }
  useEffect(() => {
    authLogic.onAuthChange((user) => {
      if (!user) {
        navigate("/")
      }
    })
  }, [])
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=AIzaSyDvqdPZWgzvtJvUp22554mEjgFmQ5CuIxw`
      ) //
      .then((result) => {
        setVideos(result.data.items)
      })
  }, [])
  // 검색 버튼 클릭하면 인터셉트함
  const youtubeSearch = (event) => {
    console.log("search click....")
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyDvqdPZWgzvtJvUp22554mEjgFmQ5CuIxw&type=video`
      ) //
      .then((result) => result.data)
      .then(
        (data) => data.items.map((item) => ({ ...item, id: item.id.videoId })) //얕은복사하기 -spread 연산자
      )
      .then((items) => {
        console.log(items)
        setVideos(items)
        setSelectedVideo(null)
      })
      .catch((error) => console.log("error", error))
  }
  const onChangeInput = (event) => {
    console.log(
      "키보드를 누를때 마다 useState에 초기화 하기" + event.target.value
    )
    setKeyword(event.target.value)
  }
  return (
    <>
      <HackerHeader onLogout={onLogout} />
      <div className="container">
        <div className="page-header">
          <h2>
            Youtube&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>유튜브</small>
          </h2>
          <hr />
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="검색"
            aria-label="검색"
            name="keyword"
            aria-describedby="basic-addon1"
            onChange={onChangeInput}
            onKeyPress={youtubeSearch}
          />
          <Button
            className="btn btn-danger"
            id="basic-addon1"
            onClick={youtubeSearch}
          >
            Search
          </Button>
        </InputGroup>
        {selectedVideo && (
          <div>
            <VideoDetail video={selectedVideo} />
          </div>
        )}

        <VideoList videos={videos} videoSelect={videoSelect} />
      </div>
      <HackerFooter />
    </>
  )
}

export default YoutubeList
