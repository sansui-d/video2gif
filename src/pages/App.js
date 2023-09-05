import React, { useRef } from 'react';
import Nav from '@components/Nav';
import Video from '@components/Video';
import Gif from '@components/Gif';
import Download from '@components/Download';
import './App.less';

function App() {
  return (
    <div className="video2gif">
      <Nav />
      <div className='video2gif-content'>
        <div className='video2gif-content-left'>
          <Video />
        </div>
        <div className='video2gif-content-right'>
          <Gif />
          <Download />
        </div>
      </div>
    </div>
  );
}
export default App;
