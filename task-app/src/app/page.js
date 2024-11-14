"use client"; // Add this line at the top

import { useState } from 'react';
import { Plus, Trash, Edit, Check, Users } from 'lucide-react';

const TaskAllocationApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'This is task 1', completed: false, assignedTo: 'John Doe' },
    { id: 2, title: 'Task 2', description: 'This is task 2', completed: false, assignedTo: 'John Doe' },
    { id: 3, title: 'Task 3', description: 'This is task 3', completed: false, assignedTo: 'John Doe' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 3, name: 'Bob Smith' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      assignedTo: newTaskAssignedTo,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskAssignedTo('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTask.id) {
          return { ...task, title: newTaskTitle, description: newTaskDescription, assignedTo: newTaskAssignedTo };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTask(null);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskAssignedTo('');
    }
  };

  const handleToggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
    };
    setUsers([...users, newUser]);
    setNewUserName('');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Task Allocation App</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task description"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={newTaskAssignedTo}
          onChange={(e) => setNewTaskAssignedTo(e.target.value)}
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Assign to</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="mr-2" />
          Add Task
        </button>
      </div>
      {editingTask && (
        <div className="mb-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task title"
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Task description"
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTaskAssignedTo}
            onChange={(e) => setNewTaskAssignedTo(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Assign to</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSaveEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Check className="mr-2" />
            Save Edit
          </button>
        </div>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between mb-2 p-4 bg-white rounded-lg shadow-sm">
            <div>
              <h2
                className={`text-lg font-bold ${
                  task.completed ? 'text-gray-400' : 'text-gray-700'
                }`}
              >
                {task.title}
              </h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
            </div>
            <div>
              <button
                onClick={() => handleToggleCompleted(task.id)}
                className={`mr-2 ${
                  task.completed
                    ? 'bg-red-500 hover:bg-red-700'
                    : 'bg-green-500 hover:bg-green-700'
                } text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {task.completed ? 'Not Complete' : 'Complete'}
              </button>
              <button
                onClick={() => handleEditTask(task)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              >
                <Edit className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Trash className="mr-2" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Assignees</h2>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Assignee name"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="mr-2" />
          Add Assignee
        </button>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex justify-between mb-2 p-4 bg-white rounded-lg shadow-sm">
              <span>{user.name}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Trash className="mr-2" />
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskAllocationApp;
