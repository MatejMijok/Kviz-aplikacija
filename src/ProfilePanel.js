  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import LoginModal from './LoginModal';
  import RegisterModal from './RegisterModal';
  import AddQuestionModal from './AddQuestionModal';
  import AddCategoryModal from './AddCategoryModal';
  import {useState} from 'react';

  function HomePanel() {
  
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));   
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [counter, setCounter] = useState(0);
  
  const handleLoginClick = () => {
    setShowLogin(true);
  }

  const handleCloseLogin = () => {
    setShowLogin(false);
  }

  const handleRegisterClick = () => {
    setShowRegister(true);
  }

  const handleCloseRegister = () => {
    setShowRegister(false);
  }

  const handleAddQuestionClick = () => {
    setShowAddQuestion(true);
  }
  
  const handleCloseAddQuestion = () => {
    setShowAddQuestion(false);
  }

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
  }

  const handleCloseAddCategory = () => {
    setShowAddCategory(false);
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

  if(sessionData !=  null && sessionData.userRole === "admin"){
    return (
        <>
        <div className='jumbotron jumbotron-fluid'>
          <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome {sessionData.username}!</h1>
        </div>

        <div className='container-fluid d-flex align-items-center justify-content-center'>
          <div className='d-flex flex-column text-center'>
            <md-filled-tonal-button id='primaryTonalButton' onClick={handleAddQuestionClick} class='mt-3'>Add question</md-filled-tonal-button>
            <md-filled-tonal-button id='primaryTonalButton' onClick={handleAddCategoryClick} class='mt-3'>Add category</md-filled-tonal-button>
            <md-filled-tonal-button id='primaryTonalButton' onClick={handleLogoutClick} class='mt-3'>Log out</md-filled-tonal-button>
          </div>
        </div>

        <AddQuestionModal show={showAddQuestion} handleClose={handleCloseAddQuestion} />
        <AddCategoryModal show={showAddCategory} handleClose={handleCloseAddCategory} />
        </>
        );
    }
    else if(sessionData != null){
      return (
        <>
        <div className='jumbotron jumbotron-fluid'>
          <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome {sessionData.username}!</h1>
          <p className="lead text-center mt-3" id="text">UNDER CONSTRUCTION</p>
        </div>

        <div className='container-fluid d-flex align-items-center justify-content-center'>
          <div className='d-flex flex-column text-center'>
            <md-filled-tonal-button id='primaryTonalButton' onClick={handleLogoutClick} class='mt-3'>Log out</md-filled-tonal-button>
          </div>
        </div>
        </>
        );
    }
    else{
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

  }

  export default HomePanel;