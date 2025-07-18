import React, { useState, useEffect } from 'react'
import Autocomplete from './Components/Autocomplete'
import Todayweather from './Components/Todayweather'
import Forecast from './Components/Forecast'
import './App.css'

export default function App() {
  const [cityId, setCityId] = useState(null)
  const [weather, setWeather] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [showEvening, setShowEvening] = useState(false)
  const [coords, setCoords] = useState({ lat: null, lon: null })
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCoords({ lat: coords.latitude, lon: coords.longitude }),
      console.error
    )
  }, [])

  useEffect(() => {
    const useByCoords = cityId == null && coords.lat != null

    if (!useByCoords && cityId == null) return

    const baseParams = new URLSearchParams({
      units: 'metric',
      lang: 'cz',
      appid: apiKey
    })

    if (cityId != null) {
      baseParams.set('id', cityId)
    } else {
      baseParams.set('lat', coords.lat)
      baseParams.set('lon', coords.lon)
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${baseParams}`
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${baseParams}`

    async function fetchData() {
      try {
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl)
        ])
        if (!weatherRes.ok || !forecastRes.ok) {
          console.error('Network response was not ok')
          return
        }
        const weatherJson = await weatherRes.json()
        const forecastJson = await forecastRes.json()
        setWeather(weatherJson)
        setForecastData(forecastJson)
      } catch (error) {
        console.error('Fetch failed:', error)
      }
    }

    fetchData()
  }, [coords, cityId, apiKey])

  let nextFiveDays = []
  if (forecastData?.list) {
    const now = Date.now()
    const suffix = showEvening ? '21:00:00' : '12:00:00'
    const todayISO = new Date().toISOString().split('T')[0]

    nextFiveDays = forecastData.list
      .filter(e =>
        e.dt_txt.endsWith(suffix) &&
        new Date(e.dt_txt).getTime() >= now &&
        !e.dt_txt.startsWith(todayISO)
      )
      .slice(0, 5)
  }

  return (
    <div className="Main">
      <h1>Weather App</h1>
      <Autocomplete onSelect={setCityId} />
      <Todayweather weather={weather} />
      <Forecast
        city={forecastData?.city}
        list={nextFiveDays}
        showEvening={showEvening}
        onToggle={setShowEvening}
      />
    </div>
  )
}
