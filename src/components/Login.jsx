import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import illustration from '../assets/images/illustration.png';
import './Login.css';
import { IoEye, IoEyeOff } from "react-icons/io5";
import PublicHeader from "../components/PublicHeader";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: form.email.trim(),
          password: form.password
        }
      );
      await login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login Error");
    }
  };

  return (
    <div>
      <PublicHeader />
      <div className='login-page'>
      
      <div className='ill-tag'>
        <img
          style={{ maxHeight: "450px" }}
          src={illustration}
          alt='illustration'
        />
        <h1>Connect. Collaborate. <span>Grow.</span></h1>
      </div>

      <div className="login-container">
        <h2 style={{ color: "black" }}>Login</h2>

        <form onSubmit={handleSubmit} autoComplete="off">

          {/* Autofill trap */}
          <input type="text" name="fake-username" style={{ display: "none" }} />
          <input type="password" name="fake-password" style={{ display: "none" }} />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#0a66c2",
                fontSize: "1.2rem"
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        {msg && <p style={{ color: "red" }}>{msg}</p>}

        <a href="/forgot-password" style={{ fontSize: "0.9rem" }}>
          Forgot password?
        </a>

        <a className='switch' href="/signup">
          Don't have an account?
        </a>
      </div>
    </div>
    </div>
  );
};

export default Login;
