// src/components/TimeSlotList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TimeSlotList = () => {
  const { token, role } = useContext(AuthContext);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      if (role !== 'provider') return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/providers/timeslots`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to fetch time slots');

        setSlots(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSlots();
  }, [token, role]);

  return (
    <div className="timeslot-list">
      <h2>Your Time Slots</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {slots.length === 0 ? (
        <p>No time slots yet.</p>
      ) : (
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              {slot.date} | {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSlotList;
