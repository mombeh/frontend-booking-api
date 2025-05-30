import React from 'react';

const TimeSlotList = ({ slots = [], error = '' }) => {
  const formatTime = (timeStr) => {
    if (!timeStr) return 'Invalid Time';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (slots.length === 0) return <p>No time slots created yet.</p>;

  return (
<section className="time-slot-section">
  <h3>Your Time Slots:</h3>
  <ul className="time-slot-list">
    {slots.map((slot) => (
      <li className="time-slot-item" key={slot._id || slot.id}>
        <span className="date">{new Date(slot.date).toLocaleDateString()}</span>
        {' | '}
        <span className="time">{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
      </li>
    ))}
  </ul>
</section>

  );
};

export default TimeSlotList;
