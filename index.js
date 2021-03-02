const express = require('express');
const app = express();

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello world');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('====================================');
    console.log('Connect with port ', port);
    console.log('====================================');
})