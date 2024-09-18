import axios from 'axios';
import React, { useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { BaseUrl } from '../utils/Urls';
import { useSelector,useDispatch } from 'react-redux';
import { setTotalScore } from '../redux/userinfoSlice';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({ upiId: '', amount: '' });

  const saveddata = useSelector(state=>state.authuser)
  const scores = saveddata.totalScore-amount
  const id = saveddata.id

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const validateFields = () => {
    let isValid = true;
    const newErrors = { upiId: '', amount: '' };

    // Validate UPI ID
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    if (!upiId.match(upiRegex)) {
      newErrors.upiId = 'Please enter a valid UPI ID (e.g., yourname@bank).';
      isValid = false;
    }

    // Validate Amount
    if (!amount || amount < 500) {
      newErrors.amount = 'Please enter an amount greater than or equal to ₹500.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateFields() && amount<saveddata.totalScore) {
      try {
          const result = await axios.post(`${BaseUrl}/api/updateScoressById/${id}`,{scores},{
            withCredentials:true,
            credentials:true
          })
          if(result.data.status){
            dispatch(setTotalScore(result.data.data.score))
            navigate('/profile')
            return;
          }
          alert('Something wrong')
      } catch (error) {
      }
    }else{
        alert('not a valid amount')
    }
  };

  return (
    <div className="min-h-screen px-5 mt-[-200px] flex justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
          <MdOutlineAccountBalanceWallet className="mr-2 text-indigo-600" /> Payment Method
        </h2>

        {/* UPI ID Input */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="upiId" className="block text-sm font-semibold text-gray-700 mb-2">
              UPI ID
            </label>
            <div className="relative">
              <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <input
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm ${
                  errors.upiId ? 'border-red-500' : ''
                }`}
              />
              {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Min ₹500"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm ${
                  errors.amount ? 'border-red-500' : ''
                }`}
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 rounded-lg font-semibold text-lg transition duration-300 hover:bg-indigo-700 shadow-lg"
          >
            <HiOutlineCurrencyRupee className="mr-2" /> Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethods;
