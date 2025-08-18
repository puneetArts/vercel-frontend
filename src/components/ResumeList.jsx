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

      {resumes.length === 0 ? (
        <p>No resume uploaded yet.</p>
      ) : (
        <ul>
          {resumes.map((r) => (
            <li key={r._id}>

              <button onClick={() => window.open(r.fileUrl, "_blank")} className="res-btn">
                Resume
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
