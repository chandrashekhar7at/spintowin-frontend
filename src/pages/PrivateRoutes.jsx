import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';
import { BaseUrl } from '../utils/Urls';

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axios.get(`${BaseUrl}/api/checkUserAuth`,{
          withCredentials:true
        });
        if(result.data.status){
          setIsAuthenticated(result.data.status)
          return
        }
        setIsAuthenticated(result.data.status); // Assuming `result.data.status` is a boolean
      } catch (error) {
        setIsAuthenticated(result.data.status);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <h1>Loading....</h1>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
