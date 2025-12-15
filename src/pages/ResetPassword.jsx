import { useState } from "react";
import { resetPassword } from "../services/otpService";
import { useLocation, useNavigate } from "react-router-dom";
import './otp.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await resetPassword(email, otp, password);
      setMsg("Password reset successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Reset Password</h2>

        <form onSubmit={handleReset} autoComplete="off">

          {/* 🔒 Autofill trap */}
          <input type="text" name="fake-username" style={{ display: "none" }} />
          <input type="password" name="fake-password" style={{ display: "none" }} />

          <input
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            autoComplete="one-time-code"
          />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit">Reset Password</button>
        </form>

        {msg && (
          <p
            style={{
              color: msg.includes("successful") ? "green" : "red",
              textAlign: "center"
            }}
          >
            {msg}
          </p>
        )}

        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ResetPassword;
