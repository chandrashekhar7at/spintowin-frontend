import React, { useState } from 'react';
import { FaMoneyBillWave, FaPlus } from 'react-icons/fa'; // Import icons from react-icons
import { setAmountAddMoney, setRandomNumber } from '../redux/userinfoSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddMoney = () => {
  const [amount, setAmount] = useState('');
  const [showMessage, setShowMessage] = useState(false); // State for showing the message

  const predefinedAmounts = [50, 60, 70, 80, 90];
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Handle predefined amount button click
  const handleAmountClick = (value) => {
    setAmount(value);
  };

  // Handle adding money
  const handleAddMoney = () => {
    if (amount < 50) {
      setShowMessage(true); // Show message if amount is less than 50
    } else {
        dispatch(setAmountAddMoney(amount))
        if(amount == 50){             // Logic to handle adding money
            navigate('/verifypayment?amount=50')
        }else if(amount == 60){
            navigate('/verifypayment?amount=60')
        }else if(amount == 70){
            navigate('/verifypayment?amount=70')
        }else if(amount == 80){
            navigate('/verifypayment?amount=80')
        }else{
            navigate('/verifypayment?amount=90')
        }      
    }
  };

  return (
    <div className="min-h-screen mt-[-100px] flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* 3D Card */}
      <div className="relative w-full max-w-lg p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-80 rounded-lg shadow-2xl transform perspective-3d hover:translate-z-10 hover:shadow-2xl transition-all duration-500">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">Add Spins</h2>

        {/* Amount Input */}
        <div className="mb-6">
          <label htmlFor="amount" className="ml-10 block text-lg font-semibold text-gray-200">
            Choose from below amounts
          </label>
          <div className="flex items-center mt-1">
            <FaMoneyBillWave className="text-gray-300 mr-2" />
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Min Rs50"
              className="w-full px-4 py-2 text-lg font-bold text-white border rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none shadow-inner transform hover:translate-z-1 transition"
              disabled
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

        {/* Add Money Button */}
        <button 
          onClick={handleAddMoney}
          className="w-full flex justify-center items-center bg-purple-700 text-white py-2 rounded-lg font-semibold text-lg transform hover:scale-105 transition duration-300 hover:bg-purple-600 shadow-lg hover:shadow-xl"
        >
          <FaPlus className="mr-2" /> Add Spins
        </button>
      </div>

      {/* 3D Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative w-80 p-6 bg-red-500 text-white rounded-lg shadow-2xl transform perspective-3d hover:translate-z-10 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-lg font-semibold text-center mb-4">Error</h3>
            <p className="text-center">Please enter ₹50 or more.</p>
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

export default AddMoney;
