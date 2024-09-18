import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id:null,
  spinleft:0,
  totalScore:0,
  paymentStatus:false,
  isValid:false,
  amount:50,
  phone:null
}

export const userSlice = createSlice({
  name: 'userauth',
  initialState,
  reducers: {
    setUserId:(state,action)=>{
        state.id = action.payload
    },
    setSpinLeft: (state,action) => {
      state.spinleft = action.payload
    },
    setTotalScore:(state,action)=>{
        state.totalScore = action.payload
    },
    setPaymentStatus:(state,action)=>{
        state.paymentStatus = action.payload
    },
    setIsAuth:(state,action)=>{
        state.isValid = action.payload
    },
    setLogout:(state,action)=>{
        state.spinleft = 0,
        state.totalScore = 0,
        state.paymentStatus = false,
        state.isValid = false
        state.phone = null
        state.amount = 0
        state.id = null
    },
    setAmountAddMoney:(state,action)=>{
        state.amount = action.payload
    },
    setPhoneNumber:(state,action)=>{
        state.phone = action.payload
    }
  },
})

export const { setPhoneNumber,setUserId,setRandomNumber,setAmountAddMoney,setLogout,setIsAuth,setSpinLeft,setTotalScore,setPaymentStatus } = userSlice.actions

export default userSlice.reducer