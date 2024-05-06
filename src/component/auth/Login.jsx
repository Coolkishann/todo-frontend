import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
      // console.log("🚀 ~ login ~ response:", response)
      const { id: loggedInUserId } = response.data; // Extract email from response data
      localStorage.setItem('loggedInUserId', loggedInUserId);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToRegister = () => {
    navigate('/auth/register');
  };

  return (
    <div className="flex justify-center items-center h-full gap-8">
      <div className="w-96 bg-gray-900 p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Login in ToDoFusion</h1>
        <form className="space-y-4" onSubmit={login}>
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input id="email" name="email" type="email" placeholder="Email" required className="w-full px-4 py-2 rounded border text-black focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input id="password" name="password" type="password" placeholder="Password" required className="w-full text-black px-4 py-2 rounded border focus:outline-none focus:border-blue-400" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">Login</button>
          <p className="mt-2 text-gray-400 text-center cursor-pointer" onClick={navigateToRegister}>Don't have an account? Register here.</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
