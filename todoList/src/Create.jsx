import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Create({ onAdd }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (task.trim() === '') {
      toast.warn('Task cannot be empty!');
      return;
    }
    if (assignedTo.trim() === '') {
      toast.warn('Please assign the task to someone!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://todo-app-backend-98n1.onrender.com/add', {
        task,
        priority,
        assignedTo,
      });
      setTask('');
      setPriority('medium');
      setAssignedTo('');
      toast.success('Task added!');
      if (onAdd) onAdd(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    /*
    <div className="flex flex-col gap-3 mt-4 p-4 border rounded-xl shadow-md bg-white">
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none"
      />

      <input
        type="text"
        placeholder="Assign to (e.g., John)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none"
      >
        <option value="high">🔥 High Priority</option>
        <option value="medium">⚠️ Medium Priority</option>
        <option value="low">🟢 Low Priority</option>
      </select>

      <button
        onClick={handleAdd}
        disabled={loading}
        className={`px-4 py-2 text-white rounded-lg ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </div>
    */

  <div className="create_form">
  <input
    type="text"
    placeholder="Enter a task..."
    onChange={(e) => setTask(e.target.value)}
    value={task}
  />
  <input
    type="text"
    placeholder="Assign to (e.g., John)"
    onChange={(e) => setAssignedTo(e.target.value)}
    value={assignedTo}
  />
  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="High">🔥 High Priority</option>
    <option value="Medium">⚠️ Medium Priority</option>
    <option value="Low">🟢 Low Priority</option>
  </select>
  <button type="button" onClick={handleAdd}>
    {loading ? 'Adding...' : 'Add Task'}
  </button>
</div>


  );
}

export default Create;
