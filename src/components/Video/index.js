import React from 'react';
import './index.less';
import video from '../../assets/video.mp4'

function Video(props) {
    const { } = props
    return <div className='video-content'>
        <video controls autoPlay src={video}></video>
    </div>
}

export default Video
