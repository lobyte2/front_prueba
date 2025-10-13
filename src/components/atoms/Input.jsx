import React from 'react';
import './Input.css';

const Input = ({ type = 'text', placeholder, value, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
      {...props}
    />
  );
};

export default Input;