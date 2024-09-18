import React, { useState } from 'react';
import { FaMoneyBillWave, FaMinus } from 'react-icons/fa'; // Import icons from react-icons
import { HiCurrencyRupee } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const saveddata = useSelector(state => state.authuser);
  // Predefined amounts
  const predefinedAmounts = [500, 700, 900, 1200, 1500];

  // Available balance
  const availableBalance = saveddata.totalScore;

  // Minimum withdrawal limits
  const minLimits = [500, 700, 900, 1500];

  // Handle predefined amount button click
  const handleAmountClick = (value) => {
    if (value <= availableBalance) {
      setAmount(value);
    } else {
      setMessage('Insufficient balance for this amount');
      setShowMessage(true);
    }
  };

  // Handle withdrawal
  const handleWithdraw = (e) => {
    e.preventDefault();
    if (amount > availableBalance) {
      setMessage('You do not have enough balance for this withdrawal');
      setShowMessage(true);
    } else if (amount < minLimits[0]) {
      setMessage('Please enter ₹500 or higher amount.');
      setShowMessage(true);
    } else {
      navigate('/paymentmethods')
      return
    }
  };

  return (
    <div className="min-h-screen mt-[-100px] flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* 3D Card */}
      <div className="relative w-full max-w-lg p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-80 rounded-lg shadow-2xl transform perspective-3d hover:translate-z-10 hover:shadow-2xl transition-all duration-500">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">Withdraw Money</h2>

        {/* Available Balance */}
        <div className="mb-6 text-center">
          <span className="text-lg font-semibold text-gray-200">Available Balance:</span>
          <div className="text-2xl font-bold text-white mt-2 flex justify-center">
            <HiCurrencyRupee className="inline-block text-3xl text-yellow-500" /> {availableBalance}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-200">
            Amount
          </label>
          <div className="flex items-center mt-1">
            <HiCurrencyRupee className="text-gray-300 mr-2" />
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Min Rs500"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none shadow-inner transform hover:translate-z-1 transition"
            />
          </div>
        </div>

        {/* Predefined Amount Buttons */}
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          {predefinedAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountClick(amt)}
              className="w-16 h-16 bg-white text-purple-700 rounded-lg shadow-md flex items-center justify-center text-xl font-bold hover:bg-gray-100 transition-transform transform hover:scale-105"
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Withdraw Button */}
        <button 
          onClick={handleWithdraw}
          className="w-full flex justify-center items-center bg-green-700 text-white py-2 rounded-lg font-semibold text-lg transform hover:scale-105 transition duration-300 hover:bg-red-600 shadow-lg hover:shadow-xl"
        >
          <FaMinus className="mr-2" /> Withdraw
        </button>
      </div>

      {/* Insufficient Balance Message */}
      {showMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative w-80 p-6 bg-red-500 text-white rounded-lg shadow-2xl transform perspective-3d hover:translate-z-10 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-lg font-semibold text-center mb-4">Error</h3>
            <p className="text-center">{message}</p>
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-2 right-2 text-xl font-bold text-white"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Background Elements for 3D Effect */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-32 left-10 w-24 h-24 bg-purple-400 rounded-full opacity-70 animate-spin-slow"></div>
    </div>
  );
};

export default Withdraw;
