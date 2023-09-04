import React from 'react';
import Nav from '@components/Nav';
import Video from '@components/Video';
import Gif from '@components/Gif';
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
        </div>
      </div>
    </div>
  );
}
export default App;
