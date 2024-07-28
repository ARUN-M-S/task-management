import React, { useState, useEffect } from 'react';
import { taskDataRequest } from 'app/utils/services/Dto/requestsTypes';
import { getStatusValue } from 'app/utils/taskUtils';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: taskDataRequest) => void;
  task: taskDataRequest | null;
}

export enum Status {
  Todo = 1,
  InProgress = 2,
  Done = 0,
  InPreview = 3,
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(Status.Todo.toString()); 
  const [priority, setPriority] = useState('0'); 

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status.toString()); 
      setPriority(task.priority.toString());
    } else {
      // Reset form when opening for new task
      setTitle('');
      setDescription('');
      setStatus(Status.Todo.toString());
      setPriority('0');
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.length < 2) {
        // Add validation error handling
        alert('Title must be at least 2 characters long');
        return;
      }
      if (description.length < 3) {
          // Add validation error handling
          alert('Description must be at least  characters long');
          return;
        }
      if(task){
        const updatedTask = { ...task, title, description, priority }; 
        
    //     console.log(Status[updatedTask?.status],"update status");
        // updatedTask.status = getStatusValue[updatedTask?.status]
        
    //   //   updatedTask.status = Status.
        onSave(updatedTask);

      }else{

      
    

    const newTask = {
     
      title,
      description,
      status: Number(status), 
      priority: Number(priority), 
    };
    onSave(newTask);
    setTitle('');
    setDescription('');
    setStatus(Status.Todo.toString());
    setPriority('0');
    onClose();

}


    // Clear form and close modal after saving
  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full mx-4">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="leading-6 font-extrabold text-gray-900 text-3xl" id="modal-title">
                {task ? 'Edit Task' : 'Add Task'}
              </h3>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm text-2xl font-extrabold text-gray-700">Title</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  placeholder="Title"
                  minLength={2} // HTML5 validation
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div className='flex space-x-4'>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${!!task ? 'bg-gray-100' : ''}`}
                >
                  <option value={Status.Todo}>{Status.Todo === 1 ? 'To Do' : 'To Do'}</option>
                  <option value={Status.InProgress}>{Status.InProgress === 2 ? 'In Progress' : 'In Progress'}</option>
                  <option value={Status.InPreview}>{Status.InPreview === 3 ? 'In Preview' : 'In Preview'}</option>
                  <option value={Status.Done}>{Status.Done === 0 ? 'Done' : 'Done'}</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleSave}
          >
            Save Task
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
