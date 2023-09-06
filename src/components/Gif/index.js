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
    }, [progress])

    return (
        <div className='video2gif-gif'>
            {gifState === 1 && <canvas id="cvs"></canvas>}
            {gifState === 2 && <div className="container">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" fill="none" strokeWidth="10" stroke="gray" />
                    <circle id="circle" strokeDasharray={strokeDasharray} strokeLinecap="round" cx="100" cy="100" r="50" fill="none" strokeWidth="10" stroke="pink" transform="rotate(-90, 100, 100)" />
                    <text x="100" y="100" fill="#6b778c" textAnchor="middle" dominantBaseline="central">
                        <tspan>{percent}%</tspan>
                    </text>
                </svg></div>}
            {gifState === 3 && <a>{<img src={gifUrl} />}</a>}
        </div>
    );
}

export default Gif
