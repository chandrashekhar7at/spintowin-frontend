import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FaPhoneAlt, FaLock } from 'react-icons/fa'; // Import icons from react-icons
import { BaseUrl } from '../utils/Urls';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setIsAuth, setPaymentStatus, setPhoneNumber, setSpinLeft, setTotalScore, setUserId } from '../redux/userinfoSlice';

const Signin = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ phone: '', password: '' });
    const [err,setErr] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSigninFormSubmit = async (e) => {
        e.preventDefault();
        
        let isValid = true;
        let phoneError = '';
        let passwordError = '';
        setErr('')

        // Phone number validation
        if (phone.trim() === '') {
            phoneError = 'Phone number is required';
            isValid = false;
        }

        // Password validation
        if (password.trim() === '') {
            passwordError = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters long';
            isValid = false;
        }


        if (!isValid) {
            setErrors({ phone: phoneError, password: passwordError });
            return;
        }

        try {
            // Handle the signup logic here
            const result = await axios.post(`${BaseUrl}/api/signin`,{phone,password},{
                withCredentials:true,
                credentials:'includes'
            })
            if(result.data.status){
                setPhone('')
                setPassword('')
                dispatch(setUserId(result.data.data._id))
                dispatch(setPhoneNumber(result.data.data.phone))
                dispatch(setSpinLeft(result.data.data.spinleft))
                dispatch(setTotalScore(result.data.data.score))
                dispatch(setPaymentStatus(result.data.data.paymentStatus))
                dispatch(setIsAuth(true))
                navigate('/dashboard')
                return;
            }
            setErr(result.data.message)
        } catch (error) {
        }
    };

    return (
        <div className="px-5 mt-[-50px] min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {/* 3D Card */}
            <form onSubmit={handleSigninFormSubmit} className="relative w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl transform perspective-3d hover:translate-z-10 hover:shadow-2xl transition-all duration-500">
                {
                    err?(
                        <p className='text-white text-center bg-red-500 m-5 rounded p-4'>{err}</p>
                    ):''
                }
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">login</h2>

                {/* Phone Number Input */}
                <div className="mb-4 relative">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                        Phone Number
                    </label>
                    <div className="flex items-center mt-1">
                        <span className="bg-gray-200 px-3 py-2 rounded-l-lg text-gray-700 font-semibold">+91</span>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-r-lg ${errors.phone ? 'border-red-500' : ''} focus:ring-2 focus:ring-purple-600 focus:outline-none shadow-inner transform hover:translate-z-1 transition`}
                        />
                        <FaPhoneAlt className="absolute right-3 text-gray-500" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Password Input */}
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="flex items-center mt-1 relative">
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.password ? 'border-red-500' : ''} focus:ring-2 focus:ring-purple-600 focus:outline-none shadow-inner transform hover:translate-z-1 transition`}
                        />
                        <FaLock className="absolute right-3 text-gray-500" />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Signup Button */}
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold text-lg transform hover:scale-105 transition duration-300 hover:bg-purple-600 shadow-lg hover:shadow-xl">
                    login
                </button>

                {/* Already have an account */}
                <p className="mt-6 text-center text-sm text-gray-700">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-purple-600 font-bold hover:text-purple-800">
                        signup
                    </Link>
                </p>
            </form>

            {/* Background Elements for 3D Effect */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute bottom-32 left-10 w-24 h-24 bg-purple-400 rounded-full opacity-70 animate-spin-slow"></div>
        </div>
    );
};

export default Signin;
