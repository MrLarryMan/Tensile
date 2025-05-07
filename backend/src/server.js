const express = require('express');
const path = require('path');
const jobRoutes = require('../routes/jobRoutes');
const savedJobRoutes = require('../routes/savedJobRoutes');
const analyticsRoutes = require('../routes/analyticsRoutes');
const testRoutes = require('../routes/testRoutes');
const sequelize = require('../sequelize');
const { Job, JobResult, Vulnerability } = require('../models');
const sqliteDb = require('../sqlite');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());

// API routes
app.use('/api/jobs', jobRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/tests', testRoutes);



// Serve the frontend
app.use(express.static(path.join(__dirname, '../../frontend')));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/test', (req, res) => {
  console.log('Test route hit');
  sqliteDb.all('SELECT * FROM jobResults', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log(JSON.stringify(rows, null, 2));
      res.json(rows);
    }
  });
});