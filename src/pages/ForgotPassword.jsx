import { useState } from "react";
import { sendResetOTP } from "../services/otpService";
import { useNavigate } from "react-router-dom";
import "./otp.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await sendResetOTP(email);
      navigate("/reset-password", { state: { email } });
    } catch {
      setMsg("Error sending OTP");
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <h2>Forgot Password</h2>

        <form onSubmit={sendOTP}>
          <input
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <button type="submit">Send OTP</button>
        </form>

        {msg && <p style={{ color: "red", textAlign: "center" }}>{msg}</p>}
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
