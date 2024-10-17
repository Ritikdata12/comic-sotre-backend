const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const comic = require("./routers/comicRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api",comic);

app.use('/' ,(req,res)=>{
    console.log('server is running');
    res.send('server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
