import React from 'react';
import './index.less';

function Button(props) {
    const { text, onClick, className } = props
    return (
        <div className={`video2gif-button ${className}`} onClick={onClick}>{text}</div>
    );
}

export default Button
