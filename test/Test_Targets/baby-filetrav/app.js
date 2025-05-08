const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 4000;

app.get('/file', (req, res) => {
    if(!req.query.path) {
        return res.send("No query!");
    }
    const userPath = req.query.path;

    const fullPath = path.join(__dirname, userPath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.type('text/plain').send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});
