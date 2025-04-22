import React, { useEffect, useState } from 'react';
import MoodSelector from './components/MoodSelector';
import NoteInput from './components/NoteInput';
import WeatherDisplay from './components/WeatherDisplay';
import CalendarView from './components/CalendarView';

import { fetchWeather } from './utils/weatherApi';
import { saveEntry, getEntries } from './utils/storage';
import { exportToCSV, exportToPDF } from './utils/export';

const App = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });

      try {
        const data = await fetchWeather(latitude, longitude);
        setWeather(data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setError("Weather service temporarily unavailable.");
      }
    }, (err) => {
      console.error("Geolocation error:", err);
      setError("Geolocation is required to fetch weather.");
    });

    setEntries(getEntries());
  }, []);

  const handleSave = () => {
    if (!mood) return alert('Please select a mood!');
    try {
      const entry = {
        date: new Date().toISOString().slice(0, 10),
        mood,
        note,
        weather,
      };
      saveEntry(entry);
      setEntries(getEntries());
      setNote('');
      setMood(null);
      alert('Entry saved!');
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Failed to save entry.");
    }
  };

  const handleExport = (type) => {
    try {
      if (type === 'csv') exportToCSV(entries);
      else if (type === 'pdf') exportToPDF(entries);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Please try again.");
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="p-6 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mood Journal</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded"
        >
          Toggle Dark Mode
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-2">Today is {new Date().toLocaleDateString()}</p>
      {weather && <WeatherDisplay weather={weather} />}
      <MoodSelector mood={mood} setMood={setMood} />
      <NoteInput note={note} setNote={setNote} />
      <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save Entry
      </button>

      <div className="mt-6 flex gap-2">
        <button onClick={() => handleExport('csv')} className="bg-green-500 text-white px-4 py-2 rounded">
          Export CSV
        </button>
        <button onClick={() => handleExport('pdf')} className="bg-red-500 text-white px-4 py-2 rounded">
          Export PDF
        </button>
      </div>

      <CalendarView entries={entries} />
    </div>
  );
};

export default App;


