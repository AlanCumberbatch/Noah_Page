import React from 'react';
import Select, {SelectProps} from '@/UIComponents/Select';

const SelectDemo: React.FC = () => {

    // Select options data
  const selectData:SelectProps['selectData'] = [
    {
      value: 'option1',
      label: 'Option 1',
    },
    {
      value: 'option2',
      label: 'Option 2',
    },
    {
      value: 'option3',
      label: 'Option 3',
    },
  ];

  return (
    <Select selectData={selectData} defaultText={"-- Select an option --"} />
  );
};

export default SelectDemo;