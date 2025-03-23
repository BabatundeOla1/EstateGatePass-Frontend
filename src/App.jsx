import { useState } from 'react'
import './App.css'
import TenantSignUp from './component/signUp/TenantSignUp'
import TenantLogin from './component/login/TenantLogin'
import GenerateOTP from './component/generateOTP/GenerateOTP'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SecuritySignUp from './component/signUp/SecuritySignUp'
import ValidateOtp from './component/validateOtp/ValidateOtp'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TenantSignUp />} />
        <Route path = "/login" element = {<TenantLogin/>}/>
        <Route path='/generateOTP' element = {<GenerateOTP/>}/>
        <Route path='/securitySignup' element = {<SecuritySignUp/>}/>
        <Route path='/validateOtp' element = {<ValidateOtp/>}/>
      </Routes>
    </Router>
  )
}

export default App
