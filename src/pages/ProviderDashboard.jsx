import React, { useEffect, useState } from 'react';
import TimeSlotForm from '../components/TimeslotForm';
import TimeSlotList from '../components/TimeSlotList';

const ProviderDashboard = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Placeholder: replace with actual fetch logic
    setTimeSlots([]);
    setAppointments([]);
  }, []);

  return (
    <div className="dashboard provider">
      <h2>Welcome, Provider 👨‍💼</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Manage your availability and view appointments.
      </p>

      <section>
        <h3>Your Time Slots:</h3>
        <ul>
          {timeSlots.length > 0 ? (
            timeSlots.map((slot) => (
              <li key={slot.id}>
                {slot.date} at {slot.time}
              </li>
            ))
          ) : (
            <li>No time slots yet</li>
          )}
        </ul>

        <div style={{ marginTop: '1rem' }}>
          {!showForm ? (
            <button onClick={() => setShowForm(true)}>Add Time Slot</button>
          ) : (
            <TimeSlotForm onClose={() => setShowForm(false)} />
          )}
        </div>
      </section>

      <section>
        <h3>Upcoming Appointments:</h3>
        <ul>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <li key={appt.id}>
                {appt.user} — {appt.date} at {appt.time}
              </li>
            ))
          ) : (
            <li>No appointments yet</li>
          )}
        </ul>
      </section>

      {/* Optional: If this always shows, keep it at bottom */}
      <TimeSlotList />
    </div>
  );
};

export default ProviderDashboard;
