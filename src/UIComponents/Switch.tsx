import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <label style={{ marginRight: '10px' }}>{label}</label>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '50px',
          height: '25px',
          backgroundColor: checked ? '#4CAF50' : '#ccc',
          borderRadius: '25px',
          position: 'relative',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '25px' : '3px',
            width: '18px',
            height: '18px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

export default Switch;