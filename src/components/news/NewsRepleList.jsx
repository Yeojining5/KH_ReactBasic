import React from "react"

const NewsRepleList = (props) => {
  const { comment } = props
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div>
        <strong>{comment.user}</strong>
        {comment.time_ago}
        <p dangerouslySetInnerHTML={{ __html: comment.content }}></p>
      </div>
    </div>
  )
}

export default NewsRepleList
