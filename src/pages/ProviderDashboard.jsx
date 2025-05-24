// src/pages/ProviderDashboard.jsx
import React, { useEffect, useState } from 'react';
import TimeSlotForm from '../components/TimeslotForm';

const ProviderDashboard = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // TODO: Fetch provider's time slots and appointments
    setTimeSlots([
      { id: 1, date: '2024-06-02', time: '09:00 AM' },
      { id: 2, date: '2024-06-03', time: '03:00 PM' },
    ]);

    setAppointments([
      { id: 1, user: 'John Doe', date: '2024-06-02', time: '09:00 AM' },
    ]);
  }, []);

  return (
    <div className="dashboard provider">
      <h2>Welcome, Provider 👨‍💼</h2>
      <p>Manage your availability and view appointments.</p>

      <section>
        <h3>Your Time Slots:</h3>
        <ul>
          {timeSlots.map((slot) => (
            <li key={slot.id}>
              {slot.date} at {slot.time}
            </li>
          ))}
        </ul>
        <button onClick={() => alert('Open slot creation form')}>
          Add Time Slot
        </button>
      </section>

      <section>
        <h3>Upcoming Appointments:</h3>
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              {appt.user} — {appt.date} at {appt.time}
            </li>
          ))}
        </ul>
      </section>
      <TimeSlotForm/>
    </div>
  );
};

export default ProviderDashboard;
