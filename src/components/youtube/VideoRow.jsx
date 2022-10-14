import React from "react"
import { VRIMG } from "../styles/YoutubeStyle";
import { VRLI, VRPTITLE, VRCHANNEL, VRCONTENTDIV, VRVIDEODIV } from './../styles/YoutubeStyle';

const VideoRow = ({ video, videoSelect }) => {


  return (
    <>
      {/* li 태그 styled */}
      <VRLI onClick={() => videoSelect(video)}>  {/* -> YoutubeList에 video가 꽂임 */}
        <VRVIDEODIV>
          {/* img 태그 styled */}
          <VRIMG src={video.snippet.thumbnails.medium.url} alt="video thumbnail" />
          <VRCONTENTDIV>
            <VRPTITLE>{video.snippet.title}</VRPTITLE>
            <VRCHANNEL>{video.snippet.channelTitle}</VRCHANNEL>
          </VRCONTENTDIV>
        </VRVIDEODIV>
      </VRLI>
    </>
  )
}

export default VideoRow;