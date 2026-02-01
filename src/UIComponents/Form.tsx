import React, { useState } from 'react';

const Form: React.FC = () => {
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
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted with data: ${JSON.stringify(formData)}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Gender Field */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
        </div>

        {/* Newsletter Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />{' '}
            Subscribe to Newsletter
          </label>
        </div>

        {/* Country Field */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="country" style={{ display: 'block', marginBottom: '5px' }}>
            Country:
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleSelectChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select your country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
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
        </button>
      </form>
    </div>
  );
};

export default Form;