import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Autocomplete from './Components/Autocomplete';

function App() {
  const [cityId, setCityId] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (!cityId) return;
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: { id: cityId, appid: apiKey, units: 'metric', lang: 'cz' }
      })
      .then(res => setWeather(res.data))
      .catch(console.error);

    axios
      .get('https://api.openweathermap.org/data/2.5/forecast', {
        params: { id: cityId, appid: apiKey, units: 'metric', lang: 'cz' }
      })
      .then(res => setForecast(res.data))
      .catch(console.error);
  }, [cityId, apiKey]);

  const nextFiveDaysForecast = useMemo(() => {
    if (!forecast?.list) return [];
    const now = Date.now();
    return forecast.list
      .filter(entry => entry.dt_txt.endsWith('12:00:00'))
      .filter(entry => new Date(entry.dt_txt).getTime() >= now)
      .slice(0, 5);
  }, [forecast]);

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
    <div>
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
            5denní předpověď (poledne): {forecast.city.name}, {forecast.city.country}
          </h2>
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
