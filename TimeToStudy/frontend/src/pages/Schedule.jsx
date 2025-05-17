import React, { useState } from 'react';
import FileSelector from '../components/ScheduleByMonth'; // Assuming this works as expected
import ScheduleTable from '../components/ScheduleTable'; // Assuming this works as expected
import MobileSchedule from '../components/MobileSchedule'; // Assuming this works as expected
import { getStartOfWeek, getDatesOfWeek, getWeekNumber } from '../utils/scheduleUtils'; 
import '../styles/schedulestwo.css';
import ical from 'ical-parser';


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

 const handleGetICSData = async (file) => {
  try {

    const safeFileName = file.split('/').pop(); // Remove "schedules/" if present
    console.log('📦 Fetching ICS file:', safeFileName); // <== ADD THIS LINE

    const response = await fetch(`${import.meta.env.VITE_API_URL}api/ics?file=${safeFileName}`, {
      method: 'GET',
      credentials: 'include', // only if using cookies/session
    });

    //const contentType = response.headers.get('content-type');
    //if (!contentType?.includes('application/json')) {
    //  throw new Error('Invalid response: not JSON');
    //}

    if (!response.ok) {
      throw new Error('Schedule file not found');
    }

    const textData = await response.text();
    const parsed = ical.parse(textData);

    // Extract events
    const events = parsed.events.map((event) => ({
      summary: event.summary,
      start: event.start,
      end: event.end,
    }));

    //const data = await response.json();

    // Convert JS object (array of events) to JSON string with indentation for readability
    //const jsonString = JSON.stringify(data, null, 2);

    //console.log("ICS Data as JSON string:\n", jsonString);

    // You can still set events as the JS object for your app
    setEvents(events);
  } catch (error) {
    console.error('Error fetching .ics data:', error.message);
    alert(`Failed to load schedule: ${error.message}`);
    setEvents([]);

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
