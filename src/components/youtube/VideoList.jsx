import React from "react"
import VideoRow from './VideoRow';
import { VLUL } from './../styles/YoutubeStyle';

const VideoList = (props) => {

  const {videos, videoSelect} = props

  return(
    <>
      <VLUL>
        {
        videos.map((video, i) => (
            /* console.log(video) */
            <VideoRow key={video.id} video={video} videoSelect={videoSelect} />
          ))
        }
      </VLUL>
    </>
  );
}

export default VideoList;