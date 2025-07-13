import React, { useState, useRef, useMemo } from 'react';
import cityList from '../Assets/city.list.json';

function normalizeString(str) {
  return str
    .normalize('NFD')                   
    .replace(/[\u0300-\u036f]/g, '')    
    .toLowerCase();
}


export default function Autocomplete({ onSelect }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const normString = normalizeString(text);

 const suggestions = useMemo(() => {
    if (normString.length < 2) return [];
    return cityList
      .filter(city => normalizeString(city.name).startsWith(normString))
      .slice(0, 10);
  }, [normString]);

  const handleSelect = cityid => {
    setText('');            
    onSelect(cityid.id);         
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
          {suggestions.map(city => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
