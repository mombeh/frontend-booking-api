import React, { useEffect, useState } from 'react';
import TimeSlotForm from '../components/TimeslotForm';
import TimeSlotList from '../components/TimeSlotList';

const ProviderDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    setAppointments([]);
  }, []);

  return (
    <div className="dashboard provider">
      <h2>Welcome, Provider 👨‍💼</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Manage your availability and view appointments.
      </p>

      <section>

        <div style={{ marginTop: '1rem', alignItems: 'center' }}>
          {!showForm ? (
            <button onClick={() => setShowForm(true)}
             style={{ 
              backgroundColor:'#007bff',
              padding: '10px',
              border: 'none',
              borderRadius:' 5px',
              width: '120px',
              color: '#fff',
              fontSize: '14px'}}>Creat Time Slot</button>
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
