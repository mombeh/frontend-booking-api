// src/pages/UserDashboard.jsx (updated)
import React, { useEffect, useState, useContext } from 'react';
import AppointmentBooking from '../components/AppointmentBooking';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDashboard = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
   <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome, User 👋</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <p className="text-center text-gray-600 mb-6">Here are your upcoming appointments:</p>

        <div className="mb-6">
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-center">No upcoming appointments</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {appointments.map((appt) => (
                <div key={appt.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{appt.service_name || appt.provider || 'Service'}</h3>
                  <p className="text-gray-600">{appt.time || appt.appointment_time}</p>
                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <button
            onClick={() => navigate('/book')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Book New Appointment
          </button>
        </div>

        <AppointmentBooking onBookSuccess={fetchAppointments} />
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default UserDashboard;
