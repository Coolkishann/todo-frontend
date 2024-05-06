import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import TaskItem from './TaskItem';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      setTaskList(data);
      setFilteredTaskList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') {
      toast.error('Task name cannot be empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks/', {
        title: newTask,
        priority,
        dueDate,
      });
      toast.success('New task added');
      setNewTask('');
      setPriority('low');
      setDueDate('');
      setTaskList((prevTasks) => [data, ...prevTasks]);
      setFilteredTaskList((prevTasks) => [data, ...prevTasks]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
      setFilteredTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const filterTasks = (filterType) => {
    if (filterType === 'completed') {
      setFilteredTaskList(taskList.filter((task) => task.completed));
    } else if (filterType === 'uncompleted') {
      setFilteredTaskList(taskList.filter((task) => !task.completed));
    } else {
      setFilteredTaskList(taskList);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-800 text-white p-6 shadow-lg">
      <div className="mb-4 ml-16 flex justify-between">
        <div>
          <button
            type="button"
            onClick={addNewButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add New
          </button>
        </div>
        <div className="mr-16">
          <button
            type="button"
            onClick={() => filterTasks('all')}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => filterTasks('completed')}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => filterTasks('uncompleted')}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline"
          >
            Uncompleted
          </button>
        </div>
      </div>
      <br />
      {isAddingNew && (
        <form onSubmit={addNewTask} className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
            className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
        </form>
      )}
      <table className="w-full">
        <tbody>
        <tr className="border-b border-gray-700 flex items-center justify-around">
  <th className="py-4">Task Name</th>
  <th className="py-4">Status</th>
  <th className="py-4">Due Date</th>
  <th className="py-4">Priority</th>
  <th className="py-4">Created At</th>
  <th className="py-4">Actions</th>
  <th className="py-4"></th> {/* Empty cell for spacing */}
</tr>

          {filteredTaskList.length > 0 ? (
            filteredTaskList.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">No Task Found. Create a new task</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
