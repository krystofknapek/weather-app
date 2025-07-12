import React, { useState, useEffect } from 'react';
import cityList from '../Assets/city.list.json';

export default function Autocomplete({ onSelect }) {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }
    const re = new RegExp(text, 'i');
    const matches = cityList
      .filter(c => re.test(c.name))
      .slice(0, 10);
    setSuggestions(matches);
  }, [text]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Zadej město…"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map(c => (
            <li
              key={c.id}
              onClick={() => {
                setText(`${c.name}, ${c.country}`);
                setSuggestions([]);
                onSelect(c.id);
              }}
            >
              {c.name}, {c.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
