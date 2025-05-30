// src/components/AppointmentBooking.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // at the top

const AppointmentBooking = () => {
  const { token, role } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // inside component

  useEffect(() => {
    if (role !== 'user') return;

    const fetchProviders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/providers/view`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load providers');
        setProviders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProviders();
  }, [role]);

  const handleBook = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('Appointment booked successfully!');
    setTimeout(() => navigate('/user/dashboard'), 1500);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          providerId: selectedProviderId,
          timeSlotId: selectedSlotId,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Booking failed');

      setSuccess('Appointment booked successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleBook}>
        <select
          value={selectedProviderId}
          onChange={(e) => {
            setSelectedProviderId(e.target.value);
            setSelectedSlotId('');
          }}
          required
        >
          <option value="">Select Provider</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.serviceName} ({p.email})
            </option>
          ))}
        </select>

        <select
          value={selectedSlotId}
          onChange={(e) => setSelectedSlotId(e.target.value)}
          required
          disabled={!selectedProviderId}
        >
          <option value="">Select Time Slot</option>
          {selectedProviderId &&
            providers
              .find((p) => p.id === selectedProviderId)
              ?.timeSlots
              .filter(slot => !slot.is_booked)
              .map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.date} | {slot.startTime} - {slot.endTime}
                </option>
              ))
          }
        </select>

        <button type="submit" disabled={!selectedSlotId}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
