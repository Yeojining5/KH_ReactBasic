import React, { useEffect, useState } from 'react';
import { jsonDeptList } from '../service/dbLogic';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import HackerHeader from '../page/HackerHeader';
import HackerFooter from '../page/HackerFooter';
import DeptRow from './DeptRow';


// state가 바뀌면 DeptList는 재렌더링 된다 (=주소번지가 바뀐다, =useEffect의 갱신도 일어남)
// useEffect와 상관없는 일이어도 갱신이 일어난다면 비효율적 => useMemo가 중요한 이유
const DeptList = ({ authLogic, pictureUpload }) => {
    // const { authLogic } = props
    const [show, setShow] = useState(false)
    const [file, setFile] = useState({ fileName: null, fileURL: null })
    const [deptList, setDeptList] = useState([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const userId = window.localStorage.getItem("userId")
    console.log("DeptList===>" + userId)

    const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
    }


  // html 렌더링 된 후 호출됨
    useEffect(() => {
    console.log("useEffect 호출")
    const oracleDB = async () => {
        console.log("oracleDB 호출")
        //const result = await jsonDeptList({ DEPTNO: 30 }) -> 스프링콘솔에 com.example.demo.dao.DeptDao  : pMap : {DEPTNO=30}
        const result = await jsonDeptList() // pMap : {}
        console.log(result)
        console.log(result.data)
        console.log(result.data[1].LOC)
        console.log(result.data[2].DNAME)
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

    const deptInsert = () => {
        document.querySelector("#filename").value = file.fileName
        //document.querySelector("#filename").value = "a.png"
        document.querySelector("#fileurl").value = file.fileURL
        //document.querySelector("#fileurl").value = "a.png"
        document.querySelector("#f_dept").action =
            "http://localhost:9000/dept/deptInsert"
        document.querySelector("#f_dept").submit()
    }
    
    const reactSearch = () => {
        // deptno, dname, loc 컬럼명을 저장함
        const gubun = document.querySelector("#gubun").value;
        const keyword = document.querySelector("#keyword").value;
        console.log(gubun+","+keyword);
        const asyncDB = async() => {
            const res = await jsonDeptList({ gubun : gubun, keyword: keyword  })
            if(res.data){
                console.log(res.data);
                setDeptList(res.data);
            }
        }
        asyncDB()
    };

    const deptRefresh = () => {

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

{/* ####################[[조건 검색]]############################## */}
            <div className="row">
                <div className="col-3">
                    <select id="gubun" className="form-select" aria-label="분류선택">
                        <option defaultValue>분류선택</option>
                        <option value="deptno">부서번호</option>
                        <option value="dname">부서명</option>
                        <option value="loc">지역</option>
                    </select>
                </div>

                <div className="col-6">
                    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" />
                </div>
                
                <div className="col-3">
                    <Button id="btn_search" variant="danger" onClick={reactSearch}>검색</Button>
                </div>
            </div>
{/* ################################################################ */}

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
                    // <tr key={i}>
                    // <td>{i}</td>
                    // <td>{dept.DEPTNO}</td>
                    // <td>{dept.DNAME}</td>
                    // <td>{dept.LOC}</td>
                    // </tr>
                    <DeptRow key={i} dept={dept} />
                )
                )}
            </tbody>
            </Table>
                <hr />
                <div className="deptlist-footer">
                    <Button variant="warning" onClick={deptRefresh}>
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
                    {/* ##########################[[Form 전송 insert]]########################### */}
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
                            src="http://via.placeholder.com/200X250"
                            alt="미리보기"
                        />
                    </div>
                    </Form>
                    {/* ##########################[[Form 전송 insert]]########################### */}
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
            {/* ========[[[부서 등록 모달 끝]]]======= */}
        <HackerFooter />
        </>
    );
}

export default DeptList;