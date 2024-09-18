import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBars, FaWallet, FaTrophy, FaTimes } from 'react-icons/fa'; // Importing icons
import { GiSpinalCoil } from "react-icons/gi";
import { HiCurrencyRupee } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { BaseUrl } from '../utils/Urls';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../redux/userinfoSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const saveddata = useSelector(state=>state.authuser)
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg z-40`}>
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-white text-2xl">
          <FaTimes />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link to="/" className="flex items-center space-x-2 hover:text-yellow-300">
          <FaWallet className="text-2xl" />
          <span className="text-xl">Home</span>
        </Link>
        <Link to="/" className="flex items-center space-x-2 hover:text-yellow-300">
          <FaTrophy className="text-2xl" />
          <span className="text-xl">About</span>
        </Link>
        <Link to="/" className="flex items-center space-x-2 hover:text-yellow-300">
          <FaTrophy className="text-2xl" />
          <span className="text-xl">help</span>
        </Link>
        <Link to="/" className="flex items-center space-x-2 hover:text-yellow-300">
          <FaTrophy className="text-2xl" />
          <span className="text-xl">contact us</span>
        </Link>
        {
            saveddata.isValid?(
                <Link to="/logout" className="flex fixed ml-14 px-6 py-1 rounded-md bottom-60 bg-gray-800 hover:text-yellow-300">
                <span className="text-xl">Logout</span>
                </Link>
            ):(
                ''
            )
        }
        {/* Add more links here */}
      </nav>
    </div>
  );
};

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const saveddata = useSelector(state=>state.authuser)
  const navigate = useNavigate()

  useEffect(()=>{
    const result = async()=>{
        try {
            const checkAuthresult = await axios.get(`${BaseUrl}/api/checkUserAuth`,{
                withCredentials:true
            })
            if(checkAuthresult.data.status){
                return;
            }
            dispatch(setIsAuth(checkAuthresult.data.status))
        } catch (error) {
            // dispatch(setIsAuth(checkAuthresult.data.status))
        } 
    }
    result()
  },[])

  return (
    <>
      <header className="sticky top-0 w-full h-16 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white shadow-lg z-50">
        {/* 3D Navbar */}
        <nav className="flex justify-between items-center px-10 py-3 transform -rotate-x-3 translate-z-3d perspective-3d shadow-lg">
            {/* Right Section - Score and Wallet */}
          <div className="flex items-center ml-[-20px]">
            <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
              <FaBars className="text-2xl" />
              <span className="text-lg"></span>
            </div>
          </div>

          {/* Left Section - Logo and Site Name */}
          <div onClick={()=>navigate('/')} className="flex items-center">
            <div className="transform transition-transform hover:scale-110">
              {/* Logo (You can replace with an actual image if you have a logo) */}
              <GiSpinalCoil className='text-3xl' />
            </div>
            <div className="text-xl font-bold tracking-wider transform transition-transform hover:scale-110 hover:text-yellow-300">
              Spin To Win
            </div>
          </div>
            {/* Wallet */}
            {
                saveddata.isValid?(
                    <div onClick={()=>navigate('/profile')} className=" hover:bg-gray-500 mr-[-30px] flex rounded-md shadow-lg items-center space-x-2 border px-2 text-lg transition-transform hover:scale-110">
                        <HiCurrencyRupee className="text-yellow-300 text-2xl" />
                        <span className='text-xl'>{saveddata.totalScore}</span>
                        <FaWallet className="text-yellow-300 text-2xl" />
                    </div>
                ):(
                    null
                )
            }
        </nav>

        {/* Shadow below the navbar for 3D effect */}
        <div className="absolute w-full h-4 bg-gradient-to-b from-indigo-500 to-transparent shadow-xl"></div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
