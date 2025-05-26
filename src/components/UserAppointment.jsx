// src/components/UserAppointments.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserAppointments = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, [token]);

  return (
    <div>
      <h3>Your Appointments</h3>
      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            With {a.provider.serviceName} on {a.timeSlot.date} at {a.timeSlot.startTime}
            — Status: {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAppointments;
