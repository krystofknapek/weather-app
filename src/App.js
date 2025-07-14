import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Autocomplete from './Components/Autocomplete';
import './App.css';

function App() {
  const [cityId, setCityId] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showEvening, setShowEvening] = useState(false);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [coords, setCoords] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation není podporována.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lon: longitude });
      },
      err => {
        console.error('Geolokace selhala:', err);
      }
    );
  }, []);

  useEffect(() => {
  if (cityId == null && (coords.lat == null || coords.lon == null)) {
    return;
  }

  const commonParams = {
    units: 'metric',
    lang: 'cz',
    appid: apiKey
  };

  const weatherParams = cityId != null
    ? { ...commonParams, id: cityId }
    : { ...commonParams, lat: coords.lat, lon: coords.lon };

  const forecastParams = weatherParams;

  axios
    .get('https://api.openweathermap.org/data/2.5/weather', { params: weatherParams })
    .then(res => setWeather(res.data))
    .catch(console.error);

  axios
    .get('https://api.openweathermap.org/data/2.5/forecast', { params: forecastParams })
    .then(res => setForecast(res.data))
    .catch(console.error);

}, [coords, cityId, apiKey]);


  const nextFiveDaysForecast = useMemo(() => {
    if (!forecast?.list) return [];
    const now = Date.now();
    const desiredTime = showEvening ? '21:00:00' : '12:00:00';
    return forecast.list
      .filter(entry => entry.dt_txt.endsWith(desiredTime))
      .filter(entry => new Date(entry.dt_txt).getTime() >= now)
      .slice(0, 5);
  }, [forecast, showEvening]);

  const renderObject = obj =>
    Object.entries(obj).map(([key, value]) => (
      <div key={key}>
        <strong>{key}</strong>:{' '}
        {typeof value === 'object' && value !== null
          ? <div>{renderObject(value)}</div>
          : JSON.stringify(value)}
      </div>
    ));

  return (
    <div className='Main'>
      <h1>Weather App</h1>
      <Autocomplete onSelect={setCityId} />

      {weather && (
        <div>
          <h1>{weather.name},{weather.sys.country}</h1>
          {Object.entries(weather).map(([key, value]) => (
            <div key={key}>
              <strong>{key}</strong>: {JSON.stringify(value)}
            </div>
          ))}
        </div>
      )}

     {nextFiveDaysForecast.length > 0 && (
        <div>
          <h2>
            5denní předpověď ({showEvening ? '21:00' : '12:00'}): {forecast.city.name}, {forecast.city.country}
          </h2>
          <button onClick={() => setShowEvening(prev => !prev)}>X</button>
          {nextFiveDaysForecast.map(entry => (
            <div key={entry.dt}>
              <h3>
                {new Date(entry.dt_txt).toLocaleDateString('cs-CZ', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </h3>
              {renderObject(entry)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;