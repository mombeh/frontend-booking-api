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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleBook} className="space-y-4">
          {/* Provider */}
          <div>
            <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-1">Select Provider:</label>
            <select
              id="provider"
              value={selectedProviderId}
              onChange={(e) => {
                setSelectedProviderId(e.target.value);
                setSelectedSlotId('');
              }}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
          <div>
            <label htmlFor="slot" className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot:</label>
            <select
              id="slot"
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              required
              disabled={!selectedProviderId}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (optional):</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any specific instructions..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!selectedSlotId}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default AppointmentBooking;
