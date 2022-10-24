import React from "react"
import { Link } from "react-router-dom"

function NoticeRow({ notice }) {
  return (
    <>
      <tr>
        <td>{notice.n_no}</td>
        <td>
          <Link to={"/noticedetail/"+notice.n_no} className="btn btn-primary">{notice.n_title}</Link>
        </td>
        <td>{notice.n_writer}</td>
        <td>{notice.n_date}</td>
      </tr>
    </>
  )
}

export default NoticeRow
