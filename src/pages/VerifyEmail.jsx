import { useState } from "react";
import { verifyEmailOTP } from "../services/otpService";
import { useNavigate, useLocation } from "react-router-dom";
import './otp.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const submitOTP = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await verifyEmailOTP(email, otp);
      setMsg("Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Verify Email</h2>
        <p style={{ textAlign: 'center', marginBottom: '15px' }}>
          OTP sent to <b>{email}</b>
        </p>

        <form onSubmit={submitOTP}>
          <input
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>

        {msg && <p style={{ color: msg.includes("success") ? "green" : "red", textAlign: 'center' }}>{msg}</p>}
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default VerifyEmail;
