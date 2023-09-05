import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import GIF from 'gif.js'
import {initGif,setGifState, setGifUrl, setVideoUrl,setVideoName} from '@actions'
import { worker } from '@utils/gif-worker'
import Parameter from '@components/Parameter';
import video from '@assets/video.mp4'
import './index.less';

// const gif = new GIF({
//     workers: 2,
//     quality: 10,
//     workerScript: worker,
// })

function Video() {
    const dispatch = useDispatch()
    const {videoUrl} = useSelector((state)=>{
      return state
    })
    const [gif, setGif] = useState(null)
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
            gif?.addFrame(img, {
                delay: 100,
            });
        };
    }
    const handleStart = async() => {
        dispatch(setGifState(1))
        timer.current = setInterval(render, 100);
        videoRef.current.play();
    }
    const handleEnd = () => {
        try{
            gif.render();
            clearInterval(timer.current);
            timer.current = null
            videoRef.current.pause()
            dispatch(setGifState(2))
            gif.on("finished", function (blob) {
                dispatch(setGifUrl(URL.createObjectURL(blob)))
                dispatch(setGifState(3))
            });
        }catch (err){
            clearInterval(timer.current);
            timer.current = null
            console.log(err)
        }
    }
    const handleUpload = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const name = file?.name.substring(0,(file?.name.length - 4))
            dispatch(setVideoName(name))
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                dispatch(setVideoUrl(e.target.result))
            };
        }
    }

    useEffect(()=>{
        setGif(new GIF({
                workers: 2,
                quality: 10,
                workerScript: worker,
            }))
    },[])

    return (
        <div className='video2gif-video'>
            <div className='video2gif-video-content'>
                <video controls src={videoUrl || video} ref={videoRef}></video>
            </div>
            <Parameter />
            <div className='video2gif-video-btn'>
                <label htmlFor={'input'}>Upload Your Video</label>
                <input
                    type="file"
                    id={'input'}
                    hidden={true}
                    accept=".mp4,.avi,.wmv,.mov,.flv,.mkv"
                    onClick={(e) => e.target.value = null}  
                    onChange={(e) => handleUpload(e)}
                />
                <div onClick={handleStart}>Begin</div>
                <div onClick={handleEnd}>End</div>
            </div>
        </div>
    )
}

export default Video
