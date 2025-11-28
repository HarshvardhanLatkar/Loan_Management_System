import React from 'react'
import {Routes , Route} from "react-router-dom"

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import PayEMI from "../pages/PayEMI";
import Transactions from "../pages/Transactions";
import Reports from "../pages/Reports";
import LoanApplication from "../pages/LoanApplication";
import LoanDetails from "../pages/LoanDetails";
import Profile from "../pages/Profile";

// Auth Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>

        <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/loan-apply" element={<LoanApplication />} />
        <Route path="/loan/:id" element={<LoanDetails />} />
        <Route path="/pay-emi" element={<PayEMI />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
