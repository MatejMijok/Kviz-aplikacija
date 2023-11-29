  //import logo from './logo.svg';
  import React from 'react';
  import './App.css';
  import '@material/web/all';
  import 'bootstrap/dist/css/bootstrap.css';
  import { useState } from 'react';
  import ConfigureModal from './ConfigureModal';

  function Questions() {
    return (
    <>
        <div>
            <md-filled-button class='container-fluid' id='questionButton' class='mt-3 display-4' disabled>QUESTION EXAMPLE</md-filled-button>
        </div>
    </>
    );
  }

  export default Questions;