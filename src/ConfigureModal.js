/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function ConfigureModal({ show, handleClose }) {
  const [category, setCategory] = useState();

  const [categories, setCategories] = useState([]);

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedCategory = categories[selectedIndex];
    setCategory(selectedCategory);
    console.log(selectedCategory);
  };
  
  useEffect(() => {
    const selectElement = document.querySelector('#categorySelect');
    if (selectElement) {
      selectElement.addEventListener('change', handleSelectChange);
    }
    return () => {
      if (selectElement) {
        selectElement.removeEventListener('change', handleSelectChange);
      }
    };
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost/Web programiranje projekt/fetchCategories.php');
      const data = await response.json();
      console.log(data);
      return data.categories;
    } catch {
      console.error('Error fetching categories');
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    if(show){
    fetchData();
    }
  }, [show]); 

  const handleConfig = () => {
    localStorage.setItem("category", JSON.stringify(category));
    handleClose();
  }

  return (
    <>
      <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
        <Modal show={show} onHide={handleClose} id='modal-header'>
          <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Configure the quiz</Modal.Title>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); }} id="configForm">
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                  <md-filled-select label='Categories' id='categorySelect' name='categorySelect' class='mt-2' required>
                    {categories.map((category) => (
                      <md-select-option key={category.id} value={category.category}>
                        <div slot="headline">{category.category}</div>
                      </md-select-option>
                    ))}
                  </md-filled-select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
              <md-filled-button id='primaryButton' onClick={handleConfig}>Save</md-filled-button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default ConfigureModal;