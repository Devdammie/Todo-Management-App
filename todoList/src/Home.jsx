import React, { useEffect, useState } from 'react';
import Create from "./Create";
import axios from "axios";
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const url = 'https://todo-app-backend-98n1.onrender.com'; // Your deployed backend

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}/get`)
      .then(result => {
        setTodos(result.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch todos");
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    axios.put(`${url}/update/${id}`)
      .then(() => {
        toast.success("Task status updated");
        setTimeout(() => window.location.reload(), 500);
      })
      .catch(err => toast.error("Failed to update task"));
  };

  const handleDelete = (id) => {
    axios.delete(`${url}/delete/${id}`)
      .then(() => {
        toast.success("Task deleted");
        setTimeout(() => window.location.reload(), 500);
      })
      .catch(err => toast.error("Failed to delete task"));
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return { backgroundColor: '#ff4d4f', color: 'white' };
      case 'medium':
        return { backgroundColor: '#faad14', color: 'white' };
      case 'low':
        return { backgroundColor: '#52c41a', color: 'white' };
      default:
        return {};
    }
  };

  return (
    <div className="home">
      <h1>Todo List</h1>
      <Create onAdd={(newTask) => setTodos([...todos, newTask])} />

      <br />
      {loading ? (
        <p className="spinner">Loading tasks...</p>
      ) : todos.length === 0 ? (
        <h2>No todos available</h2>
      ) : (
        todos.map(todo => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>

            <div className="meta">
              <span className="badge" style={getPriorityStyle(todo.priority)}>
                {todo.priority || 'Medium'}
              </span>
              {todo.assignedTo && (
                <p className="assigned">👤 Assigned to: <strong>{todo.assignedTo}</strong></p>
              )}
            </div>

            <div>
              <span>
                <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
