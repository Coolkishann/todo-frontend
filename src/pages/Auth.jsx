import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../component/auth/Login';
import Register from '../component/auth/Register';
import Layout from '../component/Layout';
import useAuth from '../hooks/useAuth';

function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  return (
    <Layout>
      <div className="flex justify-center h-screen bg-gray-800 text-white">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:mr-4 rounded p-4 ">
            <Login />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Auth;
