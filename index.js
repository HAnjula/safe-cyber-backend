const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./Routes/UserRoutes');
const PasswordRouter = require('./Routes/PasswordRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb+srv://anjula:1234@cluster0.2fffkci.mongodb.net/safe-cyber?retryWrites=true&w=majority&appName=Cluster0';
const port = 3000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`API up & running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/password', PasswordRouter);
