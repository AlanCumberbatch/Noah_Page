import React, { useState } from 'react';

interface DatePickerProps {
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({onDateChange}) => {
  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Handle change event when a date is selected
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate); // Call the callback function with the new date
  };

  return (
    <div>
      <label htmlFor="datePicker" style={{ marginRight: '10px' }}>
        Choose a date:
      </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleChange}
        style={{
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default DatePicker;