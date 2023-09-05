import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setParameters } from '@actions'
import './index.less';

function Parameter() {
    const dispatch = useDispatch()
    const { parameters } = useSelector((state) => {
        return state
    })
    const handleChange = (e, type) => {
        switch (type) {
            case 0:
                dispatch(setParameters({ ...parameters, width: e.target.value }))
                break
            case 1:
                dispatch(setParameters({ ...parameters, height: e.target.value }))
                break
            case 2:
                dispatch(setParameters({ ...parameters, quality: e.target.value }))
                break
            case 3:
                dispatch(setParameters({ ...parameters, delay: e.target.value }))
                break
            default:
                break
        }
    }
    return (
        <div className='video2gif-parameter'>
            <div>
                <label className='video2gif-parameter-label'>gif with width</label>
                <input type='number' defaultValue={parameters.width} onChange={(e) => handleChange(e, 0)} />
            </div>
            <div>
                <label className='video2gif-parameter-label'>gif with height</label>
                <input type='number' defaultValue={parameters.height} onChange={(e) => handleChange(e, 1)} />
            </div>
            <div>
                <label className='video2gif-parameter-label'>gif with quality</label>
                <input type='number' defaultValue={parameters.quality} onChange={(e) => handleChange(e, 2)} />
            </div>
            <div>
                <label className='video2gif-parameter-label'>gif with delay</label>
                <input type='number' defaultValue={parameters.delay} onChange={(e) => handleChange(e, 3)} />
            </div>
        </div>
    );
}

export default Parameter
