/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import '@material/web/all';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function EditCategoryModal({ show, handleClose }) {
  const [category, setCategory] = useState();

  const [categories, setCategories] = useState([]);

  const [newCategoryName, setNewCategoryName] = useState();

  const [errors, setErrors] = useState({
    newCategoryName: undefined,
  });

  const handleSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedCategory = categories[selectedIndex];
    setCategory(selectedCategory);
    console.log(selectedCategory);
  };
  
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewCategoryName({ ...newCategoryName, [name]: value });
  }

  const checkEmpty = async (e) => {
    const { name, value } = e.target;
    const isEmpty = value.trim() === '';
    
    if (isEmpty) {
      e.target.setCustomValidity(`${name} cannot be empty`);
    } else {
      e.target.setCustomValidity('');
      if (name === 'categoryName') {
        const response = await checkCategoryAvailability(value);
        if (!response.success) {
          e.target.setCustomValidity(response.error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: response.error,
          }));
          console.log(response.error)
        }
      }
    }
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isEmpty ? `${name} cannot be empty` : undefined,
    }));
  };

  const checkCategoryAvailability = async (categoryName) => {
    try {
      const response = await fetch('http://localhost/Web programiranje projekt/checkCategory.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error while checking category availability: ", error);
      return { success: false, error: "Error checking category availability" };
    }
  };

  useEffect(() => {
    const selectElement = document.querySelector('#categoryEditSelect');
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

  const handleEditCategory = () =>{
    const form = document.getElementById('editCategory');
    const elementsWithErrors = form.querySelectorAll(':invalid');

    let data = {
      'category': category,
      'newCategory': newCategoryName,
    };
    
    console.log(data.newCategory.categoryName);
  
    if (elementsWithErrors.length > 0) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
      try {
        const response = fetch('http://localhost/Web programiranje projekt/editCategory.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.success) {
            handleClose();
          } else {
            console.log("Editing category failed");
          }
        });
        
      } catch (error) {
        console.error("ERROR WHILE ADDING CATEGORY: ", error);
      }
    }
  
  return (
    <>
      <div className='container-fluid align-items-center justify-content-center' id='modalStyle'>
        <Modal show={show} onHide={handleClose} id='modal-header'>
          <Modal.Header id='modalStyle'>
            <Modal.Title id='text'>Configure the quiz</Modal.Title>
          </Modal.Header>
          <form onSubmit={(e) => { e.preventDefault(); }} id="editCategory">
            <Modal.Body id='modalStyle'>
              <div className='container-fluid d-flex align-items-center justify-content-center'>
                <div className='d-flex flex-column'>
                  <md-filled-select label='Categories' id='categoryEditSelect' name='categoryEditSelect' class='mt-2' required>
                    {categories.map((category) => (
                      <md-select-option key={category.id} value={category.category}>
                        <div slot="headline">{category.category}</div>
                      </md-select-option>
                    ))}
                  </md-filled-select>
                  <md-filled-text-field value="" label="New category name" type='text' id='textField' name='categoryName' class="mt-2" onInput={handleInputChange} onBlur={ (e) => {checkEmpty(e);}} error={errors.newCategoryName}></md-filled-text-field>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer id='modalStyle'>
              <md-filled-tonal-button id='secondaryTonalButton' onClick={handleClose}>Cancel</md-filled-tonal-button>
              <md-filled-button id='primaryButton' onClick={handleEditCategory}>Save</md-filled-button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default EditCategoryModal;