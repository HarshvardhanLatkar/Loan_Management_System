import React from "react";
import "./Dashboard.css";
import { FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Hello Admin</h2>
        <p>Welcome to the LoanMS Dashboard</p>
      </div>

      {/* Statistic Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-title">Total Customers</div>
          <div className="stat-value">120</div>
          <FaUsers className="stat-icon" />
          <p className="stat-sub">+15% from last month</p>
        </div>

        <div className="stat-card">
          <div className="stat-title">Approved Loans</div>
          <div className="stat-value">48</div>
          <FaCheckCircle className="stat-icon" />
          <p className="stat-sub green-text">Processed successfully</p>
        </div>

        <div className="stat-card">
          <div className="stat-title">Pending Requests</div>
          <div className="stat-value">12</div>
          <FaClock className="stat-icon yellow-text" />
          <p className="stat-sub yellow-text">Awaiting review</p>
        </div>
      </div>

      {/* Latest Requests */}
      <h3 className="section-title">Latest Loan Requests</h3>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Rahul Sharma</td>
              <td>₹1,20,000</td>
              <td>15 Feb 2025</td>
              <td><span className="status-badge approved">Approved</span></td>
              <td><button className="view-btn">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
