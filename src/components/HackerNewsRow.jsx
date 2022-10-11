import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {  Link } from "react-router-dom";
import styled from 'styled-components';

const NewsLi = styled.li`
  list-style: none;
  margin: 30px;
  cursor: pointer;
`;

const CardRow = styled.div`
  background-color: #eeeeee;
  border: 1px solid lightgray;
  border-radius: 6px;
  padding : 20px;
`
const CardContent =styled.div `
  display: flex;
  justify-content: space-between;
`
const DivTitle =styled.div `
  font-size: 20px;
`
const DivCount =styled.div `
  background-color: #1976d2;
  width: 40px;
  height: 33px;
  text-align: center;
  border-radius: 10px;
  color: #fafafa;
  font-weight : bold;
  padding : 4px;
`

const DivEtc =styled.div `
  display:flex;
  flex-direction: row;
  height: 30px;
  padding-left: 10px;
`

const HackerNewsRow = (props) => {
  const { news, pictureUpload } = props; /* 구조분해 할당 */
  const [file, setFile] = useState({fileName: null, fileURL: null})
  const [show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // async 비동기처리위한 선언 - await 선언하면 업로드 될 때까지 기다렸다가 처리함
  // 스프링 서버와의 연계시에도 비동기처리 코드 추가되어야 함
  const imgChange = async (event) => {
    console.log("imgChange호출")
    console.log(event.target.files[0]);


    /* *********************[[Cludinary]]*******************  */
    const upload = await pictureUpload.upload(event.target.files[0])
    setFile({
      fileName: upload.public_id + "." + upload.format,
      fileURL: upload.url,
    })
    const uploadIMG = document.getElementById("img") //input의 이미지 객체 얻어오기
    const holder = document.getElementById("uploadImg") //이미지를 집어넣을 곳의 부모태그
    const file = uploadIMG.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.src = event.target.result
      if (img.width > 150) {
        //넣으려는 사진 크기에 맞춰 width값을 제한하면 된다.
        img.width = 150
      }
      holder.innerHTML = ""
      holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false

    /* *********************[[Cludinary]]******************* */

  }

  return (
    <>
      {file.fileName+", "+file.fileURL}
      <NewsLi key={news.id}>
        <CardRow>
          <CardContent>
            <DivTitle>
              <Link to={"/newsreple/"+news.id} className="nav-link">
                {news.title}
              </Link>
            </DivTitle>
            <DivCount>{news.comments_count}</DivCount>
          </CardContent>
          <DivEtc>
            <div>
              {/* <Button onClick={imgchange}>{news.user}</Button> */}
            </div>
            <div style={ {margin : '5px', padding : '5px'} }>
              ❤ {news.points}
            </div>
            <div style={ {margin : '5px', padding : '5px'} }>
              updated {news.time_ago}
            </div>
          </DivEtc>
        </CardRow>

      <Button variant="primary" onClick={handleShow}>모달</Button>

      </NewsLi>

    {/*********************** 사진업로드 테스트 모달 ***********************/}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="f_img" method="get">
        <Form.Group className="mb-3">
          <input 
          className="form-control" 
          type="file" 
          id="img"
          name="img"
          onChange={imgChange} />
        </Form.Group>

      <div id="uploadImg">
        <img className="thumNail" src="https://via.placeholder.com/150" 
          alt="미리보기"
        />


      </div>

      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    
    {/************************ 사진업로드 테스트 모달 ************************/}
    </>
  );
};

export default HackerNewsRow;
