import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return <p>Loading weather...</p>;
  return (
    <div className="mb-4">
      <p><strong>Weather:</strong> {weather.description}</p>
      <p><strong>Temperature:</strong> {weather.temp}°C</p>
    </div>
  );
};

export default WeatherDisplay;