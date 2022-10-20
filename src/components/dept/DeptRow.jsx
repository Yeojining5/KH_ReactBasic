import React from "react";
import { Link } from 'react-router-dom';

const DeptRow = (props) => {

  return (
  <>
    <tr>
      <td>{props.dept.DEPTNO}</td>
      <td>
        <Link to={"/deptdetail/"+props.dept.DEPTNO} className="btn btn-primary">
          {props.dept.DEPTNO}
        </Link>
      </td>
      <td>{props.dept.DNAME}</td>
      <td>{props.dept.LOC}</td>
    </tr>
  </>
  );
}

export default DeptRow;