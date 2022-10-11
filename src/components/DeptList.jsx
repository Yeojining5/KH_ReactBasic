import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { jsonDeptList } from "./service/dbLogic"
import HackerFooter from "./HackerFooter"
import HackerHeader from "./HackerHeader"
import { Table } from "react-bootstrap"

const DeptList = ({ authLogic }) => {
  //const { authLogic } = props;
  const { userId } = useParams()
  //console.log(userId)

  const [deptList, setDeptList] = useState([])
  
  const onLogout = () => {
    console.log("onLogout 호출 성공")
    authLogic.logout()
  }
  // html 렌더링 된 후 호출됨
  useEffect(() => {
    console.log("useEffect 호출")
    const oracleDB = async () => {
      console.log("oracleDB 호출")
      const result = await jsonDeptList({ DEPTNO: 30 })
      console.log(result)
      console.log(result.data)
      console.log(result.data[1].LOC)
      console.log(result.data[2].DNAME)
      setDeptList(result.data)
    }
    oracleDB()
  }, [userId])
  return (
    <>
      <HackerHeader userId={userId} onLogout={onLogout} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
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
          ))}
        </tbody>
      </Table>
      <HackerFooter />
    </>
  )
}

export default DeptList
