import React from 'react';
import './index.less';

function Input(props) {
    const { onChange, type, defaultValue, readOnly = false } = props
    return (
        <input readOnly={readOnly} type={type} onChange={onChange} className={`video2gif-input ${readOnly ? 'video2gif-input-read-only' : ''}`} defaultValue={defaultValue} />
    );
}

export default Input
