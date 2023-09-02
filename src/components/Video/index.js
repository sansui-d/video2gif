import React, { useRef } from 'react';
import GIF from 'gif.js'
import { worker } from '../../utils/gif-worker'
import './index.less';
import video from '../../assets/video.mp4'

const gif = new GIF({
    workers: 2,
    quality: 1,
    workerScript: worker,
});

function Video(props) {
    const { } = props;
    const videoRef = useRef(null)
    const timer = useRef(null);
    const render = () => {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext("2d");
        cvs.width = 500
        cvs.height = 200
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
    }
    const handleEnd = () => {
        gif.on("finished", function (blob) {
            console.log(blob)
            const gifEl = document.getElementById("gifEl");
            gifEl.src = URL.createObjectURL(blob);
            gifEl.parentElement.setAttribute("download", "my.gif");
            gifEl.parentElement.href = gifEl.src;
        });
        gif.render();
        timer.current = null
    }
    return (
        <div className='video-content'>
            <video controls src={video} ref={videoRef}></video>
            <canvas id="cvs"></canvas>
            <div onClick={handleStart}>开始</div>
            <div onClick={handleEnd}>结束</div>
            <a><img src="" id="gifEl" /></a>
        </div>
    )

}

export default Video
