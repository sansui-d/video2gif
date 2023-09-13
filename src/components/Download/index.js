import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import GIF from 'gif.js'
import { worker } from '@utils/gif-worker'
import { setGifState, setGifUrl, setVideoUrl, setVideoName, setProgress } from '@actions'
import Button from '@components/Button';

import './index.less';

function Download() {
    const dispatch = useDispatch()
    const { videoName, gifUrl, parameters, gifState } = useSelector((state) => {
        return state
    })
    const gif = useRef(null)
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

    const imgRender = () => {
        console.log(parameters ,'parameters?.delay ')
        const cvs = document.getElementById("video2gif-gif-cvs");
        const video = document.getElementById("video2gif-video");
        const ctx = cvs.getContext("2d");
        cvs.width = parameters.width || 640
        cvs.height = parameters.height || 340
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(video, 0, 0, cvs.width, cvs.height);
        const img = document.createElement("img");
        img.src = cvs.toDataURL("image/png");
        img.onload = () => {
            gif.current?.addFrame(img, {
                delay: parameters?.delay || 100,
            });
        };
    }

    const handleBegin = () => {
        dispatch(setGifState(1))
        const video = document.getElementById("video2gif-video");
        video.play()
    }

    const handleEnd = () => {
        clearInterval(interval.current);
        interval.current = null
        dispatch(setGifState(2))
        const video = document.getElementById("video2gif-video");
        video.pause()
    }

    const initGif = () => {
        console.log(parameters, '123')
        gif.current = new GIF({
            workers: 2,
            quality: parameters.quality,
            workerScript: worker
        })
        dispatch(setGifState(0))
    }

    const handlePlay = () => {
        try {
            const video = document.getElementById("video2gif-video");
            gif.current?.abort()
            gif.current.frames = []
            dispatch(setGifState(1))
            interval.current = setInterval(imgRender, parameters?.delay || 100);
            video.play();
        } catch (error) {
            console.log(error)
        }
    }

    const handlePause = () => {
        try {
            clearInterval(interval.current);
            interval.current = null
            dispatch(setGifState(2))
            gif.current.on("progress", function (progress) {
                dispatch(setProgress(progress))
            });
            gif.current.on("finished", function (blob) {
                dispatch(setGifUrl(URL.createObjectURL(blob)))
                timeout.current = setTimeout(() => {
                    dispatch(setGifState(3))
                }, 500);
            });
            gif.current?.render();
        } catch (err) {
            clearInterval(interval.current);
            interval.current = null
            console.log(err)
        }
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

    useEffect(() => {
        const video = document.getElementById("video2gif-video");
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        }
    }, [parameters])

    return (
        <div className="video2gif-download">
            <div className='video2gif-download-item'>
                <Button onClick={handleBegin} text='Begin' className={(gifState === 2 || gifState ===1) ? 'video2gif-button-no-allow' : ''} />
                <Button onClick={handleEnd} text='End' className={gifState === 1 ? '' : 'video2gif-button-no-allow'} />
            </div>
            <div className='video2gif-download-item'>
                <label 
                    className={`video2gif-label ${(gifState === 1 || gifState === 2) ? 'video2gif-button-no-allow' : ''}`} 
                    htmlFor='input'>
                        Upload Your Video
                </label>
                <input
                    type="file"
                    id='input'
                    hidden={true}
                    disabled={gifState === 1 || gifState === 2}
                    accept=".mp4,.avi,.wmv,.mov,.flv,.mkv"
                    onClick={(e) => e.target.value = null}
                    onChange={(e) => handleUpload(e)}
                />
                <Button onClick={handleDownload} text='Download' className={gifState === 3 ? '' : 'video2gif-button-no-allow'} />
            </div>
        </div>
    );
}

export default Download
