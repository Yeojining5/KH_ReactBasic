import React, { useEffect, useRef, useState } from 'react';
//import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { Button, Form, InputGroup, Table, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import HackerHeader from './../page/HackerHeader';
import HackerFooter from './../page/HackerFooter';
import NoticeRow from './NoticeRow';
import "./notice.css"
import { Navigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FS_DATABASEURL,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID,
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();


const NoticeList = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  // 1개 로우를 받는 경우
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title: '',
    n_writer: '',
    n_content: '',
    n_date: '',
  })

  // n건의 로우를 받는 경우
  const [notices, setNotices] = useState({
    "1": {n_no:3, n_title:"공휴일 공지", n_writer:"관리자", n_date:"2022-10-20", n_content: "내용3"},
    "2": {n_no:2, n_title:"배송지연 공지", n_writer:"관리자", n_date:"2022-10-19", n_content: "내용2"},
    "3": {n_no:1, n_title:"신제품 출시 안내", n_writer:"관리자", n_date:"2022-10-18", n_content: "내용1"},
  })


  /// 공지사항 조건검색 이벤트
  const noticeSearch = () => {

    const gubun = document.querySelector("#gubun").value;
    const keyword = document.querySelector("#keyword").value;
    console.log(gubun+","+keyword);

    let result = [];
    // {}, {}, {} 형태
    if(gubun === "n_title") {
      Object.keys(notices).map((key) =>
        notices[key].n_title && notices[key].n_title === keyword 
        ? result.push(notices[key]) 
        : null 
      )
    }else if(gubun === "n_writer") {
      Object.keys(notices).map((key) =>
        notices[key].n_writer && notices[key].n_writer === keyword 
        ? result.push(notices[key]) 
        : null 
      )
    } else if(gubun === "n_content") {
      Object.keys(notices).map((key) =>
        notices[key].n_content && notices[key].n_content === keyword 
        ? result.push(notices[key]) 
        : null 
      )
    }
    setNotices(result)

  } /* end of noticeSearch */


  /// 공지사항 등록 버튼 이벤트
  const noticeInsert = (e) => {
    // submit 사용시 페이지 새로고침 처리 방어코드 삽입 - 주입
    e.preventDefault(); // 이벤트 버블링 방어코드 삽입할 것
    set(ref(database, "notice/" + notice.n_no), notice)
    handleClose();
  }

  /// 모달form의 제목, 작성자, 내용에 모두 onChange이벤트로 걸어줘야함
  const handleChangeForm = (e) => {
    if(e.currentTarget == null) return;
    console.log("폼 내용 변경 발생 name : "+e.target.name);
    console.log("폼 내용 변경 발생 value : "+e.target.value);

    setNotice({
      ...notice,
      n_date: Date.now(),
      [e.target.name]: e.target.value,
    })
  }

  const noticeList = () => {
    console.log("noticeList");
    //Navigate("/notice")
    //window.location.reload()
    setNotices({...notices})
  }


  return (
    <>
      <HackerHeader />

      <div className="container">
        <div className="page-header">
          <h2>고객센터&nbsp;
          <i className='fa-solid fa-angles-right'></i>&nbsp;
          <small>공지사항</small>
          </h2>
          <hr />
        </div>


{/* //////////////////조건검색/////////////////// */}
        <div className="row">
            <div className="col-3">
                <select id="gubun" className="form-select" aria-label="분류선택">
                    <option defaultValue>분류선택</option>
                    <option value="n_title">제목</option>
                    <option value="n_writer">작성자</option>
                    <option value="n_content">내용</option>
                </select>
            </div>

            <div className="col-6">
                <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" />
            </div>
            
            <div className="col-3">
                <Button id="btn_search" variant="danger" onClick={noticeSearch} >검색</Button>
            </div>
        </div>

{/* //////////////////////////////////////////// */}

        <Table striped bordered hover>
        <thead>
            <tr>
            <th>no</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            </tr>
        </thead>
        <tbody>
          {
            notices && Object.keys(notices).map((key) => (
              <NoticeRow key={key} notice={notices[key]} />
            ))
          }

        </tbody>
        </Table>

        <hr />

        <div className="noticelist-footer">
            <Button variant="warning" onClick={noticeList}>
                전체조회
            </Button>&nbsp;
            <Button variant="success" onClick={handleShow}>
                공지등록
            </Button>
        </div>

      </div>

{/* ========[[[공지사항 등록 모달 시작]]]======= */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>부서 등록</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form id="f_dept" method='get'>
                            <input id="filename" name="filename" type="hidden" />
                            <input id="fileurl" name="fileurl" type="hidden" />
                            <Form.Group className="mb-3" controlId="formBasicDeptno">
                              <Form.Label>제목</Form.Label>
                              <Form.Control type="text" name="n_title" placeholder="Enter 제목" onChange={handleChangeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDname">
                              <Form.Label>작성자</Form.Label>
                              <Form.Control type="text" name="n_writer" placeholder="Enter 작성자" onChange={handleChangeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLoc">
                              <Form.Label>내용</Form.Label>
                              <Form.Control as="textarea" rows={5} name="n_content" placeholder="Enter 내용" onChange={handleChangeForm} />
                            </Form.Group>
                      
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={noticeInsert}>
                            저장
                        </Button>
                    </Modal.Footer>
              </Modal>
{/* ========[[[공지사항 등록 모달 끝]]]======= */}


      <HackerFooter />
    </>
  );
};

export default NoticeList;