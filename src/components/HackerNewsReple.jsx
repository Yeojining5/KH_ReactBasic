import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

const HackerNewsReple = (props) => {

  const { id } = useParams()
  
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const CONTENT_URL = `https://api.hnpwa.com/v0/news/${id}.json`
    axios
      .get(CONTENT_URL)
      .then((response) => {
        const result = JSON.stringify(response.data)
        console.log(result.data);
        console.log(result);
        const jsonDoc = JSON.parse(result);
        console.log(jsonDoc.title);
        setTitle(jsonDoc.title)
    })
  })
  comments.map((item, index) => {
    if(item.comments.length > 0) {
      console.log('item.comments : '+item.comments)
      item.comments.map(comment => {
        console.log('comment.user'+comment.user)
      });
    }
  })

  return (
    <>
      <h2>댓글페이지</h2>
    </>
  );
};

export default HackerNewsReple;
