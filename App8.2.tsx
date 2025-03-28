import React, { useState } from "react";
import axios from "axios";
import "./app.css";

const API_KEY = "13fe114cdc97527d1faa97fa2d2b9682"; 

const app = () => {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return; // Prevent empty requests
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found. Please try again.");
      setWeather(null); // Reset weather data on error
    }
    setLoading(false);
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>🌤️ {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Enter a city to get weather data</p>
      )}
    </div>
  );
};

export default app;
