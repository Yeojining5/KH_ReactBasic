import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const NoticeDetail = (props) => {

  // NoticeRow에서 쿼리스트링으로 넘어온 부서번호 담기
  const { n_no } = useParams();

  let noticedt = props.notice.find((data) => data.n_no == n_no)

  return (
    <>
      <div className="container">
        <div className="page-header">
          <h2>
            공지사항&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>상세보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: "58rem" }}>
          <Card.Body>
            
              <div className="dept-header">
                <Card.Title>{noticedt.n_no}</Card.Title>
                <Card.Text>{noticedt.n_title}</Card.Text>
                <Card.Text>{noticedt.n_writer}</Card.Text>
                <Card.Text>{noticedt.n_content}</Card.Text>
              </div>
          </Card.Body>
          <div>
            <Button variant="primary">삭제</Button>
            <Link to="/dept" className="nav-link">
              부서목록
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default NoticeDetail;