const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://pranavbedi6:FMpPvAy7UPqviTVu@cluster0.jnfhebk.mongodb.net/courses', {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(3002, () => console.log('Server running on port 3002'));
