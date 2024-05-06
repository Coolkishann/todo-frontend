import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      const { data } = await axios.get(`/api/users/me/${loggedInUserId}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <header className="flex justify-around items-center py-4 px-8 bg-gray-800 text-white">
    <div className="flex items-center">
      <div className="mr-4">
        <FaUserAlt className="text-xl" />
      </div>
      <div className="text-left">
        <h1 className="text-lg font-semibold">{user.username}</h1>
        <p className="text-sm">{user.email}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Link to="/edit-profile" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
        Edit Profile
      </Link>
      <button type="button" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
        Logout
      </button>
    </div>
  </header>
  
  
  );
}
