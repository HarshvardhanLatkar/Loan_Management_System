import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword });
      alert("Password Reset Successfully");
    } catch (err) {
      alert("Invalid or expired token");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button>Reset</button>
      </form>
    </div>
  );
}
