import React from 'react';
import { useSelector } from "react-redux"
import Button from '@components/Button';
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
        <Button onClick={handleDownload} text='Download' />
    );
}

export default Download
