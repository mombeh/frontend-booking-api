// src/components/AppointmentBooking.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AppointmentBooking = () => {
  const { token, role } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
    setSuccess('');

    try {
      const selectedProvider = providers.find(p => p.id === selectedProviderId);
      const selectedSlot = selectedProvider?.timeSlots.find(slot => slot.id === selectedSlotId);

      if (!selectedSlot) throw new Error('Invalid time slot selected');

      const appointmentTime = `${selectedSlot.date}T${selectedSlot.startTime}`;

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provider_id: selectedProviderId,
          time_slot_id: selectedSlotId,
          appointment_time: appointmentTime,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.message || 'Booking failed');

      setSuccess('Appointment booked successfully!');
      setTimeout(() => navigate('/user/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
   <>
       <Navbar />
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>

      {error && <p className="message error">{error}</p>}
      {success && <p className="message success">{success}</p>}

      <form onSubmit={handleBook}>
        {/* Provider */}
        <div className="form-group">
          <label htmlFor="provider">Select Provider:</label>
          <select
            id="provider"
            value={selectedProviderId}
            onChange={(e) => {
              setSelectedProviderId(e.target.value);
              setSelectedSlotId('');
            }}
            required
          >
            <option value="">-- Select Provider --</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.serviceName} ({p.email})
              </option>
            ))}
          </select>
        </div>

        {/* Time Slot */}
        <div className="form-group">
          <label htmlFor="slot">Select Time Slot:</label>
          <select
            id="slot"
            value={selectedSlotId}
            onChange={(e) => setSelectedSlotId(e.target.value)}
            required
            disabled={!selectedProviderId}
          >
            <option value="">-- Select Time Slot --</option>
            {selectedProviderId &&
              providers
                .find((p) => p.id === selectedProviderId)
                ?.timeSlots
                .filter((slot) => !slot.is_booked)
                .map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.date} | {slot.startTime} - {slot.endTime}
                  </option>
                ))}
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">Notes (optional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any specific instructions..."
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={!selectedSlotId}>
          Book Appointment
        </button>
      </form>
    </div>
    <Footer/> 
   </>
  );
};

export default AppointmentBooking;
