import React from 'react';

const TimeSlotList = ({ slots = [], error = '' }) => {
  const formatTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) {
      console.warn('Missing date or time:', { dateStr, timeStr });
      return 'Invalid Time';
    }
  
    try {
      const dateOnly = new Date(dateStr).toISOString().split('T')[0]; // '2025-05-14'
      const dateTime = new Date(`${dateOnly}T${timeStr}`);
      if (isNaN(dateTime)) {
        console.warn('Invalid combined date/time:', `${dateOnly}T${timeStr}`);
        return 'Invalid Time';
      }
  
      return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (err) {
      console.error('Error parsing time:', err);
      return 'Invalid Time';
    }
  };
  


  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (slots.length === 0) return <p>No time slots created yet.</p>;

  return (
    <section style={{ marginTop: '2rem' }}>
      <h3>Your Time Slots:</h3>
      <ul>
        {slots.map((slot) => (
          <li key={slot._id || slot.id}>
            {new Date(slot.date).toLocaleDateString()} | {formatTime(slot.date, slot.startTime)} - {formatTime(slot.date, slot.endTime)}
          </li>
        ))}
        
      </ul>


    </section>
  );
};

export default TimeSlotList;
