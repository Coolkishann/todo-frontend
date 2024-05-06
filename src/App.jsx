import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './component/PrivateRoutes';
import Auth from './pages/Auth';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Register from './component/auth/Register';
import EditTask from './component/task/EditTask'; // Import the TaskEditForm component

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1rem',
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-task/:taskId" element={<EditTask />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/register" element={<Register />} /> {/* Specific route for the Register page */}
      </Routes>
    </>
  );
}

export default App;
