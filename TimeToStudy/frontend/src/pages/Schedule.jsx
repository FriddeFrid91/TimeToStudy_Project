import React, { useState } from 'react';
import FileSelector from '../components/ScheduleByMonth'; // Assuming this works as expected
import ScheduleTable from '../components/ScheduleTable'; // Assuming this works as expected
import MobileSchedule from '../components/MobileSchedule'; // Assuming this works as expected
import { getStartOfWeek, getDatesOfWeek, getWeekNumber } from '../utils/scheduleUtils'; 
import '../styles/schedulestwo.css';


const hours = Array.from({ length: 13 }, (_, i) => i + 8);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function School_sch() {
  const [events, setEvents] = useState([]);
  const [studyEvents, setStudyEvents] = useState([]); 
  const [selectedFile, setSelectedFile] = useState('');
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [school, setSchool] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');

  const handleGetICSData = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/ics?file=${selectedFile}`, {
      method: 'GET',
      credentials: 'include',
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error("Server did not return JSON. Check the API URL or backend.");
    }

    const data = await response.json();

    if (response.ok) {
      console.log('ICS data:', data);
      // Example: set state or update UI with `data`
      setEvents(data);
      alert("Schedule loaded successfully!");
    } else {
      alert(data.message || "Failed to load schedule.");
    }
  } catch (err) {
    console.error('ICS fetch error:', err.message);
    alert(`Error loading schedule: ${err.message}`);
  }
};

  // Navigation functions
  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(getStartOfWeek(next));
  };

  const previousWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(getStartOfWeek(prev));
  };

  const weekDates = getDatesOfWeek(currentWeekStart);

  return (
    <div className="app-container2">
      <h1 className="app-title2">Schedule</h1>

      {/* File Selector */}
      <FileSelector 
        school={school} 
        setSchool={setSchool}
        program={program} 
        setProgram={setProgram} 
        year={year} 
        setYear={setYear}
        handleGetICSData={handleGetICSData} 
      />

   

   

      {/* Schedule Table */}
      {events.length > 0 || studyEvents.length > 0 ? (
        <>
          <ScheduleTable events={events} studyEvents={studyEvents} currentWeekStart={currentWeekStart} weekDates={weekDates} hours={hours} days={days} />
          <MobileSchedule events={events} studyEvents={studyEvents} currentWeekStart={currentWeekStart} weekDates={weekDates} hours={hours} days={days} />
        </>
      ) : (
        <p className="no-events-text">🎓 "Study smart, not harder — efficiency turns effort into achievement." by Time2Study </p>
      )}
    </div>
  );
}

export default School_sch;
