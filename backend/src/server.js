const express = require('express');
const path = require('path');
const jobRoutes = require('../routes/jobRoutes');
const savedJobRoutes = require('../routes/savedJobRoutes');
const analyticsRoutes = require('../routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api/jobs', jobRoutes);
app.use('/api/saved-jobs', savedJobRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve the frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



const session = require('express-session');
const fs = require('fs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set secure: true in production with HTTPS
}));

// fake DB -- set up real one later 
const users = JSON.parse(fs.readFileSync('./data/users.json'));

// auth middleware
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('frontend/login.html');
    }
    next();
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    console.log(user, username, password)
    if (user) {
        req.session.user = { username: user.username };
        res.json({ success: true, username: user.username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});

app.get('/api/check-auth', (req, res) => {
    res.json({ authenticated: !!req.session.user, username: req.session.user?.username });
});

// protect routes 
app.get('/api/protected', requireLogin, (req, res) => {
    res.json({ message: 'This is protected data', user: req.session.user });
});
