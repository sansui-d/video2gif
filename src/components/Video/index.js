import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import GIF from 'gif.js'
import { setGifState, setGifUrl, setVideoUrl, setVideoName, setProgress } from '@actions'
import { worker } from '@utils/gif-worker'
import Parameter from '@components/Parameter';
import Button from '@components/Button';
import video from '@assets/video.mp4'
import './index.less';

function Video() {
    const dispatch = useDispatch()
    const { videoUrl, parameters } = useSelector((state) => {
        return state
    })
    const [gif, setGif] = useState(null)
    const videoRef = useRef(null)
    const timer = useRef(null);
    const timeout = useRef(null);

    const render = () => {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext("2d");
        cvs.width = parameters.width
        cvs.height = parameters.height
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(videoRef.current, 0, 0, cvs.width, cvs.height);
        const img = document.createElement("img");
        img.src = cvs.toDataURL("image/png");
        img.onload = () => {
            gif?.addFrame(img, {
                delay: parameters?.delay || 100,
            });
        };
    }

    const handleStart = () => {
        gif.abort()
        gif.frames = []
        dispatch(setGifState(1))
        timer.current = setInterval(render, parameters?.delay || 100);
        videoRef.current.play();
    }

    const handleEnd = () => {
        try {
            clearInterval(timer.current);
            timer.current = null
            videoRef.current.pause()
            dispatch(setGifState(2))
            gif.on("progress", function (progress) {
                dispatch(setProgress(progress))
                console.log(progress, '3')
            });
            gif.on("finished", function (blob) {
                dispatch(setGifUrl(URL.createObjectURL(blob)))
                timeout.current = setTimeout(() => {
                    dispatch(setGifState(3))
                }, 500);
            });
            gif.render();
        } catch (err) {
            clearInterval(timer.current);
            timer.current = null
            console.log(err)
        }
    }

    const handleUpload = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const name = file?.name.substring(0, (file?.name.length - 4))
            dispatch(setVideoName(name))
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                dispatch(setVideoUrl(e.target.result))
            };
        }
    }

    const initGif = () => {
        setGif(new GIF({
            workers: 2,
            quality: parameters.quality,
            workerScript: worker
        }))
        dispatch(setGifState(0))
    }

    useEffect(() => {
        initGif()
        return () => {
            timeout.current = null
            timer.current = null
            clearTimeout(timeout.current)
            clearInterval(timer.current)
        }
    }, [parameters])

    return (
        <div className='video2gif-video'>
            <div className='video2gif-video-content'>
                <video controls src={videoUrl || video} ref={videoRef}></video>
            </div>
            <Parameter />
            <div className='video2gif-video-btn'>
                <label className='video2gif-label' htmlFor='input'>Upload Your Video</label>
                <input
                    type="file"
                    id='input'
                    hidden={true}
                    accept=".mp4,.avi,.wmv,.mov,.flv,.mkv"
                    onClick={(e) => e.target.value = null}
                    onChange={(e) => handleUpload(e)}
                />
                <Button onClick={handleStart} text='Begin' />
                <Button onClick={handleEnd} text='End' />
            </div>
        </div>
    )
}

export default Video
