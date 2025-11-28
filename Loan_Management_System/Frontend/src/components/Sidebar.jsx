import { NavLink } from "react-router-dom";
import { FaUsers, FaMoneyBillWave, FaExchangeAlt, FaChartLine, FaHome } from "react-icons/fa";
import "./Sidebar.css";


const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h1>Loan MS</h1>
      </div>

      <nav className="menu">
        <NavLink to="/dashboard" className="menu-item">
          <FaHome className="icon" /> Dashboard
        </NavLink>

        <NavLink to="/customers" className="menu-item">
          <FaUsers className="icon" /> Customer Management
        </NavLink>

        <NavLink to="/pay-emi" className="menu-item">
          <FaMoneyBillWave className="icon" /> Pay EMI
        </NavLink>

        <NavLink to="/transactions" className="menu-item">
          <FaExchangeAlt className="icon" /> Transactions
        </NavLink>

        <NavLink to="/reports" className="menu-item">
          <FaChartLine className="icon" /> Reports
        </NavLink>
      </nav>

    </aside>
  );
};

export default Sidebar;
