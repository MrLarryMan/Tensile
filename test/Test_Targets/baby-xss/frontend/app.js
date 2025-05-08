const express = require('express');
require('dotenv').config()
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    let name = req.query.name;
    if(!name){
        res.redirect('?name=Hacker');
    }
    res.send(`Hello ${name}!`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
