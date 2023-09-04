import React, { useRef } from 'react';
import {useDispatch, useSelector} from "react-redux"
import GIF from 'gif.js'
import {setLoading} from '@actions'
import { worker } from '@utils/gif-worker'
import video from '@assets/video.mp4'
import './index.less';

const gif = new GIF({
    workers: 2,
    quality: 1,
    workerScript: worker,
});

function Video() {
    const dispatch = useDispatch()
    const state = useSelector((state)=>{
      return state
    })
    const videoRef = useRef(null)
    const timer = useRef(null);
    const render = () => {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext("2d");
        cvs.width = videoRef.current.clientWidth
        cvs.height = videoRef.current.clientHeight
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(videoRef.current, 0, 0, cvs.width, cvs.height);
        const img = document.createElement("img");
        img.src = cvs.toDataURL("image/png");
        img.onload = () => {
            gif.addFrame(img, {
                delay: 100,
            });
        };
    }
    const handleStart = () => {
        timer.current = setInterval(render, 100);
        videoRef.current.play();
        dispatch(setLoading(true))
    }
    const handleEnd = () => {
        gif.on("finished", function (blob) {
            const gifEl = document.getElementById("gifEl");
            gifEl.src = URL.createObjectURL(blob);
            gifEl.parentElement.setAttribute("download", "my.gif");
            gifEl.parentElement.href = gifEl.src;
            dispatch(setLoading(false))
        });
        gif.render();
        timer.current = null
    }
    return (
        <div className='video2gif-video'>
            <div className='video2gif-video-content'>
                <video controls src={video} ref={videoRef}></video>
            </div>
            <div className='video2gif-video-btn'>
                <canvas id="cvs"></canvas>
                <div onClick={handleStart}>开始</div>
                <div onClick={handleEnd}>结束</div>
                <a><img src="" id="gifEl" /></a>
            </div>
        </div>
    )

}

export default Video
