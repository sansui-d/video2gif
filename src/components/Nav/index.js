import React from 'react';
import './index.less';
import img from '../../../public/favicon.png';

function Nav() {
    return (
        <div className='video2gif-nav'>
            <div className='video2gif-nav-title'>
                <img className='video2gif-nav-img' src={img} />
                <div>video2gif</div>
            </div>
        </div>
    );
}

export default Nav
