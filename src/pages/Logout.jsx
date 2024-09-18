import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { BaseUrl } from '../utils/Urls';
// import { setLogout } from '../redux/features/UserInfoSlice';
import { persistor } from '../redux/store';
import { setIsAuth, setLogout } from '../redux/userinfoSlice';


const Logout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initialize with null for loading state

  const data = useSelector((state) => state.authuser)
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axios.post(`${BaseUrl}/api/logout`, null, {
          withCredentials: true
        });

        if(result.data.status){
            dispatch(setLogout())
            persistor.purge()
        }
        dispatch(setIsAuth(false))
        setIsAuthenticated(result.data.status); // Redirect if logout is successful
      } catch (error) {
        setIsAuthenticated(false); // Consider the user not authenticated if there's an error
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <h1>...Loading</h1>
  }

  return isAuthenticated ? <Navigate to="/signin" /> : <Navigate to="/dashboard" />;
};

export default Logout;
