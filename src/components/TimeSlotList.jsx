// src/components/TimeSlotList.jsx
import React from 'react';
const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

};

  

  const TimeSlotList = ({ slots, error }) => {
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
                {slot.date.slice(0, 10)} | {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </li>

            ))}
          </ul>
        )}
      </div>
    );
  };

  export default TimeSlotList;
