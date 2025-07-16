import React from "react";
import Forecastweather from "./Forecastweather";
import Toggle from "./Toggle";

export default function Forecast({ city, list, showEvening, onToggle }) {
    if (!list?.length) return null;
    return (
        <>
            <h2 className="forecast-header">
                5 denní předpověď ({showEvening ? '21:00' : '12:00'}): {city.name}, {city.country} <Toggle checked={showEvening} onChange={onToggle} />
            </h2>

            <section className="forecast-wrapper">
                <div className="forecast-container">
                    {list.map(entry => (
                        <Forecastweather key={entry.dt} entry={entry} />
                    ))}
                </div>
            </section>
        </>
    );
}
