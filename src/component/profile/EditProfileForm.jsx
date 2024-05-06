import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfileForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const loggedInUserId = localStorage.getItem("loggedInUserId");
        const { data } = await axios.get(`/api/users/me/${loggedInUserId}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/users/me", user);
      toast.success("Profile updated successfully");
      setUser(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="max-w w-full-md mx-auto h-screen
    bg-gray-800 text-white p-6  shadow-lg"
    >
      <Link to="/" className="flex items-center text-gray-300 mb-4">
        <BsArrowLeftShort className="mr-2" />
        Home
      </Link>
      <div className="bg-gray-900 rounded p-8">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <form onSubmit={updateProfile}>
          <label htmlFor="name" className="block text-gray-300 font-bold mb-2">
            Full Name:
            <input
              id="name" // Add id="name" here
              name="username" // Change name="name" to name="username"
              type="text"
              placeholder="Full Name"
              required
              value={user.username}
              onChange={updateUserInfo}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label htmlFor="email" className="block text-gray-300 font-bold mb-2">
            Email:
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={updateUserInfo}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
