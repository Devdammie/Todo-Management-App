/*
import React, { useEffect, useState } from 'react';

import axios from 'axios';


function Create (){
   // const handleAdd = () => {
        // Logic to add a new todo item
     //   console.log("Todo added");
   // }
   const url = 'https://todo-app-backend-98n1.onrender.com'
    const [task, setTask] = useState(''); // State to hold the input value
    const handleAdd = () => {
        if (task.trim() === '') {
            alert('Please enter a valid task');
            return;
        }
        axios.post('url/add', {task })
            .then(response => {
                location.reload()
               
            })
            .catch(error => {
                console.error('Error adding todo:', error);
            });
    };
    return (
        <div className='create_form'> 
        < input  type="text" name="" id="" placeholder='Enter a text' onChange={(e) => setTask(e.target.value)} />
        <button  type="button" onClick={handleAdd}>Add</button>
        
         </div>
    )
}

export default Create
*/

/*
import React, { useEffect, useState } from 'react';

import axios from 'axios';


function Create (){
   // const handleAdd = () => {
        // Logic to add a new todo item
     //   console.log("Todo added");
   // }
    const [task, setTask] = useState(''); // State to hold the input value
    const handleAdd = () => {
        if (task.trim() === '') {
            alert('Please enter a valid task');
            return;
        }
        axios.post('http://localhost:3001/add', {task })
            .then(response => {
                location.reload()
               
            })
            .catch(error => {
                console.error('Error adding todo:', error);
            });
    };
    return (
        <div className='create_form'> 
        < input  type="text" name="" id="" placeholder='Enter a text' onChange={(e) => setTask(e.target.value)} />
        <button  type="button" onClick={handleAdd}>Add</button>
        
         </div>
    )
}

export default Create

*/

import React, { useState } from 'react';
import axios from 'axios';

function Create({ url }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() === '') {
      alert('Please enter a valid task');
      return;
    }

    axios
      .post(`${url}/add`, { task })
      .then(() => location.reload())
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter a task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
