// src/pages/UserDashboard.jsx (updated)
import React, { useEffect, useState, useContext } from 'react';
import AppointmentBooking from '../components/AppointmentBooking';
import { AuthContext } from '../context/AuthContext';

const UserDashboard = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/appointments/view`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch appointments');
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/appointments/cancel/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to cancel appointment');
      fetchAppointments(); // refresh after cancel
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard user">
      <h2>Welcome, User 👋</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Here are your upcoming appointments:</p>
      <ul>
        {appointments.length === 0 && <li>No upcoming appointments</li>}
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.service_name || appt.provider || 'Service'}</strong> — {appt.time || appt.appointment_time}
            <button onClick={() => cancelAppointment(appt.id)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => alert('Redirect to booking page')}>Book New Appointment</button>
      <AppointmentBooking />
    </div>
  );
};

export default UserDashboard;
