// import React, { useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function TaskItem({ task, deleteTask }) {
//   const navigate = useNavigate();
//     const [isCompleted, setIsCompleted] = useState(task.completed);
//     const [isLoading, setIsLoading] = useState(false);
  
//     const handleCheckboxClick = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.put(`/api/tasks/${task._id}`, {
//           completed: !isCompleted,
//         });
//         setIsCompleted(!isCompleted);
//         if (response.status === 200) {
//           toast.success('Task updated successfully');
//         } else {
//           toast.error('Failed to update task');
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error('Failed to update task');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//   return (
//     <>
    
//       <tr className="border-b border-gray-700 flex items-center justify-evenly">
//         <td className="py-4 flex ">
//           <div className="flex items-center ">
//             <input
//               type="checkbox"
//               checked={isCompleted}
//               disabled={isLoading}
//               readOnly
//               className="form-checkbox text-blue-500 h-4 w-4 mr-2 focus:outline-none"
//               onChange={handleCheckboxClick}
//             />
//             <p className={`${isCompleted ? 'line-through' : ''} text-white`}>{task.title}</p>
//           </div>
//         </td>
//         <td className="py-4">{isCompleted ? 'Complete' : 'Incomplete'}</td>
//         <td className="py-4">{moment(task.createdAt).format('MMM Do YY')}</td>
//         <td className="py-4">
//           <button
//             type="button"
//             onClick={() => navigate(`/edit-task/${task._id}`)}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-6 mx-6 rounded focus:outline-none focus:shadow-outline mr-2"
//           >
//             Edit
//           </button>
//           <button
//             type="button"
//             onClick={() => deleteTask(task._id)}
//             className="bg-red-500 hover:bg-red-600 text-white py-1 px-5 mx-6 rounded focus:outline-none focus:shadow-outline"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     </>
//   );
// }

// export default TaskItem;



import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function TaskItem({ task, deleteTask }) {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      if (response.status === 200) {
        toast.success('Task updated successfully');
      } else {
        toast.error('Failed to update task');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  return (<>
  
    <tr className="border-b border-gray-700 flex items-center justify-around">
      <td className="py-4 flex">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isCompleted}
            disabled={isLoading}
            readOnly
            className="form-checkbox text-blue-500 h-4 w-4 mr-2 focus:outline-none"
            onChange={handleCheckboxClick}
          />
          <p className={`${isCompleted ? 'line-through' : ''} text-white`}>{task.title}</p>
        </div>
      </td>
      <td className="py-4">{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td className="py-4">{moment(task.dueDate).format('MMM Do YY')}</td>
      <td className="py-4">{task.priority}</td>
      <td className="py-4">{moment(task.createdAt).format('M-Do-YY')}</td>
      <td className="py-4">
        <button
          type="button"
          onClick={() => navigate(`/edit-task/${task._id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-6 mx-6 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-5 mx-6 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </td>
    </tr>
  </>

  );
}

export default TaskItem;
