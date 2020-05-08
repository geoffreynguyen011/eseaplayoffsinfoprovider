import React from 'react'
import Intro from './Intro'
import Footer from './Footer'
import ESEAWinsNeedForPlayoffs from './ESEAWinsNeedForPlayoffs'
import ESEAWinsInPlayoffs from './ESEAWinsInPlayoffs'
//import './App.css';
import './style.css'

function App() {
  return (
    <div>
      <Intro />
      <ESEAWinsNeedForPlayoffs />
      <ESEAWinsInPlayoffs />
      <br />
      <Footer />
    </div>

  );
}

export default App;
