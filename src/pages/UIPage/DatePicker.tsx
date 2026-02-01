import React, { useState } from 'react';
import DatePicker from '@/UIComponents/DatePicker';

const DatePickerDemo: React.FC = () => {

  const [date, setDate] = useState<string>('');
  const handleDateChange = (newDate: string) => {
    setDate(newDate); // Update the parent component's state with the new date
  };

  return (
    <>
      <DatePicker onDateChange={ handleDateChange } />
      <div style={{ marginTop: '10px' }}>
        <span>Selected Date:</span> {date || 'None'}
      </div>
    </>
  );
};

export default DatePickerDemo;