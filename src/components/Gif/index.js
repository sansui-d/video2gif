import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import './index.less';

function Gif() {
    const { gifUrl, gifState, progress } = useSelector((state) => {
        return state
    })
    const [percent, setPercent] = useState('0')
    const [strokeDasharray, setStrokeDasharray] = useState('0 314')
    const set = (p) => {
        const total = Math.PI * 100;
        const str = `${p * total} ${total * (1 - p)}`;
        setStrokeDasharray(str)
        setPercent(Math.round(p * 100))
    }
    useEffect(() => {
        set(progress)
        if (progress == 1) {
            setTimeout(() => {
                setStrokeDasharray('0 314')
                setPercent('0')
            }, 1000)
        }
    }, [progress])

    return (
        <div className='video2gif-gif'>
            {gifState === 0 && <div className='video2gif-git-nothing'>
                You can click the '<b>Upload Your Video</b>' button to upload your video,<br />
                set the <b>width(px)</b>, <b>height(px)</b>, <b>quality(1-10)</b>, and <b>delay(ms)</b> of your gif image.<br />
                Then, click the '<b>Begin</b>' button to start recording your gif image,<br />
                click the '<b>End</b>' button to start making your gif image,<br />
                and finally <b>download</b> it.
            </div>}
            {gifState === 1 && <canvas id="video2gif-gif-cvs"></canvas>}
            {gifState === 2 && <div className="video2gif-gif-progress">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" fill="none" strokeWidth="10" stroke="#fff" />
                    <circle className="video2gif-gif-progress-round" strokeDasharray={strokeDasharray} strokeLinecap="round" cx="100" cy="100" r="50" fill="none" strokeWidth="10" stroke="#db639b" transform="rotate(-90, 100, 100)" />
                    <text x="100" y="100" fill="#fff" textAnchor="middle" dominantBaseline="central">
                        <tspan>{percent}%</tspan>
                    </text>
                </svg>
                <div style={{ marginBottom: '50px' }}>Gif is making...</div>
            </div>}
            {gifState === 3 && <a>{<img src={gifUrl} />}</a>}
        </div>
    );
}

export default Gif
