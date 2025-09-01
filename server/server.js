const express = require('express');
const cors = require('cors');
const Database = require('./config/db');
const user = require('./routes/userRoutes');
const task = require('./routes/taskRoutes');
const report = require('./routes/reportRoutes');
const timeEntries = require('./routes/timeEntriesRoutes');
require('dotenv').config();

const app = express();

Database();

app.use(express.json());
app.use(cors());

app.use('/api/user' , user);
app.use('/api/' , task);
app.use('/api/' , timeEntries);
app.use('/api/' , report );

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`Server start listing on Port --> ${port}`);
})
