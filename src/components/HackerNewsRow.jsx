import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Link } from "react-router-dom";
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
  const { news } = props;
  const [file, setFile] = useState({fileName: null, fileURL: null})
  const [show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const imgChange = (event) => {
    console.log("imgChange호출")
    console.log(event.target.files[0]);
  }
  return (
    <>
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
      </NewsLi>

    {/*********************** 사진업로드 테스트 모달 ***********************/}
    {/* <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    <Form id="f_img" method="get">
      <Form.Group className="mb-3">
        <input className="form-control" type="file" onChange={imgChange} />
      </Form.Group>
    </Form> */}
    {/************************ 사진업로드 테스트 모달 ************************/}
    </>
  );
};

export default HackerNewsRow;
