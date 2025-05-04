import React, { useState } from 'react';
import FileSelector from '../components/ScheduleByMonth'; // Assuming this works as expected
import ScheduleTable from '../components/ScheduleTable'; // Assuming this works as expected
import MobileSchedule from '../components/MobileSchedule'; // Assuming this works as expected
import { getStartOfWeek, getDatesOfWeek, getWeekNumber } from '../utils/scheduleUtils'; 
import '../styles/schedulestwo.css';

const hours = Array.from({ length: 13 }, (_, i) => i + 8);
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function App() {
  const [events, setEvents] = useState([]);
  const [studyEvents, setStudyEvents] = useState([]); 
  const [selectedFile, setSelectedFile] = useState('');
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [school, setSchool] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');

  // Get ICS data
  const handleGetICSData = async (file) => {
    try {
      const response = await fetch(`/api/ics?file=${file}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching .ics data:', error);
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

export default App;
