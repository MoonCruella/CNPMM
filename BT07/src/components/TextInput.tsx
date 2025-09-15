import React from 'react';
import '../styles/base.css';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, id, className = '', ...rest }) => {
  const inputId = id || rest.name || `input-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={`field ${className}`.trim()}>
      {label && <label htmlFor={inputId} className="field-label">{label}</label>}
      <input id={inputId} className="input" {...rest} />
    </div>
  );
};
