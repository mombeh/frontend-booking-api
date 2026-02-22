import React, { useEffect, useState, useContext } from 'react';
import TimeSlotForm from '../components/TimeSlotForm';
import TimeSlotList from '../components/TimeSlotList';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProviderDashboard = () => {
  const { token } = useContext(AuthContext);
  // const [appointments, setAppointments] = useState([]);
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
    // setAppointments([]);
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome, Provider 👨‍💼</h2>
        <p className="text-center text-gray-600 mb-8">
          Manage your availability and view appointments.
        </p>

        <section className="bg-gray-100 p-4 rounded-lg mb-6">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Create Time Slot
            </button>
          ) : (
            <TimeSlotForm onClose={() => setShowForm(false)} onCreated={fetchTimeSlots} />
          )}
        </section>

        {/* <section>
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
        </section> */}

        <TimeSlotList slots={slots} error={error} />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProviderDashboard;
