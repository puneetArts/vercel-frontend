


import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";

import ProfileView from "./components/ProfileView";
import ProfileEdit from "./components/ProfileEdit";
import FriendRequests from "./components/FriendRequests";
import FriendList from "./components/FriendList";

import Clubs from './pages/Clubs';

import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LandingPage from "./pages/LandingPage";

// import CreateClub from './pages/CreateClub';
// import Header from './components/Header'; // Optional global header

// Private Route wrapper
function PrivateRoute({ children }) {
  const { user, initializing } = useContext(AuthContext);

  // Wait while restoring session
  if (initializing) {
    return <p>Loading...</p>; // Ideally, replace with a spinner or loader component
  }

  // Only allow access if user exists
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Optionally put <Header /> here if you want it on all protected pages */}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />




          {/* 🔐 EMAIL / OTP ROUTES (PUBLIC) */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/friend-requests" element={<PrivateRoute><FriendRequests /></PrivateRoute>} />
          <Route path="/friends" element={<PrivateRoute><FriendList /></PrivateRoute>} />
          <Route path="/profile/:id" element={<PrivateRoute><ProfileView /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
    
          <Route path="/clubs" element={<PrivateRoute><Clubs /></PrivateRoute>} />

{/*          
          <Route path="/create-club" element={<PrivateRoute><CreateClub /></PrivateRoute>} />
 */}

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
