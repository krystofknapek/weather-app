# Weather App

Simple React application for displaying current weather and a 5-day forecast using the OpenWeatherMap API.

## Table of Contents

* [Features](#features)
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Components](#components)
* [Environment Variables](#environment-variables)

## Features

* **Automatic Geolocation**: Attempts to determine user location on load.
* **City Search**: Autocomplete component suggests cities based on input.
* **Current Weather**: Displays temperature, location, description, and weather icon.
* **5-Day Forecast**: Shows daily min/max temperatures at 12:00 or 21:00.
* **Toggle Switch**: Switch between midday and evening forecasts.

## Technologies

* React (functional components, Hooks)
* Fetch API
* OpenWeatherMap API
* CSS
* `city.list.json` for autocomplete suggestions

## Requirements

* Node version ≥ 20
* npm version ≥ 10
* Your own OpenWeatherMap API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/krystofknapek/weather-app
   cd weather-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file (see [Environment Variables](#environment-variables)).

## Usage

```bash
npm start
```

The app will run at `http://localhost:3000` and reload on code changes or you can visit this link https://krystofknapek.github.io/weather-app/.

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── Assets/
│   │   └── city.list.json     # City list for autocomplete
│   ├── Components/
│   │   ├── Autocomplete.js     # City search input and suggestion list
│   │   ├── TodayWeather.js     # Current weather component
│   │   ├── Forecast.js         # Wrapper for forecast items and toggle
│   │   ├── Forecastweather.js  # Single day forecast item
│   │   └── Toggle.js           # 12:00/21:00 toggle switch
│   ├── App.css                 # Global styles
│   └── App.js                  # Main application component
└── .env                        # API key (excluded from VCS)
```

## Components

* **App.js**
  Manages city, weather, forecast, and geolocation state.

* **Autocomplete.js**
  Filters `city.list.json` based on user input and returns selected city `id`.

* **TodayWeather.js**
  Displays city name, country, temperature, coresponding weather icon, and description.

* **Forecast.js**
  Header with toggle and container for forecast items.

* **Forecastweather.js**
  Individual forecast card showing date, icon, and min/max temperatures.

* **Toggle.js**
  Styled checkbox switch controlling midday or evening forecast display.

## Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

Restart the development server after adding the variable.
