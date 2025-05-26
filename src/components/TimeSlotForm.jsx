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
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/time-slot/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, startTime, endTime }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setMessage('This time slot overlaps with an existing one. Please choose another.');
          return;
        }
        throw new Error(data.message || 'Failed to create time slot');
      }

      // Show success message
      setMessage('✅ Time slot created successfully!');

      // Clear the form
      setDate('');
      setStartTime('');
      setEndTime('');

      // Optional: Close form after short delay
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);

    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };


  return (
    <div className="auth-contain">
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
            backgroundColor: '#f16d6d',
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
