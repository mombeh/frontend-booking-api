
const TimeSlotList = ({ slots = [], error = '' }) => {
  const formatTime = (timeStr) => {
    if (!timeStr) return 'Invalid Time';
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (error) return <p className="text-red-500 mb-4">{error}</p>;

  if (slots.length === 0) return <p className="text-gray-500">No time slots created yet.</p>;

  return (
    <section className="mb-6">
      <h3 className="text-xl font-semibold mb-4">Your Time Slots:</h3>
      <ul className="space-y-2">
        {slots.map((slot) => (
          <li className="bg-white p-3 rounded-lg shadow border" key={slot._id || slot.id}>
            <span className="font-medium">{new Date(slot.date).toLocaleDateString()}</span>
            {' | '}
            <span className="text-gray-600">{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TimeSlotList;
