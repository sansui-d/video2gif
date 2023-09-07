import React, {useState, useEffect,useRef} from 'react';
import { useDispatch, useSelector } from "react-redux"
import GIF from 'gif.js'
import { worker } from '@utils/gif-worker'
import { setGifState, setGifUrl, setVideoUrl, setVideoName, setProgress } from '@actions'
import Button from '@components/Button';

import './index.less';

function Download() {
    const dispatch = useDispatch()
    const { videoName, gifUrl,parameters} = useSelector((state) => {
        return state
    })
    const [gif, setGif] = useState(null)
    const interval = useRef(null);
    const timeout = useRef(null);

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
    const handleDownload = () => {
        let a = document.createElement('a');
        a.setAttribute('href', gifUrl)
        a.setAttribute('target', 'download')
        a.setAttribute('download', videoName + '.gif');
        a.click();
    }

    const render = () => {
        const cvs = document.getElementById("video2gif-gif-cvs");
        const video = document.getElementById("video2gif-video");
        const ctx = cvs.getContext("2d");
        cvs.width = parameters.width
        cvs.height = parameters.height
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(video, 0, 0, cvs.width, cvs.height);
        const img = document.createElement("img");
        img.src = cvs.toDataURL("image/png");
        img.onload = () => {
            gif?.addFrame(img, {
                delay: parameters?.delay || 100,
            });
        };
    }

    const handleStart = () => {
        const video = document.getElementById("video2gif-video");
        gif.abort()
        gif.frames = []
        dispatch(setGifState(1))
        interval.current = setInterval(render, parameters?.delay || 100);
        video.play();
    }

    const handleEnd = () => {
        const video = document.getElementById("video2gif-video");
        try {
            clearInterval(interval.current);
            interval.current = null
            video.pause()
            dispatch(setGifState(2))
            gif.on("progress", function (progress) {
                dispatch(setProgress(progress))
            });
            gif.on("finished", function (blob) {
                dispatch(setGifUrl(URL.createObjectURL(blob)))
                timeout.current = setTimeout(() => {
                    dispatch(setGifState(3))
                }, 500);
            });
            gif.render();
        } catch (err) {
            clearInterval(interval.current);
            interval.current = null
            console.log(err)
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
            interval.current = null
            clearTimeout(timeout.current)
            clearInterval(interval.current)
        }
    }, [parameters])
    return (
        <div className="video2gif-download">
            <div className='video2gif-download-item'>
                            <Button onClick={handleStart} text='Begin' />
                <Button onClick={handleEnd} text='End' />
                </div>
                <div className='video2gif-download-item'>
                <label className='video2gif-label' htmlFor='input'>Upload Your Video</label>
                <input
                    type="file"
                    id='input'
                    hidden={true}
                    accept=".mp4,.avi,.wmv,.mov,.flv,.mkv"
                    onClick={(e) => e.target.value = null}
                    onChange={(e) => handleUpload(e)}
                />
            <Button onClick={handleDownload} text='Download' />
            </div>
        </div>
    );
}

export default Download
