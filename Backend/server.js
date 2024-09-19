const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;
// const JWT_SECRET = 'Visys@1234$';

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'dev@123',
  port: 5432,
});

app.post('/api/institutions', async (req, res) => {
  const {
      institutionName,
      contactPerson,
      phoneNumber,
      email,
      city,
      state,
      numberOfStudents,
      response,
      datetime
  } = req.body;

  try {
      await pool.query(
          'INSERT INTO institutions (institution_name, contact_person, phone_number, email, city, state, number_of_students,response, datetime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [institutionName, contactPerson, phoneNumber, email, city, state, numberOfStudents,response, datetime]
      );
      res.send('Institution data submitted');
  } catch (err) {
      console.error('Error submitting institution data:', err);
      res.status(500).send('Error submitting institution data');
  }
});

// Endpoint to retrieve institutions
app.get('/api/institutions', async (req, res) => {
  const { searchField, searchValue } = req.query;

  if (!searchField || !searchValue) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['institution_name', 'contact_person', 'phone_number', 'email', 'city', 'state', 'number_of_students', 'response', 'datetime'];
    if (!validFields.includes(searchField)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM institutions WHERE ${searchField} ILIKE $1`;
    const result = await pool.query(query, [`%${searchValue}%`]);

    if (result.rows.length === 0) {
      res.status(404).send('No matching records found.');
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});

// Endpoint to insert new server data
app.post('/api/servers', async (req, res) => {
    const { serverId, serverName, active, studentName, studentEmail } = req.body;

    // Validate input data
    if (!serverId || !serverName) {
        return res.status(400).send('Server ID and Server Name are required.');
    }

    try {
        // Insert new server data into the database
        await pool.query(
            'INSERT INTO servers (server_id, server_name, active, student_name, student_email) VALUES ($1, $2, $3, $4, $5)',
            [serverId, serverName, active, studentName, studentEmail]
        );
        res.send('Server data inserted successfully');
    } catch (err) {
        console.error('Error inserting server data:', err);
        res.status(500).send('Error inserting server data');
    }
});

// Server Retrieve endpoint
app.get('/api/servers/:serverId', async (req, res) => {
    const { serverId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM servers WHERE server_id = $1', [serverId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Server not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error retrieving server data:', err);
        res.status(500).send('Error retrieving server data');
    }
});



// User login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: 'User not found.' });
    }

    const user = result.rows[0];
    
    // Check if password matches (plain text comparison)
    if (user.password === password) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid password.' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});


app.post('/api/business-opportunity', async (req, res) => {
  const {
    personName,
    email,
    phoneNumber,
    address,
    agreedIncentive,
    leadsGenerated,
    totalIncentiveOnDate,
    totalIncentiveSoFar,
  } = req.body;

  try {
    await pool.query(
      'INSERT INTO business_opportunity (person_name, email, phone_number, address, agreed_incentive, leads_generated, total_incentive_on_date, total_incentive_so_far) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [personName, email, phoneNumber, address, agreedIncentive, leadsGenerated, totalIncentiveOnDate, totalIncentiveSoFar]
    );
    res.send('Business opportunity data submitted successfully');
  } catch (err) {
    console.error('Error submitting business opportunity data:', err);
    res.status(500).send('Error submitting business opportunity data');
  }
});





// Endpoint to retrieve business opportunities with search functionality
app.get('/api/business-opportunities', async (req, res) => {
  const { searchField, searchValue } = req.query;

  if (!searchField) {
    return res.status(400).send('Search field is required.');
  }

  // Validate search field
  const validFields = ['person_name', 'email', 'phone_number', 'address', 'agreed_incentive', 'leads_generated', 'total_incentive_on_date', 'total_incentive_so_far'];
  if (!validFields.includes(searchField)) {
    return res.status(400).send('Invalid search field.');
  }

  try {
    // Build the query
    let query = `SELECT * FROM business_opportunity`;
    let queryParams = [];

    if (searchValue) {
      query += ` WHERE ${searchField} ILIKE $1`;
      queryParams.push(`%${searchValue}%`);
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      res.status(404).send('No matching records found.');
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
