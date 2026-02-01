import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, name, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        style={{ marginRight: '10px', width: '20px', height: '20px' }}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default RadioButton;