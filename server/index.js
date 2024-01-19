const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)


// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect('mongodb+srv://pranavbedi6:FMpPvAy7UPqviTVu@cluster0.jnfhebk.mongodb.net/', {
  dbName: "courses"
});

app.listen(3002, () => console.log('Server running on port 3002'));
