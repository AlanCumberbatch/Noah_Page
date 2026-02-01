import React, { useState } from 'react';

interface InputPros{
  changFn?: Function;
  title?: string;
}

const Input: React.FC<InputPros> = ({changFn, title='Enter Text'}) => {
  // State to hold the input value
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle change event for the input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    changFn && changFn(event)

    // Validate if the input is not empty
    if (value.trim() === '') {
      setErrorMessage('Input cannot be empty');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <>
      <div>
        <label htmlFor={`${title.toLowerCase()}`} style={{ marginRight: '10px' }}>
          {title}:
        </label>
        <div>
          <input
            id={`${title.toLowerCase()}`}
            name={`${title.toLowerCase()}`}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={`Enter your ${title.toLowerCase()}`}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
            }}
          />
        </div>
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '5px' }}>
          <strong>{errorMessage}</strong>
        </div>
      )}
    </>
  );
};

export default Input;