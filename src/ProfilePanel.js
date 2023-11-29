  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import LoginModal from './LoginModal';
  import RegisterModal from './RegisterModal';
  import {useState} from 'react';

  function HomePanel() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () =>{
    setShowLogin(true);
  }

  const handleCloseLogin = () =>{
    setShowLogin(false);
  }

  const handleRegisterClick = () =>{
    setShowRegister(true);
  }

  const handleCloseRegister = () =>{
    setShowRegister(false);
  }

    return (
    <>
    <div className='jumbotron jumbotron-fluid'>
      <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome!</h1>
      <p className='lead text-center mt-3' id='text'>We appreciate your enthusiasm but you need to log in or register first!</p>
      <p className='lead text-center mt-3 mb-3' id='text'>You can do that by pressing the appopriate button below!</p>
    </div>

    <div className='container-fluid d-flex align-items-center justify-content-center'>
      <div className='d-flex flex-column text-center'>
        <md-filled-tonal-button id='primaryTonalButton' onClick={handleLoginClick} class='mt-3'>Log in</md-filled-tonal-button>
        <md-filled-tonal-button id='primaryTonalButton' class='mt-3' onClick={handleRegisterClick}>Register</md-filled-tonal-button>
      </div>
    </div>

    <LoginModal show={showLogin} handleClose={handleCloseLogin}/>
    <RegisterModal show={showRegister} handleClose={handleCloseRegister}/>
    </>
    );
  }

  export default HomePanel;