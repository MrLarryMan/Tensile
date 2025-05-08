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

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection established.');
    await sequelize.sync();
    console.log('✅ Models synchronized.');
  } catch (err) {
    console.error('❌ Initialization failed:', err);
  }
})();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});