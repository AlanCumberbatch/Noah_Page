import React, { useState } from 'react';

interface SelectItem {
  value: string;
  label: string;
}

export interface SelectProps{
  selectData: SelectItem[];
  defaultText?: string;
  onDateChange?: (date: string) => void;
}

const Select: React.FC<SelectProps> = ({selectData, defaultText='-- Select an option --', onDateChange}) => {
  // State to hold the selected value, initially set to '-- Select an option --'
  const [selectedValue, setSelectedValue] = useState<string>(defaultText);

  // Handle change event for the select field
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = event.target.value;
    setSelectedValue(newDate);
    onDateChange&&onDateChange(newDate); // Call the callback function with the new date
  };

  // // Select options data
  // const selectData = [
  //   {
  //     value: 'option1',
  //     label: 'Option 1',
  //   },
  //   {
  //     value: 'option2',
  //     label: 'Option 2',
  //   },
  //   {
  //     value: 'option3',
  //     label: 'Option 3',
  //   },
  // ];

  return (
    <div>
      <label htmlFor="selectField" style={{ marginRight: '10px' }}>
        Choose an option:
      </label>
      <select
        id="selectField"
        value={selectedValue}
        onChange={handleChange}
        style={{
          width:'100%',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minWidth:'200px'
        }}
      >
        {/* Default option */}
        {selectedValue === defaultText && (
          <option value={defaultText}>{ defaultText }</option>
        )}

        {/* Dynamic options (only listed options once something is selected) */}
        {selectData.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;