import React from "react";
import { Link } from "react-router-dom";
import "./PublicHeader.css";

const PublicHeader = () => {
  return (
    <header className="public-header">
      <div className="public-header-container">

        {/* Logo */}
        <div className="public-logo">
          <Link to="/"><p>Lynx<span>App</span></p></Link>
        </div>

        {/* Actions */}
        <div className="public-actions">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>

      </div>
    </header>
  );
};

export default PublicHeader;
