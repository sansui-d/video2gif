import React from 'react';
import './index.less';

function Button(props) {
    const { text, onClick } = props
    return (
        <div className='video2gif-button' onClick={onClick}>{text}</div>
    );
}

export default Button
