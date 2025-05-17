import React from 'react';

const FileSelector = ({ school, setSchool, program, setProgram, year, setYear, handleGetICSData }) => {
  return (
    <div className="file-selector">
      <h2>Get Your Schedulel</h2>
      <label htmlFor="schoolSelect">Select School:</label>
      <select
        id="schoolSelect"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      >
        <option value="">-- Choose School --</option>
        <option value="hkr">HKR</option>
      </select>

      <label htmlFor="programSelect">Select Program:</label>
      <select
        id="programSelect"
        value={program}
        onChange={(e) => setProgram(e.target.value)}
      >
        <option value="">-- Choose Program --</option>
        <option value="data">DataSystemutveckling</option>
      </select>

      <label htmlFor="yearSelect">Select Year:</label>
      <select
        id="yearSelect"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">-- Choose Year --</option>
        <option value="1">Year 1</option>
        <option value="2">Year 2</option>
        <option value="3">Year 3</option>
      </select>

      <button
        className="load-button"
        onClick={() => {
          if (!school || !program || !year) {
            alert('Please select all options!');
            return;
          }
          const filename = `${school.toUpperCase()}_${program}_year${year}.ics`;
          handleGetICSData(filename);
        }}
      >
        Load Events
      </button>
    </div>
  );
};

export default FileSelector;
