import React, { useState } from 'react';
import { createClub, getRecommendations } from '../services/clubService';
import './Clubs.css';
import WhiteHeader from '../components/WhiteHeader';
// import Header from '../components/Header';

function Clubs() {
  const [interests, setInterests] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [clubData, setClubData] = useState({ name: "", description: "", tags: "", college: "" });

  // Handle AI Recommendations
  const handleRecommend = async () => {
    if (!interests) return alert("Enter your interests!");
    const res = await getRecommendations(interests.split(",").map(i => i.trim()));
    setRecommendations(res.recommendations);
  };

  // Handle Club Creation
  const handleCreate = async () => {
    if (!clubData.name || !clubData.tags || !clubData.college) {
      return alert("Please fill all required fields!");
    }

    const res = await createClub({
      ...clubData,
      tags: clubData.tags.split(",").map(i => i.trim()),
    });

    alert(`Club Created: ${res.name}`);

    // ✅ Clear the input fields after creation
    setClubData({ name: "", description: "", tags: "", college: "" });

    // Optional: refresh recommendations automatically
    handleRecommend();
  };

  return (
    <div>
      <WhiteHeader/>
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
        <div className="card2">
           <h3>Campus Clubs</h3>
           <h4>Enter your interests to discover relevant clubs</h4>
          <ul className="recommendations-list">
            {recommendations.map((club) => (
              <li key={club._id} className="recommendation-card">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-desc">{club.description}</p>
                
                {/* <p className="college-name"><strong>College:</strong> {club.college}</p>
                 */}
                <p className="score">Match {Math.round(club.score * 100)}%</p>
                <button className='join-btn'>Join</button>
              </li>
            ))}
          </ul>
        </div>



        {/* Create Club */}
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
      </div>
    </div>
  );
}

export default Clubs;
