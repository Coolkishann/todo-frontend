import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const user = {
      username: name,
      email: email,
      password: password,
    };
    try {
      await axios.post('/api/auth/signup', user);
      toast.success('Registered successfully');
      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
      // Navigate to the home page after successful registration
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  const goToLogin = () => {
    navigate('/auth');
  };

  return (
    <div className="flex justify-center bg-gray-800 items-center text-white h-screen">
      <div className="w-96 bg-gray-900 p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Register Here</h1>
        <form className="space-y-4" onSubmit={register}>
          <div>
            <label htmlFor="name" className="block mb-1">Full Name:</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full text-black px-4 py-2 rounded border focus:outline-none focus:border-blue-400" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full text-black px-4 py-2 rounded border focus:outline-none focus:border-blue-400" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full text-black px-4 py-2 rounded border focus:outline-none focus:border-blue-400" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-400 text-center cursor-pointer" onClick={goToLogin}>Already have an account? Login here.</p>
      </div>
    </div>
  );
}

export default Register;
