import React, { useState } from 'react';
import RadioButton from '@/UIComponents/RadioButton';

const RadioGroup: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('option1');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Select an Option:</h3>
      <div>
        <RadioButton
          label="Option 1"
          value="option1"
          name="radioGroup"
          checked={selectedValue === 'option1'}
          onChange={handleRadioChange}
        />
        <RadioButton
          label="Option 2"
          value="option2"
          name="radioGroup"
          checked={selectedValue === 'option2'}
          onChange={handleRadioChange}
        />
        <RadioButton
          label="Option 3"
          value="option3"
          name="radioGroup"
          checked={selectedValue === 'option3'}
          onChange={handleRadioChange}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>Selected Value: </strong>
        {selectedValue}
      </div>
    </div>
  );
};

const RadioDemo = () => {
  return (
    <>
      {/*
        To allow both selecting and unselecting a radio button (i.e., toggling its state between selected and deselected),
        you’ll need to use a slightly different approach,
        because a traditional radio button typically doesn’t allow unselection.
      */}
      <RadioGroup/>
    </>
  )
}

export default RadioDemo;