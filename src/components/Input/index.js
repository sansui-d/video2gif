import React from 'react';
import './index.less';

function Input(props) {
    const { onChange, type, defaultValue } = props
    return (
        <input type={type} onChange={onChange} className='video2gif-input' defaultValue={defaultValue} />
    );
}

export default Input
