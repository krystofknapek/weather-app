import React from 'react';

export default function TodayWeather({ weather }) {
    if (!weather) return null;
    return (
        <div className="today-box">
            <div className="today-box__left">
                <h2 className="today-box__location">
                    {weather.name} <span>{weather.sys.country}</span>
                </h2>
                <p className="today-box__temp-large">
                    {Math.round(weather.main.temp)}°C
                </p>

            </div>
            <div className="today-box__right">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                />
                <p className="today-box__desc">
                    {weather.weather[0].description}
                </p>
                <p className="today-box__hi-lo">
                    H: {Math.round(weather.main.temp_max)}°  L: {Math.round(weather.main.temp_min)}°
                </p>
            </div>
        </div>
    );
}