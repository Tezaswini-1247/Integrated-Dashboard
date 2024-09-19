// src/components/BusinessOpportunityForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './BusinessOpportunityForm.css';

const BusinessOpportunityForm = () => {
  const [formData, setFormData] = useState({
    personName: '',
    email: '',
    phoneNumber: '',
    address: '',
    agreedIncentive: '',
    leadsGenerated: '',
    totalIncentiveOnDate: '',
    totalIncentiveSoFar: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/business-opportunity', formData);
      setMessage('Business opportunity data submitted successfully!');
    } catch (err) {
      console.error('Error submitting business opportunity data:', err);
      setMessage('Error submitting business opportunity data.');
    }
  };

  return (
  <div className="main-container">
    <div className="form-container">
      <h1>Business Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="personName">Name of the Person</label>
          <input
            type="text"
            id="personName"
            name="personName"
            value={formData.personName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="agreedIncentive">Agreed Incentive</label>
          <input
            type="number"
            id="agreedIncentive"
            name="agreedIncentive"
            value={formData.agreedIncentive}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="leadsGenerated">Leads Generated as on Date</label>
          <input
            type="number"
            id="leadsGenerated"
            name="leadsGenerated"
            value={formData.leadsGenerated}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="totalIncentiveOnDate">Total Incentive on Date</label>
          <input
            type="number"
            id="totalIncentiveOnDate"
            name="totalIncentiveOnDate"
            value={formData.totalIncentiveOnDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="totalIncentiveSoFar">Total Incentive Generated So Far</label>
          <input
            type="number"
            id="totalIncentiveSoFar"
            name="totalIncentiveSoFar"
            value={formData.totalIncentiveSoFar}
            onChange={handleChange}
            required
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
    <div className="message-container">
    <h1>"Every lead you bring is a step toward our collective success. Your effort drives our growth, and together, we turn opportunities into achievements. Keep pushing boundaries, because every new connection brings us closer to greatness!"</h1>
        <img src='https://stories.freepiklabs.com/api/vectors/growth-analytics/rafiki/render?color=5CC6D0FF&background=complete&hide=' alt="Logo" className="motivational-image" />
        
  </div>
</div>
  );
};

export default BusinessOpportunityForm;
