//src/services/otpService.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const verifyEmailOTP = (email, otp) =>
  axios.post(`${API}/api/otp/verify-email`, { email, otp });

export const sendResetOTP = (email) =>
  axios.post(`${API}/api/otp/forgot-password`, { email });

export const resetPassword = (email, otp, newPassword) =>
  axios.post(`${API}/api/otp/reset-password`, { email, otp, newPassword });

