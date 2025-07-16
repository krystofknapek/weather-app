import React from 'react'

export default function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className="toggle-track" />
      <span className="toggle-thumb" />
    </label>
  )
}
