import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { debounce } from '@utils/helper';
import { setParameters } from '@actions'
import Input from '@components/Input'
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
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>gif with width</label>
                <Input type='number' defaultValue={parameters.width} onChange={debounce((e) => handleChange(e, 0), 500)} />
            </div>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>gif with height</label>
                <Input type='number' defaultValue={parameters.height} onChange={debounce((e) => handleChange(e, 1), 500)} />
            </div>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>gif with quality</label>
                <Input type='number' defaultValue={parameters.quality} onChange={debounce((e) => handleChange(e, 2), 500)} />
            </div>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>gif with delay</label>
                <Input type='number' defaultValue={parameters.delay} onChange={debounce((e) => handleChange(e, 3), 500)} />
            </div>
        </div>
    );
}

export default Parameter
