import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TimeSlotForm = () => {
  const { token, role } = useContext(AuthContext);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (role !== 'provider') {
      setMessage('Only providers can create time slots.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/time-slot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ date, startTime, endTime })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create time slot');
      }

      setMessage('Time slot created successfully!');
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Time Slot</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <button type="submit">Submit Slot</button>
      </form>
    </div>
  );
};

export default TimeSlotForm;
