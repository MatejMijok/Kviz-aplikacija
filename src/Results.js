import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function Results() {
  return (
    <>
      <div className='container-fluid text-center'>
          <p className='display-4 text-center mt-5' id='text' >TO DO</p>
      </div>
    </>
  );
}

export default Results;
