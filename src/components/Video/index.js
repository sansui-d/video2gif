import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import video from '@assets/video.mp4'
import img from '@assets/video.jpg'
import './index.less';

function Video() {
    const { videoUrl } = useSelector((state) => {
        return state
    })

    return (
        <div className='video2gif-video'>
            <video id='video2gif-video' poster={img} controls src={videoUrl || video}></video>
        </div>
    )
}

export default Video
