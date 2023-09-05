import React from 'react';
import './index.less';

function Parameter(props) {
    const {  } = props;
    return (
        <div className='video2gif-parameter'>
            <div>
             <label className='video2gif-parameter-label'>gif with width</label>
             <input />
            </div>
            <div>
            <label className='video2gif-parameter-label'>gif with height</label>
             <input />
            </div>
            <div>
            <label className='video2gif-parameter-label'>gif with quality</label>
             <input />
            </div>
        </div>
    );
}

export default Parameter
