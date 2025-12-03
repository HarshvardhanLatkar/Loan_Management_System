import React from 'react'
import {Routes , Route} from "react-router-dom"

import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>

  )
}

export default AppRouter
