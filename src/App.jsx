import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import AddMoney from './pages/AddMoney'
import Withdraw from './pages/Withdraw'
import PrivateRoutes from './pages/PrivateRoutes'
import PublicRoutes from './pages/PublicRoutes'
import VerifyPayment from './pages/VerifyPayment'
import PaymentMethods from './pages/PaymentMethods'

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout/>}>
                  <Route element={<PublicRoutes/>}>
                    <Route index  element={<Signup/>}/>
                    <Route path='/signin'  element={<Signin/>}/>
                  </Route>
                  <Route element={<PrivateRoutes/>}>
                    <Route path='/dashboard'  element={<Dashboard/>}/>
                    <Route path='/logout'  element={<Logout/>}/>
                    <Route path='/profile'  element={<Profile/>}/>
                    <Route path='/addmoney'  element={<AddMoney/>}/>
                    <Route path='/withdraw'  element={<Withdraw/>}/>
                      <Route path='/paymentmethods'  element={<PaymentMethods/>}/>
                    <Route path='/verifypayment'  element={<VerifyPayment/>}/>
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App