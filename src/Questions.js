import React from 'react';
import './App.css';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';

function Questions() {
  return (
    <>
      <div className='container-fluid text-center'>
        <md-filled-button id='questionButton' class='mt-3 mb-5 w-100' disabled>
          <p id='questionText'>What company makes the Xperia model of smartphone?</p>
        </md-filled-button>
      </div>

      <div className='container-fluid text-center'>
        <div className='row'>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100'>
              <p id='questionText'>Sony</p>
            </md-filled-button>
          </div>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100'>
              <p id='questionText'>Samsung</p>
            </md-filled-button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100'>
              <p id='questionText'>Apple</p>
            </md-filled-button>
          </div>
          <div className='col-md-6'>
            <md-filled-button id='answerButton' class='mt-3 w-100'>
              <p id='questionText'>Xiaomi</p>
            </md-filled-button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions;
