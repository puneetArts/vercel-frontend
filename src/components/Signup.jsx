import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/images/illustration.png";
import "./Signup.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PublicHeader from "../components/PublicHeader";

const Signup = () => {
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(true); // ✅ ADDED

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    collegeId: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/colleges`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setColleges(res.data);
        } else if (Array.isArray(res.data.colleges)) {
          setColleges(res.data.colleges);
        } else {
          setColleges([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
        setColleges([]);
      })
      .finally(() => {
        setLoadingColleges(false); // ✅ ADDED
      });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      console.error("Signup error:", err);
      setMsg(err.response?.data?.msg || "Error during signup");
      setMsgType("error");
    }
  };

  return (
    <div>
       <PublicHeader />
      <div className="signup-page">
      <div className="ill-tag">
        <img
          style={{ maxHeight: "450px" }}
          src={illustration}
          alt="illustration"
        />
        <h1>
          Connect. Collaborate. <span>Grow.</span>
        </h1>
      </div>

      <div className="signup-container">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#0a66c2",
                fontSize: "1.2rem",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

          {/* COLLEGE SELECT  */}
          <div className="select-wrapper">
            <select
              name="collegeId"
              value={form.collegeId}
              onChange={handleChange}
              required
              disabled={loadingColleges}
              className="college-select"
            >
              <option value="">
                {loadingColleges ? "Loading colleges..." : "Select College"}
              </option>

              {!loadingColleges &&
                colleges.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" disabled={loadingColleges}>
            Signup
          </button>
        </form>

        {msg && (
          <p style={{ color: msgType === "success" ? "green" : "red" }}>
            {msg}
          </p>
        )}

        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
    </div>
  );
};

export default Signup;
