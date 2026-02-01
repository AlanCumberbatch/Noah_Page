import React from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          padding: '8px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default TextField;