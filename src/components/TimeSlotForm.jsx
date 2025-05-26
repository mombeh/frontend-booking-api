import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TimeSlotForm = ({ onClose }) => {
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

      setMessage(' Time slot created successfully!');
      setDate('');
      setStartTime('');
      setEndTime('');

      if (onClose) onClose();

    } catch (err) {
      setMessage(` ${err.message}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Time Slot</h2>
      {message && <p style={{ textAlign: 'center' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label htmlFor="">Start Time</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <label htmlFor="">End Time</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <button type="submit">Submit Slot</button>
      </form>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '10px',
            marginTop: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default TimeSlotForm;
