import React, { useState } from 'react';
import Switch from '@/UIComponents/Switch';

const SwitchDemo: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Switch label="Enable Feature" checked={isChecked} onChange={handleSwitchChange} />
      <div style={{ marginTop: '6px' }}>
        <strong>Switch is {isChecked ? 'ON' : 'OFF'}</strong>
      </div>
    </div>
  );
};

export default SwitchDemo;