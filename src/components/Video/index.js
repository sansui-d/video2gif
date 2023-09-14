import React from 'react';
import { useSelector } from "react-redux"
import video from '@assets/video.mp4'
import './index.less';

function Video() {
    const { videoUrl } = useSelector((state) => {
        return state
    })

    return (
        <div className='video2gif-video'>
            <video id='video2gif-video' controls src={videoUrl || video}></video>
        </div>
    )
}

export default Video
