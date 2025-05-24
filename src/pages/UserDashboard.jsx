// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // TODO: Fetch user's appointments
    // For now, just mock data
    setAppointments([
      { id: 1, provider: 'Barber Shop', time: '2024-06-01 10:00 AM' },
      { id: 2, provider: 'Dentist', time: '2024-06-05 2:30 PM' },
    ]);
  }, []);

  return (
    <div className="dashboard user">
      <h2>Welcome, User 👋</h2>
      <p>Here are your upcoming appointments:</p>

      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.provider}</strong> — {appt.time}
          </li>
        ))}
      </ul>

      <button onClick={() => alert('Redirect to booking page')}>
        Book New Appointment
      </button>
    </div>
  );
};

export default UserDashboard;
