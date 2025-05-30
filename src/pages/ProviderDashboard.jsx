import React, { useEffect, useState, useContext } from 'react';
import TimeSlotForm from '../components/TimeslotForm';
import TimeSlotList from '../components/TimeSlotList';
import { AuthContext } from '../context/AuthContext';

const ProviderDashboard = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');

  const fetchTimeSlots = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/time-slot/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch time slots');

      const normalizeSlots = (rawSlots) =>
        rawSlots.map(slot => ({
          ...slot,
          startTime: slot.start_time,
          endTime: slot.end_time,
        }));
      setSlots(normalizeSlots(data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
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
            <button
              onClick={() => setShowForm(true)}
              style={{
                backgroundColor: '#007bff',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                width: '120px',
                color: '#fff',
                // fontSize: '14px',
              }}
            >
              Create Time Slot
            </button>
          ) : (
            <TimeSlotForm onClose={() => setShowForm(false)} onCreated={fetchTimeSlots} />
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

      <TimeSlotList slots={slots} error={error} />
    </div>
  );
};

export default ProviderDashboard;
