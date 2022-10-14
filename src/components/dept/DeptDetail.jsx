import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { jsonDeptList } from './../service/dbLogic';

const DeptDetail = (props) => {
  // DeptRow에서 쿼리스트링으로 넘어온 부서번호 담기
  const { deptno } = useParams();
  
  // useState에서 원시형으로 호출

  // 위에서 파라미터로 받은 부서번호로 조건 검색 처리한 후 담을 변수 선언
  // 똑같은 useState에서 함수형으로 호출(자스에서는 객체취급)
  // 함수형의 첫번째 파라미터가 함수이다 ??? -> 일급함수에서는 가능
  // 렌더링 될대마다 함수 초기화를 생략하고 싶다 -> useCallback
  // 한번 초기화 되면 리액트 내에서만 유지되고 싶다 useMemo()
  const [ deptVO, setDeptVO ] = useState({
    DEPTNO: 0,
    DNAME: "",
    LOC: "",
    FILENAME: "",
    FILEURL: "",
  })

  useEffect(() => {
    // 오라클 경유
    const asyncDB = async() => {
      const res = await jsonDeptList({deptno:deptno})
      console.log(res); // axios - fetch함수와 차이점 - 코드양이 줄어듦 JSON.stringify, parse사용하지 않아도 JSON 받아냄
      console.log(res.data[0]);
      //console.log(res.data[0].LOC) // NEW YORK
      setDeptVO(res.data[0])////////////////////////////// 데이터 초기화
    }
    asyncDB();
  }, [deptno]) // 의존배열이 있고 없고는 useState의 순서에는 상관이 없다


  return (
    <>
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>부서상세보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: "58rem" }}>
          <Card.Body>
            <div className="dept-detail">
              <Card.Img
                variant="top"
                style={{ width: "250px" }}
                src={`${deptVO.FILEURL}`}
              />
              <div className="dept-header">
                <Card.Title>{deptVO.DNAME}</Card.Title>
                <Card.Text>{deptVO.LOC}</Card.Text>
                <Card.Text>{deptVO.FILENAME}</Card.Text>
              </div>
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
  )
  
}

export default DeptDetail;