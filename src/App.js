import logo from './logo.svg';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className='container-fluid' id='container'>
      
          <div className='container-fluid'>
              <ul className='navbar-nav'>
              <md-tabs id="tabs">
                <md-primary-tab id="tabs" className='m-3'>Main</md-primary-tab>
                <md-primary-tab id="tabs" className='m-3'>Stats</md-primary-tab>
              </md-tabs>
              </ul>
          </div>
      
    </div>
  );
}

export default App;
