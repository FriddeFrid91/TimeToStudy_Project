import React, { useState } from 'react';

// Dropdown options
const schools = [
  { value: 'hkr', label: 'HKR' },

];

const programs = [
  { value: 'data', label: 'DataSystemutveckling' },
];

const years = [
  { value: '1', label: 'Year 1' },
  { value: '2', label: 'Year 2' },
  { value: '3', label: 'Year 3' },
];

const months = [
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
];

const weeks = [
  { value: '1', label: 'Week 1' },
  { value: '2', label: 'Week 2' },
  { value: '3', label: 'Week 3' },
  { value: '4', label: 'Week 4' },
];

function ScheduleByMonth() {
  const [school, setSchool] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getWeekOfMonth = (dateObj) => {
    const start = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    const dayOfMonth = dateObj.getDate();
    const adjustedDay = dayOfMonth + start.getDay(); // account for start of week
    return Math.ceil(adjustedDay / 7);
  };

  const loadEvent = async () => {
    if (!school || !program || !year || month === '') {
      alert('Please select all options!');
      return;
    }

    const filename = `${school}_${program}_year${year}.ics`;
    setLoading(true);

    try {
      const response = await fetch(`/api/ics?file=${filename}`);
      if (!response.ok) {
        throw new Error('Schedule file not found');
      }
      const data = await response.json();

      // Filter by month
      const filteredByMonth = data.filter((event) => {
        const [y, m, d] = event.startDate.split('-');
        const eventMonth = parseInt(m, 10);
        return eventMonth === parseInt(month, 10) + 1; // ICS month is 1-based
      });

      setEvents(filteredByMonth);
      setFilteredEvents(filteredByMonth); // Initially show all events for the month
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByWeek = (week) => {
    const filtered = events.filter((event) => {
      const [y, m, d] = event.startDate.split('-');
      const eventDate = new Date(`${y}-${m}-${d}`);
      const eventWeek = getWeekOfMonth(eventDate);
      return eventWeek === parseInt(week, 10);
    });
    setFilteredEvents(filtered);
    setSelectedWeek(week);
  };

  return (
    <div className="schedule-month-container">
      <h2>View Schedule by Month</h2>

      <div className="form-row">
        <label>School:</label>
        <select value={school} onChange={(e) => setSchool(e.target.value)}>
          <option value="">-- Select School --</option>
          {schools.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Program:</label>
        <select value={program} onChange={(e) => setProgram(e.target.value)}>
          <option value="">-- Select Program --</option>
          {programs.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">-- Select Year --</option>
          {years.map((y) => (
            <option key={y.value} value={y.value}>{y.label}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">-- Select Month --</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <button onClick={loadEvent} disabled={loading}>
        {loading ? 'Loading...' : 'Load Monthly Schedule'}
      </button>

      {/* Display Week Selection only after events are loaded */}
      {events.length > 0 && (
        <div className="week-selection">
          <label>Select Week for the Month: (OPTIONAL)</label>
          <select onChange={(e) => filterByWeek(e.target.value)} value={selectedWeek}>
            <option value="">-- Select Week --</option>
            {weeks.map((w) => (
              <option key={w.value} value={w.value}>{w.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="monthly-schedule">
        {filteredEvents.length === 0 ? (
          <p>No events for selected week.</p>
        ) : (
          <ul>
            {filteredEvents.map((event, index) => {
              const lowerSummary = event.summary.toLowerCase();
              const isImportant = lowerSummary.includes('exam') || lowerSummary.includes('seminar') || lowerSummary.includes('lab');
              return (
                <li key={index}>
                  <strong style={{ color: isImportant ? 'red' : 'black' }}>
                    {event.startDate}
                  </strong> - {event.summary}s
                  <br />
                  <em>📍 Building: {event.location || 'Not specified'}</em>
                  <br />
                  <em>📘 Start: {event.startTime}</em>
                  <br />
                  <em>📕 End: {event.endTime}</em>
                  
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ScheduleByMonth;
