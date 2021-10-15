import React from 'react'
import Intro from './Intro'
import Footer from './Footer'
import ESEAWinsNeedForPlayoffs from './ESEAWinsNeedForPlayoffs'
import ESEAWinsInPlayoffs from './ESEAWinsInPlayoffs'
import FindTeam from './FindTeam'
//import './App.css';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Intro />
      <ESEAWinsNeedForPlayoffs />
      <ESEAWinsInPlayoffs />
      <FindTeam />
      <Footer />
    </div>

  );
}

export default App;
