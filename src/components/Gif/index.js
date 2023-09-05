import React, {useMemo} from 'react';
import {useSelector} from "react-redux"
import './index.less';

function Gif() {
    const {gifUrl,gifState} = useSelector((state)=>{
        return state
    })
    return (
        <div className='video2gif-gif'>
            {gifState === 1 && <canvas id="cvs"></canvas>}
            {gifState === 3 && <a>{<img src={gifUrl} />}</a>}
        </div>
    );
}

export default Gif
