import React from 'react';
import { useSelector } from "react-redux"
import './index.less';

function Download() {
    const { videoName, gifUrl } = useSelector((state) => {
        return state
    })
    const handleDownload = () => {
        let a = document.createElement('a');
        a.setAttribute('href', gifUrl)
        a.setAttribute('target', 'download')
        a.setAttribute('download', videoName + '.gif');
        a.click();
    }
    return (
        <div className='video2gif-download' onClick={handleDownload}>下载</div>
    );
}

export default Download
