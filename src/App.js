import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from './Components/Autocomplete';

function App() {
  const [cityId, setCityId] = useState(null);
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (!cityId) return;
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: { id: cityId, appid: apiKey }
      })
      .then(res => setWeather(res.data))
      .catch(console.error);
  }, [cityId, apiKey]);

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
    </div>
  );
}

export default App;
