const API_KEY = 'YOUR_PUBLIC_OPENWEATHERMAP_API_KEY';

export const fetchWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return {
    temp: data.main.temp,
    description: data.weather[0].description,
  };
};