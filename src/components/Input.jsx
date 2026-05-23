import { useState } from 'react';

export function Input({ type = "text", placeholder, onChange, style, ...props }) {
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    if (onChange) onChange(e);
  };

  const currentStyle = (type === "date" && !hasValue) 
    ? { color: 'var(--text-muted)', ...style } 
    : style;

  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      style={currentStyle}
      onChange={handleChange}
      {...props} 
    />
  );
}
