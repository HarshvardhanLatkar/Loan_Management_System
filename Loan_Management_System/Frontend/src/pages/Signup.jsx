import { useState } from "react";
import api from "../api";

export default function Signup() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup Successful");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}