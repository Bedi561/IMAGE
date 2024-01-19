const mongoose = require("mongoose");
// Define mongoose schemas
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    published: Boolean,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
      },
  });


const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
  
  module.exports = {
    Admin,
    Course
  }