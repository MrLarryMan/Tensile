const express = require('express');
const path = require('path');
const jobRoutes = require('../routes/jobRoutes');
const savedJobRoutes = require('../routes/savedJobRoutes');
const sequelize = require('../sequelize');
const Job = require('../models/Job');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api/jobs', jobRoutes);
app.use('/api/saved-jobs', savedJobRoutes);

// Serve the frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});