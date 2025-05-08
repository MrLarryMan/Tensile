const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 4000;

// ❌ Directory that should be restricted
const SAFE_DIR = path.join(__dirname, 'public');

app.get('/download', (req, res) => {
    const userPath = req.query.path;

    const fullPath = path.join(SAFE_DIR, userPath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.type('text/plain').send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Path traversal demo running at http://localhost:${PORT}`);
});
