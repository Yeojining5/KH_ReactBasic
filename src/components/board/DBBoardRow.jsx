import React from 'react';
import { Link } from 'react-router-dom';

const DBBoardRow = ({ board }) => {

  const fileDown = () => {
    window.location.href = process.env.REACT_APP_SPRING_IP+"board/downLoad.jsp?bs_file="+board.BS_FILE
  }

  return (
    <>
      <tr>
        <td>{board.B_NO}</td>
        <td>
          <Link to={"/boarddetail/" + board.B_NO}>
            {board.B_TITLE}
          </Link>
        </td>
        <td>{board.B_WRITER}</td>
        <td>{board.B_DATE}</td>
        <td onClick={fileDown}>
          <span style={{ cursor: "pointer" }}>{board.BS_FILE}</span>
        </td>
        <td>{board.B_HIT}</td>
      </tr>
    </>
  );
};

export default DBBoardRow;