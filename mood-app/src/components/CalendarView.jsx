import React from 'react';

const CalendarView = ({ entries }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">Past Entries</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {entries.map((entry, index) => (
        <div key={index} className="p-2 border rounded shadow-sm bg-white">
          <p><strong>{entry.date}</strong></p>
          <p>{entry.mood.emoji} {entry.mood.label}</p>
          <p>{entry.note}</p>
          <p>{entry.weather.description}, {entry.weather.temp}°C</p>
        </div>
      ))}
    </div>
  </div>
);

export default CalendarView;