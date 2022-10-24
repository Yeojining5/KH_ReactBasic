import { Route, Routes } from "react-router-dom"
import HackerNews from "./components/news/HackerNews"
import HackerNewsReple from "./components/news/HackerNewsReple"
import LoginPage from "./components/LoginPage"
import "bootstrap/dist/css/bootstrap.min.css"
import DeptList from "./components/dept/DeptList"
import "./css/dept.css"
import DeptDetail from './components/dept/DeptDetail';
import YoutubeList from './components/youtube/YoutubeList';
import NoticeList from './components/notice/NoticeList';
import NoticeDetail from './components/notice/NoticeDetail';
import { useState, useEffect } from 'react';
import axios from "axios"
import DBBoardList from './components/board/DBBoardList';

const App = ({ authLogic, pictureUpload }) => {

  // 페이징 처리 추가
  const [newsList, setNewsList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [newsPerPage, setNewsPerPage] = useState(5) // 한페이지에 들어갈 개수
  const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json"

  useEffect(() => {
    axios.get(NEWS_URL).then((response) => {
      setNewsList(response.data)
    })
  }, [])

  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = (news) => {
    let currentNews = 0
    currentNews = news.slice(indexOfFirst, indexOfLast)
    return currentNews
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<LoginPage authLogic={authLogic} />}
        />
        <Route
          path="/board"
          exact={true}
          element={<DBBoardList authLogic={authLogic} />}
        />
        <Route
          path="/notice"
          exact={true}
          element={<NoticeList authLogic={authLogic} />}
        />
        <Route
          path="/noticedetail/:n_no"
          exact={true}
          element={<NoticeDetail authLogic={authLogic}  />}
        />

        <Route
          path="/youtube"
          exact={true}
          element={<YoutubeList authLogic={authLogic} />}
        />

        <Route
          path="/dept"
          exact={true}
          element={<DeptList authLogic={authLogic} pictureUpload={pictureUpload} />}
        />
        <Route
          path="/deptdetail/:detpno"
          exact={true}
          element={<DeptDetail/>
          }
        />

        <Route
          path="/hackernews/:userId"
          exact={true}
          element={
            <HackerNews 
              authLogic={authLogic} 
              pictureUpload={pictureUpload} 
              newsList={currentNews(newsList)} 
              paginate={setCurrentPage}
              newsPerPage={newsPerPage} 
              totalNews={newsList.length}
            />
          }
        />
        <Route
          path="/newsreple/:id"
          exact={true}
          element={<HackerNewsReple />}
        />
      </Routes>
    </>
  )
}

export default App
