import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";

import illustration from "../assets/images/illustration.png";
import illustration_post from "../assets/images/illustration-post.png";
import illustration_achiv from "../assets/images/illustration-achiv.png";
import illustration_connect from "../assets/images/illustration-connect.png";

import "./LandingPage.css";

const features = [
  {
    title: "See what’s up at your college",
    desc: "Build meaningful connections with students from your own campus.",
    img: illustration_connect,
  },
  {
    title: "Share Achievements",
    desc: "Showcase your certifications, projects, and milestones.",
    img: illustration_achiv,
  },
  {
    title: "Post & Collaborate",
    desc: "Create posts, seek guidance, and collaborate with peers.",
    img: illustration_post,
  },
];

const LandingPage = () => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide arrow after user scrolls a little
      if (window.scrollY > 80) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeatures = () => {
    document
      .querySelector(".features-wrapper")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PublicHeader />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Connect. Collaborate. <span>Grow.</span>
          </h1>
          <p>
            A professional campus network where students share achievements,
            discover talent, and grow together.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img src={illustration} alt="hero" />
        </div>
      </section>

      {/* SCROLL DOWN ARROW */}
      {showArrow && (
        <div className="scroll-down" onClick={scrollToFeatures}>
          ↓
        </div>
      )}

      {/* FEATURES */}
      <div className="features-wrapper">
        {features.map((f, i) => (
          <section
            key={i}
            className={`feature ${i % 2 === 0 ? "normal" : "reverse"}`}
          >
            <div className="feature-img">
              <img src={f.img} alt={f.title} />
            </div>

            <div className="feature-text">
              <h2>{f.title}</h2>
              <div className="divider" />
              <p>{f.desc}</p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to join your campus network?</h2>
        <div className="hero-actions">
          <Link to="/signup" className="btn-primary">
            Create Account
          </Link>
          <Link to="/login" className="btn-outline">
            Login
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
