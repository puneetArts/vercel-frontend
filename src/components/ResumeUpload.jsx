import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const ResumeUpload = ({ onUploaded }) => {
  const { user } = useContext(AuthContext);
  const [resumeFile, setResumeFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    if (!resumeFile) {
      setMsg('Please select a resume file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resumes`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMsg('Resume uploaded successfully!');
      setResumeFile(null);

      if (onUploaded) onUploaded(res.data.resume);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error uploading resume');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h4>Upload Resume</h4>
      {msg && <p>{msg}</p>}

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResumeFile(e.target.files[0])}
      />

      <button type="submit">Upload</button>
    </form>
  );
};

export default ResumeUpload;
