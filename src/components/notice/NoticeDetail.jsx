import React, { useEffect, useState } from "react";
import { Card, Button, ListGroup, Form, Modal } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { onValue, remove } from 'firebase/database';
import { ref, getDatabase } from 'firebase/database';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import HackerHeader from './../page/HackerHeader';
import HackerFooter from "../page/HackerFooter";
import { set } from 'firebase/database';

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
const db = getDatabase();



const NoticeDetail = (props) => {


  // 목록 버튼 클릭 시 목록으로 돌아가기 = NoticeList.jsx
  const navigate = useNavigate();

  // NoticeRow에서 쿼리스트링으로 넘어온 부서번호 해시값 가져오기
  let { n_no } = useParams();

  // 상태를 관리하는 state훅은 비동기 처리를 함
  const [notice, setNotice] = useState({
    n_no: 0,
    n_title:"",
    n_writer:"",
    n_content:"",
  })

  // real database 서버에서 가져오기
  useEffect(() => {
    const starCountRef = ref(db, "notice/"+n_no) // n_no에 대응하는 1건만 가져옴
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setNotice(data)
    })
  }, [])

  // 수정하기
  const noticeUpdate = (e) => {
    e.preventDefault();
    console.log(
      "수정할 정보 : " + n_no +", " + notice.n_title + ", "+notice.n_writer+", "+notice.n_content
    )
    set(ref(db, "notice/"+n_no), notice)
    handleClose()
  }

  //삭제하기
  const noticeDelete = () => {
    console.log("삭제할 n_no : " +n_no);
    remove(ref(db, `notice/${n_no}`))
    navigate("/notice")
  }
  // 목록 이동
  const noticeList = () => {
    navigate("/notice")
  }

  /////////////////////////// 모달 관련
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /// 모달form의 제목, 작성자, 내용에 모두 onChange이벤트로 걸어줘야함
  const handleChangeForm = (e) => {
    if(e.currentTarget == null) return;
    e.preventDefault();
    setNotice({
      ...notice,
      n_no: n_no,
      [e.target.name]: e.target.value,
    })
  }
//////////////////////////////////////////

  return (
    <>
      <HackerHeader />

      <div className="container">
        <div className="page-header">
          <h2>
            공지사항&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>상세보기</small>
          </h2>
          <hr />
        </div>

        <Card style={{ width: "58rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>{notice.n_title}</ListGroup.Item>
            <ListGroup.Item>{notice.n_writer}</ListGroup.Item>
            <ListGroup.Item>{notice.n_content}</ListGroup.Item>
          </ListGroup>
          <div className="detail-link">
            <Button variant="primary" onClick={handleShow}>수정</Button>
            &nbsp;
            <Button variant="primary" onClick={noticeDelete}>삭제</Button>
            &nbsp;
            <Button variant="primary" onClick={noticeList}>목록</Button>
          </div>
        </Card>

      </div>

      <HackerFooter />


      {/* ========[[[공지 수정 모달 시작]]]======= */}
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>공지 수정</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form id="f_dept" method='get'>
                            <input id="filename" name="filename" type="hidden" />
                            <input id="fileurl" name="fileurl" type="hidden" />
                            <Form.Group className="mb-3" controlId="formBasicDeptno">
                              <Form.Label>제목</Form.Label>
                              <Form.Control type="text" name="n_title" placeholder="Enter 제목" 
                                value={notice.n_title}
                                onChange={handleChangeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDname">
                              <Form.Label>작성자</Form.Label>
                              <Form.Control type="text" name="n_writer" placeholder="Enter 작성자" 
                                value={notice.n_writer}
                                onChange={handleChangeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLoc">
                              <Form.Label>내용</Form.Label>
                              <Form.Control as="textarea" rows={5} name="n_content" placeholder="Enter 내용"
                                value={notice.n_content}
                                onChange={handleChangeForm} />
                            </Form.Group>
                      
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={noticeUpdate}>
                            수정
                        </Button>
                    </Modal.Footer>
              </Modal>
{/* ========[[[공지 수정 모달 끝]]]======= */}

    </>
  );
};

export default NoticeDetail;