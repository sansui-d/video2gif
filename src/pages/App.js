import React from 'react';
import { video2gif } from '../utils/helper';
import Nav from '../components/Nav';
import Video from '../components/Video';
import './App.less';

function App() {
  const handelClick = ()=>{
    video2gif(document.getElementsByTagName('video')[0])
  }
  return (
    <div className="video2gif">
      <Nav />
      <div className='video2gif-content'>
        <Video />
        <div onClick={handelClick}>123</div>
      </div>
    </div>
  );
}

export default App;
