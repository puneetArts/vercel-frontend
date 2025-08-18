import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './ResumeList.css'
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
    <div className='resume-download'>
 {!resumes ? (
        <p>No resume uploaded yet.</p>
      ) : (
        <a
          className="res-btn"
          href={r.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }} // removes underline
        >
          View Resume
        </a>
      )}
    </div>
  );
};

export default ResumeList;

