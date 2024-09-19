import React, { useState } from 'react';
import axios from 'axios';
import './InstitutionForm.css';

const InstitutionForm = () => {
  const [salesPersonName, setSalesPersonName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({ city: '', state: '' });
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [response, setResponse] = useState('');
  const [datetime, setDateTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/api/institutions', {
        salesPersonName,
        institutionName,
        contactPerson,
        phoneNumber,
        email,
        address,
        numberOfStudents,
        response,
        datetime
      });
      setMessage('Information added successfully');

      // Clear the form fields
      setSalesPersonName('');
      setInstitutionName('');
      setContactPerson('');
      setPhoneNumber('');
      setEmail('');
      setAddress({ city: '', state: '' });
      setNumberOfStudents('');
      setResponse('');
      setDateTime('');
    } catch (error) {
      setMessage('Error adding information');
      console.error('Error:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <div className="form-header">
          <h1>Update Institution Information</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Sales Person Name:</label>
          <input
            type="text"
            value={salesPersonName}
            onChange={(e) => setSalesPersonName(e.target.value)}
            required
          />

          <label>Institution Name:</label>
          <input
            type="text"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            required
          />

          <label>Contact Person:</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />

          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label>Email ID:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>City:</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />

          <label>State:</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
          />

          <label>Number of Students:</label>
          <input
            type="number"
            value={numberOfStudents}
            onChange={(e) => setNumberOfStudents(e.target.value)}
            required
          />

          <label>Response:</label>
          <select
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="follow up">Follow Up</option>
          </select>

          <label>Date & Time:</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
      <div className="message-container">
        <h1>Hey! You Have done Great Work Today Keep it up! Kindly Fill the form</h1>
        <img src='https://stories.freepiklabs.com/api/vectors/marketing/bro/render?color=5CC6D0FF&background=complete&hide=' alt="Logo" className="motivational-image" />
      </div>


    </div>
  );
};

export default InstitutionForm;
