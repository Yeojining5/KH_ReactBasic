import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Mypagination from "../Mypagination";
import HackerFooter from "../page/HackerFooter";
import HackerHeader from "../page/HackerHeader";
import HackerNewsRow from "./HackerNewsRow";



const HackerNews = ({ authLogic, pictureUpload, newsList, newsPerPage, totalNews, paginate }) => {

  const navigate = useNavigate()

  // :userId 해쉬값으로 넘어온 것을 Params 훅으로 받음
  const { userId } = useParams()
  console.log("구글 인증 아이디 : " + userId);

  //const [newsList, setNewsList] = React.useState([]); // App.jsx 에서 받아오는걸로 수정

  const onLogout = () => {
    console.log("onLogout 호출 성공");
    authLogic.logout();
  }

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  useEffect(() => {
    authLogic.onAuthChange((user) => {
      if (!user) {
        navigate("/")
      }
    })
  })
  
  // 없으면? 모든 변화에 반응해
  // [] 있는데 파라미터가 없으면 처음에 한 번만...
  // [keyword] 키워드가 변경될 때마다 재귀호출 일어남
  ////////////////////////////////////////이부분은 페이지네이션 추가하면서 App에서 받아오는걸로 수정함
  // useEffect(() => {
  //   fetch("https://api.hnpwa.com/v0/news/1.json", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       setNewsList(result);
  //     })
  //     .catch((error) => console.log("error", error));
  // }, []);

  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
      <div>
        {newsList.map((news) => (
          <HackerNewsRow key={news.id} news={news} pictureUpload={pictureUpload} />
        ))}

        {/* ################[[페이지네이션]]############### */}
        <Mypagination newsPerPage={newsPerPage} totalNews={totalNews} paginate={paginate} />

      </div>
      <HackerFooter />
    </>
  );
};

export default HackerNews;
