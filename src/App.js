import logo from './logo.svg';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const myRef = useRef(0);

  useEffect(() => {
    myRef.current.addEventListener('change', handleChange);
  });

  const handleChange = (event) =>{
    setActiveTabIndex(event.target.activeTabIndex);
  }

  
  return (
    <div className='container-fluid' id='container'>
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          <md-tabs id='tabs' ref={myRef}>
            <md-secondary-tab class='tabs' id='home-tab' aria-controls='menu-panel' active>Home</md-secondary-tab>
            <md-secondary-tab class='tabs' id='play-tab' aria-controls='play-panel'>Play</md-secondary-tab>
            <md-secondary-tab class='tabs' id='stats-tab' aria-controls='stats-panel'>Stats</md-secondary-tab>
          </md-tabs>

          <div id='home-panel' role='tabpanel' aria-label='home-tab' hidden={activeTabIndex !== 0}>
            <h1>Welcome!</h1>
          </div>
          <div id='play-panel' role='tabpanel' aria-label='play-tab' hidden={activeTabIndex !== 1}>
            <p>proba 2</p>
          </div>
          <div id='stats-panel' role='tabpanel' aria-label='stats-tab' hidden={activeTabIndex !== 2}>
            <p>proba 3</p>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;