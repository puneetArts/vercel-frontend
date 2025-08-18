import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const ResumeList = () => {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/resumes/college`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResumes();
  }, [user.token]);

  return (
    <div>
      <h4>College Resumes</h4>
      {resumes.length === 0 ? (
        <p>No resumes uploaded yet.</p>
      ) : (
        <ul>
          {resumes.map((resume) => (
            <li key={resume._id}>
              <strong>{resume.user?.name}</strong> -{" "}
              <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
