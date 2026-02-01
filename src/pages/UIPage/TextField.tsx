import React, {useState} from 'react';
import TextField from '@/UIComponents/TextField';
import Button from '@/UIComponents/Button';

const TextFieldDemo = () => {
  const [value, setValue] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TextField
          label="Your Name"
          value={value}
          onChange={handleChange}
      />
      <Button label='Submit' color='#007bff' onClick={() => alert(`Submitted text: ${value}`)} />
    </>
  );
};

export default TextFieldDemo;