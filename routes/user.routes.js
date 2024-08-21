const express = require('express');
const { loginStudent, signstudent } = require('../controllers/user.controller.js');
// const { User } = require('..students.model.js');
const studentroutes = express.Router();

studentroutes.post('/signin',signstudent)
studentroutes.post('/login',loginStudent)


module.exports=studentroutes