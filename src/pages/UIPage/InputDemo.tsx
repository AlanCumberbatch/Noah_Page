import React, { useState } from 'react';
import Input from '@/UIComponents/Input';

const InputDemo: React.FC = () => {
  // // State to hold the input value
  const [inputValue, setInputValue] = useState<string>('');
  // Handle change event for the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value, type, checked } = e.target;
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div >
      <Input changFn={handleChange} /> <div>{inputValue}</div>
    </div>
  );
};

export default InputDemo;