import React, { useState } from 'react';
import Input from '@/UIComponents/Input';
import RadioButton from '@/UIComponents/RadioButton';
import Checkbox from '@/UIComponents/Checkbox';
import Select, { SelectProps } from '@/UIComponents/Select';
import SubmitBtn from '@/UIComponents/SubmitBtn';

const FormDemo: React.FC = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    newsletter: false,
    country: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted with data: ${JSON.stringify(formData)}`);
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }))
  };
  const handleCheckBoxChange = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      newsletter: value,
    }))
  };
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      country: value,
    }))
  };

  const selectData:SelectProps['selectData'] = [
    {
      value: 'USA',
      label: 'USA',
    },
    {
      value: 'Canada',
      label: 'Canada',
    },
    {
      value: 'UK',
      label: 'UK',
    },
    {
      value: 'Australia',
      label: 'Australia',
    },
  ];

  return (
    <div style={{ padding: '6px',  margin: '0 auto' }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Input title={'Name'} changFn={handleChange} />
        {/* Email Field */}
        <Input title={'Email'} changFn={handleChange} />


        {/* Gender Field */}
        <label style={{ display: 'block', marginTop: '5px' }}>Gender:</label>
        <RadioButton
          label="Male"
          value="male"
          name="gender"
          checked={formData.gender === 'male'}
          onChange={handleRadioChange}
        />
        <RadioButton
          label="Female"
          value="female"
          name="gender"
          checked={formData.gender === 'female'}
          onChange={handleRadioChange}
        />

        {/* Newsletter Field */}
        <div style={{ margin: '10px 0' }}>
          <Checkbox
            label="Subscribe to Newsletter"
            onChange={handleCheckBoxChange}
          />
        </div>

        {/* Country Field */}
        <div style={{ marginBottom: '10px' }}>
          <Select selectData={selectData} defaultText={"Select your country"} onDateChange={handleSelectChange} />
        </div>

        {/* Submit Button */}
        <SubmitBtn label='Submit' color='#4CAF50'  />
        {/* <button
          type="submit"
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default FormDemo;