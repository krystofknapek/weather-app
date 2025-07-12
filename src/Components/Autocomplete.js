import React, { useState, useRef } from 'react';
import cityList from '../Assets/city.list.json';

export default function Autocomplete({ onSelect }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const suggestions =
    text.length >= 2
      ? cityList
          .filter(c => new RegExp(text, 'i').test(c.name))
          .slice(0, 10)
      : [];

  const handleSelect = c => {
    setText('');            
    onSelect(c.id);         
    inputRef.current.focus(); 
  };

  return (
    <div>
      <input
        ref={inputRef}
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
              onClick={() => handleSelect(c)}
            >
              {c.name}, {c.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
