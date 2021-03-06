const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');
const authRoute = require('./route/authRoute');

require('dotenv').config()
require('./server');

app.use(express.json());
app.use(express.urlencoded());

app.use('/auth/', authRoute)
app.use('/user/', userRoute);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('====================================');
    console.log('Connect with port', port);
    console.log('====================================');
})