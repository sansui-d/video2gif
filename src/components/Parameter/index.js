import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { debounce } from '@utils/helper';
import { setParameters } from '@actions'
import Input from '@components/Input'
import './index.less';

function Parameter() {
    const dispatch = useDispatch()
    const { parameters, gifState } = useSelector((state) => {
        return state
    })
    const handleChange = (e, type) => {
        switch (type) {
            case 0:
                dispatch(setParameters({ ...parameters, width: Number(e.target.value) }))
                break
            case 1:
                dispatch(setParameters({ ...parameters, height: Number(e.target.value) }))
                break
            case 2:
                dispatch(setParameters({ ...parameters, quality: Number(e.target.value) }))
                break
            case 3:
                dispatch(setParameters({ ...parameters, delay: Number(e.target.value) }))
                break
            default:
                break
        }
    }
    return (
        <div className='video2gif-parameter'>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>Width of gif</label>
                <Input readOnly={gifState === 1 || gifState === 2} type='number' defaultValue={parameters.width} onChange={debounce((e) => handleChange(e, 0), 500)} />
            </div>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>Height of gif</label>
                <Input readOnly={gifState === 1 || gifState === 2} type='number' defaultValue={parameters.height} onChange={debounce((e) => handleChange(e, 1), 500)} />
            </div>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>Quality of gif</label>
                <Input readOnly={gifState === 1 || gifState === 2} type='number' defaultValue={parameters.quality} onChange={debounce((e) => handleChange(e, 2), 500)} />
            </div>
            <div className='video2gif-parameter-item'>
                <label className='video2gif-parameter-label'>Delay of gif</label>
                <Input readOnly={gifState === 1 || gifState === 2} type='number' defaultValue={parameters.delay} onChange={debounce((e) => handleChange(e, 3), 500)} />
            </div>
        </div>
    );
}

export default Parameter
