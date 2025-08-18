import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const ResumeList = () => {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resumes/college`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResumes();
  }, [user.token]);

  return (
    <div>
      <h4>Resume</h4>
      {resumes.length === 0 ? (
        <p>No resume uploaded yet.</p>
      ) : (
        <ul>
          {resumes.map((r) => (
            <li key={r._id}>
              
              <a style={{ border: "1px solid white", borderRadius: "0.9rem" }}  href={r.fileUrl} target="_blank" rel="noopener noreferrer">
                {"Resume"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
