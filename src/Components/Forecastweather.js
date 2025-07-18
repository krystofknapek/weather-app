import React from "react";

export default function forecastweather({ entry }) {
  return (
    <div className="forecast-day">
      <h3>{new Date(entry.dt_txt).toLocaleDateString('cs-CZ', {
        weekday: 'long', day: 'numeric', month: 'long'
      })}
      </h3>
      <img
        src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
        alt={entry.weather[0].description}
        className="forecast-icon"
      />
      <div className="temps">
        <p>Min: {Math.round(entry.main.temp_min)}°C</p>
        <p>Max: {Math.round(entry.main.temp_max)}°C</p>
      </div>
    </div>
  )
}