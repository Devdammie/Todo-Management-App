
import React from "react"; 
import  { useEffect, useState } from 'react';

import Create from "./Create";


import axios from "axios";
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";


import './App.css'

function Home() {
    const url = 'https://todo-app-backend-98n1.onrender.com'
    const [todos, setTodos] = useState([]); // State to hold the list of todos

    useEffect(() => {
        // Fetch todos from the server when the component mounts
      
        axios.get("url/get")
        
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) =>{
     axios.put('url/update/'+id)
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
    }

    const handleDelete = (id) =>{
      axios.delete('url/delete/'+id)
      .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
      

    }

   return (
    <div className="home">
      <h1>Todo List</h1>
      <Create/>
      <br />
      {
        todos.length === 0 
        ? 
        <div><h2>No todos available</h2></div> 
        :
        // Map through the todos array and display each todo
        todos.map(todo =>(
          <div className="task">
            <div className='checkbox' onClick={ () => handleEdit( todo._id)}>
            


              {todo.done ?  
                 <BsFillCheckCircleFill className="icon" />
                 : <BsCircleFill className="icon" />
                 }
              
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><BsFillTrashFill className='icon'
              onClick={() => handleDelete(todo._id)}
              /> </span>
            </div>
            
          
          </div>

        ))
       
      }
    
    </div>
   
     
   
    )

}

export default Home;


