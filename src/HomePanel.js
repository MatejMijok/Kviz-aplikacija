  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import LoginModal from './LoginModal';
  import RegisterModal from './RegisterModal';
  import { useState } from 'react';

  function HomePanel() {
  const sessionData = JSON.parse(localStorage.getItem('sessionData'));
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [counter, setCounter] = useState(0);

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

  const handleLogoutClick = () => {
    localStorage.clear();
    if(counter === 0){
      setCounter(1);
    }
    else{
      setCounter(0);
    }
  }

  if(sessionData != null){
    return (
    <>
    <div className='jumbotron jumbotron-fluid'>
      <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome {sessionData['fname']} {sessionData['lname']} to the Quiz!</h1>
      <p className='lead text-center mt-3' id='text'>You are currently on the home page but if you want to start playing press the "Play" tab!</p>
      <p className='lead text-center mt-3' id='text'>Pressing the "Play" button will start the quiz and pressing the "Configure" button will allow you to adjust parameters</p>
      <p className='lead text-center mt-3' id='text'>Or if you changed your mind you can log out by pressing the button below</p>

      <div className='container-fluid d-flex align-items-center justify-content-center'>
        <div className='d-flex flex-column text-center'>
          <md-filled-tonal-button id='primaryTonalButton' onClick={handleLogoutClick} class='mt-3'>Log out</md-filled-tonal-button>
        </div>
      </div>
    </div>
    </>
    );
  }

  else{
    return (
      <>
      <div className='jumbotron jumbotron-fluid'>
        <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome to the Quiz!</h1>
        <p className='lead text-center mt-3' id='text'>You are currently on the home page but if you want to start playing press the "Play" tab!</p>
        <p className='lead text-center mt-3' id='text'>Pressing the "Play" button will start the quiz and pressing the "Configure" button will allow you to adjust parameters</p>
        <p className='lead text-center mt-3 mb-3' id='text'>or you can also log in or register.</p>
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
}

  export default HomePanel;