import React, { useState, useEffect } from 'react';
import { createClub, getRecommendations } from '../services/clubService';
import './Clubs.css';
import WhiteHeader from '../components/WhiteHeader';
import { jwtDecode } from "jwt-decode";

function Clubs() {
  const [interests, setInterests] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [clubData, setClubData] = useState({ name: "", description: "", tags: "", college: "" });
  const [userRole, setUserRole] = useState("student"); // default role

  // ✅ Get role from JWT once when component mounts
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token); // 👈 correct
      setUserRole(decoded.role || "student");
    } catch (err) {
      console.error("Invalid token");
    }
  }
}, []);


  // Handle AI Recommendations
  const handleRecommend = async () => {
    if (!interests) return alert("Enter your interests!");
    try {
      const res = await getRecommendations(interests.split(",").map(i => i.trim()));
      setRecommendations(res.recommendations || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching recommendations");
    }
  };

  // Handle Club Creation (ambassador only)
  const handleCreate = async () => {
    if (!clubData.name || !clubData.tags || !clubData.college) {
      return alert("Please fill all required fields!");
    }

    try {
      const res = await createClub({
        ...clubData,
        tags: clubData.tags.split(",").map(i => i.trim()),
      });

      alert(`Club Created: ${res.name}`);

      // Clear input fields
      setClubData({ name: "", description: "", tags: "", college: "" });

      // Optional: refresh recommendations
      handleRecommend();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error creating club");
    }
  };

  return (
    <div>
      <WhiteHeader />
      <div className="clubs-container">

        {/* Find Clubs */}
        <div className="card">
          <h2>Find Clubs</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter interests (comma separated)"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
            <button onClick={handleRecommend}>Get Recommendations</button>
          </div>
        </div>

        {/* Club Recommendations */}
        <div className="card2">
          <h3>Campus Clubs</h3>
          <h4>Enter your interests to discover relevant clubs</h4>
          <ul className="recommendations-list">
            {recommendations.map((club) => (
              <li key={club._id} className="recommendation-card">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-desc">{club.description}</p>
                <p className="score">Match {Math.round(club.score * 100)}%</p>
                <button className='join-btn'>Join</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Create Club (ambassador only) */}
        {userRole === "ambassador" && (
          <div className="card3">
          <h2>Create a Club</h2>
          <div className="input-group-col">
            <input
              type="text"
              placeholder="Club Name"
              value={clubData.name}
              onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={clubData.description}
              onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={clubData.tags}
              onChange={(e) => setClubData({ ...clubData, tags: e.target.value })}
            />
            <input
              type="text"
              placeholder="College"
              value={clubData.college}
              onChange={(e) => setClubData({ ...clubData, college: e.target.value })}
            />
          </div>
          <button className="create-btn" onClick={handleCreate}>Create Club</button>
        </div> 
         
        )}

      </div>
    </div>
  );
}

export default Clubs;
