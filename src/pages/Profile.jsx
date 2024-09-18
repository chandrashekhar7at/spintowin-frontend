import React from 'react';
import { FaPhoneAlt, FaIdCard, FaWallet, FaPlus, FaMoneyBillWave, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { GiSpinalCoil } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const Profile = () => {
    const navigate = useNavigate();
    const saveddata = useSelector(state => state.authuser);

    const handleLogout = () => {
        navigate('/logout');
    };

    return (
        <div className="min-h-screen mt-[-100px] flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Back to Dashboard Link */}
            <Link 
                className="self-start ml-10 mb-6 flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
                to="/dashboard"
            >
                <FaArrowLeftLong /> Dashboard
            </Link>

            {/* Profile Card with 3D Animation */}
            <div className="relative w-full max-w-lg p-8 rounded-lg shadow-xl transition-transform duration-500 transform perspective-1000 hover:rotate-x-2 hover:translate-z-10 hover:shadow-3xl">
                {/* Profile Icon */}
                <div className="flex justify-center mb-6">
                    <FaUserCircle className="text-6xl text-indigo-200 transform hover:scale-110 transition-transform duration-300" />
                </div>

                {/* User Info */}
                <div className="space-y-4 mb-8 text-center">
                    <div className="flex items-center justify-center">
                        <FaPhoneAlt className="text-gray-200 mr-3" />
                        <span className="text-lg font-semibold text-gray-100">Phone Number: {saveddata.phone}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <FaIdCard className="text-gray-200 mr-3" />
                        <span className="text-lg font-semibold text-gray-100">User ID: UID{saveddata.id.slice(-6)}</span>
                    </div>
                </div>

                {/* Winnings and Spins with Gradient & Shadow */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                        <span className="text-lg font-semibold">Total Winnings</span>
                        <div className="flex items-center">
                            <FaMoneyBillWave className="mr-2" />
                            <span className="text-2xl font-bold">{saveddata.totalScore}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                        <span className="text-lg font-semibold">Total Spins Available</span>
                        <div className="flex items-center">
                            <GiSpinalCoil className="mr-2" />
                            <span className="text-2xl font-bold">{saveddata.spinleft}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons with Hover Effects */}
                <div className="flex justify-between space-x-4 mt-8">
                    <button
                        onClick={() => navigate('/addmoney')}
                        className="flex-1 flex items-center justify-center p-3 bg-purple-700 text-white rounded-lg font-semibold transform hover:scale-105 hover:shadow-lg transition duration-300"
                    >
                        <FaPlus className="mr-2" /> Add Spin
                    </button>
                    <button
                        onClick={() => navigate('/withdraw')}
                        className="flex-1 flex items-center justify-center p-3 bg-indigo-700 text-white rounded-lg font-semibold transform hover:scale-105 hover:shadow-lg transition duration-300"
                    >
                        <FaWallet className="mr-2" /> Withdraw
                    </button>
                </div>

                {/* Logout Button with Hover & 3D Effects */}
                <button
                    onClick={handleLogout}
                    className="w-full mt-10 flex items-center justify-center bg-gray-700 text-white py-3 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute bottom-32 left-10 w-24 h-24 bg-purple-400 rounded-full opacity-50 animate-spin-slow"></div>
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-r from-yellow-500 to-pink-500 opacity-30 rounded-full filter blur-3xl"></div>
        </div>
    );
};

export default Profile;
