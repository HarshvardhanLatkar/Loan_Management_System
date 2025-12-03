import React from "react";
import "./CustomerManagement.css";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const CustomerManagement = () => {
  return (
    <div className="customer-container">
      <h2 className="title">Customer Management</h2>
      <p className="subtitle">Manage customer records and settings</p>

      <div className="top-bar">
        <input 
          type="text" 
          className="search-box" 
          placeholder="Search Customer..." 
        />

        <button className="add-btn">
          <FaPlus /> Add Customer
        </button>
      </div>

      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Account Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Only ONE sample record */}
            <tr>
              <td>1</td>
              <td>Rahul Sharma</td>
              <td>LoanMS</td>
              <td>rahul@gmail.com</td>
              <td>9876543210</td>
              <td>867550000</td>
              <td>
                <span className="badge active">Active</span>
              </td>
              <td className="actions">
                <FaEye className="icon view" title="View" />
                <FaEdit className="icon edit" title="Edit" />
                <FaTrash className="icon delete" title="Delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CustomerManagement;
