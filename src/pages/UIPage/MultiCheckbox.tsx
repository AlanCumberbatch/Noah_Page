import React, { useState } from 'react';
import Checkbox from '@/UIComponents/Checkbox';

const CheckboxGroup: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    setSelectedValues((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  return (
    <div>
      <h3>Select Options:</h3>
      <div>
        <Checkbox
          label="Option 1"
          onChange={(checked) => handleCheckboxChange('option1', checked)}
        />
        <Checkbox
          label="Option 2"
          onChange={(checked) => handleCheckboxChange('option2', checked)}
        />
        <Checkbox
          label="Option 3"
          onChange={(checked) => handleCheckboxChange('option3', checked)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>Selected Values: </strong>
        {selectedValues.join(', ')}
      </div>
    </div>
  );
};


const CheckboxDemo = () => {
  return (
    <>
      <Checkbox
        label="Single Option"
        onChange={(checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}`)}
      />
      <br/>
      <CheckboxGroup/>
    </>
  )
}


export default CheckboxDemo;