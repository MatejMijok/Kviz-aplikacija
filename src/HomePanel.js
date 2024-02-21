  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import LoginModal from './LoginModal';
  import RegisterModal from './RegisterModal';
  import { useState, useEffect } from 'react';

  function HomePanel() {
  const sessionData = JSON.parse(localStorage.getItem('sessionData'));
  const [position, setPosition] = useState({latitude: null, longitude: null});
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [counter, setCounter] = useState(0);
  const [weather, setWeather] = useState([]);

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

  useEffect(() => {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function (position){
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }else{
      console.log("Geolocation is not available in your browser.");
    }
  }, [])

  async function fetchData(){
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${position.latitude},${position.longitude}`;
    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8377aa1e07msh7ecdf0552d852c8p1a8ea4jsn4784004f7905',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    setWeather(JSON.parse(result));
  } catch (error) {
    console.error(error);
  }
  }

/*   useEffect(() => {
    fetchData();
  }, [position.latitude, position.longitude])
 */
  if(sessionData != null){
    return (
    <>
    <div className='jumbotron jumbotron-fluid'>
      <h1 className='display-4 text-center mt-5 w-100' id='text'>Welcome {sessionData['fname']} {sessionData['lname']} to the Quiz!</h1>
      <p className='lead text-center mt-3' id='text'>You are currently on the home page but if you want to start playing press the "Play" tab!</p>
      <p className='lead text-center mt-3' id='text'>Pressing the "Play" button will start the quiz and pressing the "Configure" button will allow you to adjust parameters</p>
      <p className='lead text-center mt-3' id='text'>You can also view your statistics on the "Profile" tab</p>
      <p className='lead text-center mt-3' id='text'>Or if you changed your mind you can log out by pressing the button below</p>
        {weather && weather.current && (
          <div>
          <p className='lead text-center mt-3' id='text'>Location: {weather.location.name}</p>
          <p className='lead text-center mt-3' id='text'>Temperature: {weather.current.temp_c}°C</p>
          <p className='lead text-center mt-3' id='text'>Wind: {weather.current.wind_kph} km/h, {weather.current.wind_dir}</p>
          <p className='lead text-center mt-3' id='text'>Air humidity: {weather.current.humidity}%</p>
          <p className='lead text-center mt-3' id='text'>Weather: {weather.current.condition.text}</p>
          </div>
        )}

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