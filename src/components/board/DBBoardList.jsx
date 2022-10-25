import React, { useEffect, useState } from "react"
import { jsonBoardList } from "../service/dbLogic"
import DBBoardRow from './DBBoardRow';
import { Table, Button ,Modal, Form } from 'react-bootstrap';
import axios from "axios"

function DBBoardList({ authLogic }) {
  // useState(""), useState({}), useState([])
  // useEffect보다 먼저 호출 - 시점문제

  const [boards, setBoards] = useState([])
  const userId = window.localStorage.getItem("userId")

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  /* jsonBoardList 데이터 가져오기 */
  useEffect(() => {
    const boardsDB = async () => {
      console.log("boardsDB 호출")
      const result = await jsonBoardList({ bm_no: 1 })
      console.log(result.data)
      /*      */
      if (result.data) {
        setBoards(result.data)
        //return
      }
      return () => {
        console.log(boards)
      }
    }
    boardsDB()
  }, [])


  /* *************************************************  */
  // onchange 이벤트로 input 값 가져오기
  //File은 e.target.files[0]로 가져오는게 핵심 - e.target.value로 가져오면 에러
  const onChange = (e) => {
    if(e.currentTarget == null) return;
  }

  const onChangeFile = (e) => {
    if(e.currentTarget == null) return;
    //console.log(e.target.files[0]);
  }

  /* ************************************************** */
  ////////////// 글등록 //////////////////
  const boardInsert = (e) => {

    e.preventDefault()
    let list = {
        // json 형태로 spring에 값을 넘김
        b_title: e.target.b_title.value,
        b_writer: e.target.b_writer.value,
        b_pw: e.target.b_pw.value,
        b_content: e.target.b_content.value,
        bs_file: e.target.bs_file.files[0],
    }
    console.log("boardInput => "+ JSON.stringify(list));

    axios
    .post(process.env.REACT_APP_SPRING_IP +"board/rboardInsert", list, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
        console.log(response.data);
        if(response==1)
          handleClose();
          window.location.replace("/board")
    })
    .catch((error) => {
        console.log(error);
    })
  }
  /* ************************************************** */



  return (
    <>

      <Table striped bordered hover>
        <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>첨부파일</th>
              <th>조회수</th>
            </tr>
        </thead>

        <tbody>
          {
            boards && Object.keys(boards).map((key) => (
              <DBBoardRow key={key} board={boards[key]} />
            ))
          }
        </tbody>

      </Table>

              <hr />
        <div className="deptlist-footer">
            <Button variant="warning" >
                전체조회
            </Button>&nbsp;
            <Button variant="success" onClick={handleShow}>
                글쓰기
            </Button>
        </div>

      {/* ========[[[등록 모달 시작]]]======= */}
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>게시글 등록</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* ##########################[[Form 전송 insert]]########################### */}
                    <form id="f_board" onSubmit={boardInsert} encType="multipart/form-data" >
                        <input id="filename" name="filename" type="hidden" />
                        <input id="fileurl" name="fileurl" type="hidden" />
                        <Form.Group className="mb-3" controlId="formBasicDeptno">
                            <Form.Label>제목</Form.Label>
                            <input type='text' name='b_title' onChange={onChange}  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDname">
                            <Form.Label>작성자</Form.Label>
                            <input type='text' name='b_writer' onChange={onChange}  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLoc">
                            <Form.Label>비밀번호</Form.Label>
                            <input type='text' name='b_pw' onChange={onChange}  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLoc">
                            <Form.Label>내용</Form.Label>
                            <input type='textarea' name='b_content' onChange={onChange}  />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <input
                                className="form-control"
                                type="file"
                                id="bs_file"
                                name="bs_file"
                                onChange={onChangeFile} 
                            />
                        </Form.Group>

                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <input type="submit" value="저장" />

                    </form>
                    {/* ##########################[[Form 전송 insert]]########################### */}
                </Modal.Body>
            </Modal>
            {/* ========[[[ 등록 모달 끝]]]======= */}
      
    </>
  )
}

export default DBBoardList
