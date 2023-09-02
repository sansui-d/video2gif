import React from 'react';
import Nav from '../components/Nav';
import Video from '../components/Video';
import './App.less';

function App() {

  return (
    <div className="video2gif">
      <Nav />
      <div className='video2gif-content'>
        <Video />
      </div>
    </div>
  );
}

export default App;
