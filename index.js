const express = require('express');
const mongoose = require('mongoose');
const UserRouter=require('./Routes/UserRoutes');
const PasswordRouter = require('./Routes/PasswordRoutes');
const bodyparser=require('body-parser');
require('dotenv').config();
const cors=require("cors");


const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());

const port=process.env.SERVER_PORT;

mongoose.connect('mongodb://127.0.0.1:27017/backend')   //
    .then(() => {
        app.listen(port, () => {
            console.log(`API up & running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use('/api/v1/user',UserRouter);
app.use('/api/v1/password', PasswordRouter);