import React, { useState } from 'react';

const Checkbox: React.FC<{ label: string; onChange: (checked: boolean) => void }> = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ marginRight: '10px', width: '20px', height: '20px' }}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;