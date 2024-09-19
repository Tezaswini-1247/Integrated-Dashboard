// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm'; // Import LoginForm
import InstitutionForm from './components/InstitutionForm';
import RetrieveForm from './components/RetrieveForm';
import RetrieveServerForm from './RetrieveServerForm';
import UpdateServerForm from './UpdateServerForm';
import BusinessOpportunityForm from './components/BusinessOpportunityForm';
import RetrieveBusinessOpportunity from './components/RetrieveBusinessOpportunity';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {!loggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <NavBar onLogout={handleLogout} />
            <div className="App-content">
              <Routes>
                <Route path="/" element={<InstitutionForm />} />
                <Route path="/update" element={<InstitutionForm />} />
                <Route path="/retrieve" element={<RetrieveForm />} />
                <Route path="/retrieve-server" element={<RetrieveServerForm />} />
                <Route path="/update-server" element={<UpdateServerForm />} />
                <Route path="/business-opportunity" element={<BusinessOpportunityForm />} />
                <Route path="/retrieve-business-opportunity" element={<RetrieveBusinessOpportunity />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
