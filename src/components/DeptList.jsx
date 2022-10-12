import React, { useEffect, useState } from 'react';
import { jsonDeptList } from './service/dbLogic';
import Table from 'react-bootstrap/Table';
import HackerHeader from './HackerHeader';
import HackerFooter from './HackerFooter';
import { Button, Form, Modal } from 'react-bootstrap';


const DeptList = ({ authLogic, pictureUpload }) => {
    // const { authLogic } = props
    const userId = window.localStorage.getItem("userId");
    console.log("DeptList ===>"+userId);
    const [deptList, setDeptList] = useState([])
    const [file, setFile] = useState({ fileName:null, fileURL:null })
    const onLogout = () => {
        console.log("onLogout 호출 성공");
        authLogic.logout();
    }
    // html 렌더링 된 후 호출됨
    useEffect(() => {
        console.log("useEffect 호출");
        const oracleDB = async () => {
            console.log("oracleDB 호출");
            const result = await jsonDeptList({ DEPTNO:30 })
            // console.log(result);
            // console.log(result.data);
            // console.log(result.data[1].LOC);
            // console.log(result.data[2].DNAME);
            setDeptList(result.data)
        }
        oracleDB()
    }, [userId])
const imgChange = async (event) => {
    console.log("imgChange호출")
    console.log(event.target.files[0])
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
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deptInsert = () => {
        document.querySelector('#filename').value = file.fileName;
        document.querySelector('#fileurl').value = file.fileURL;
        document.querySelector('#f_dept').action = "http://localhost:9000/dept/deptInsert";
        document.querySelector('#f_dept').submit();
    }
    return (
        <>
            <HackerHeader userId={userId} onLogout={onLogout} />
            <div className='container'>
                <div className="page-header">
                    <h2>부서관리&nbsp;
                    <i className='fa-solid fa-angles-right'></i>&nbsp;
                    <small>부서목록</small>
                    </h2>
                    <hr />
                </div>
            <h2>부서 목록</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th></th>
                <th>부서번호</th>
                <th>부서명</th>
                <th>지역</th>
                </tr>
            </thead>
                <tbody>
                    {deptList.map((dept, i) => (
                        <tr key={i}>
                        <td>{i}</td>
                        <td>{dept.DEPTNO}</td>
                        <td>{dept.DNAME}</td>
                        <td>{dept.LOC}</td>
                        </tr>
                    )
                    )}
            </tbody>
            </Table>
                <hr />
                <div className="deptlist-footer">
                    <Button variant="warning">
                        전체조회
                    </Button>&nbsp;
                    <Button variant="success" onClick={handleShow}>
                        부서등록
                    </Button>
                </div>
            </div>
            {/* ========[[[부서 등록 모달 시작]]]======= */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>부서 등록</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form id="f_dept" method='get'>
                            <input id="filename" name="filename" type="hidden" />
                            <input id="fileurl" name="fileurl" type="hidden" />
                            <Form.Group className="mb-3" controlId="formBasicDeptno">
                            <Form.Label>부서 번호</Form.Label>
                            <Form.Control type="text" name="deptno" placeholder="Enter 부서번호" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDname">
                            <Form.Label>부서 이름</Form.Label>
                            <Form.Control type="text" name="dname" placeholder="Enter 부서이름" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicLoc">
                            <Form.Label>지역</Form.Label>
                            <Form.Control type="text" name="loc" placeholder="Enter 지역" />
                            </Form.Group>
                        <Form.Group className="mb-3">
                        <input
                            className="form-control"
                            type="file"
                            id="img"
                            name="img"
                            onChange={imgChange}
                        />
                        </Form.Group>
                        <div id="uploadImg">
                            <img
                                className="thumbNail"
                                src="https://via.placeholder.com/150"
                                alt="미리보기"
                            />
                        </div>
                        </Form>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={deptInsert}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* ========[[[부서 등록 모달 시작]]]======= */}
        <HackerFooter />
        </>
    );
}

export default DeptList;