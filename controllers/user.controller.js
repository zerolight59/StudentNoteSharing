require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json())



const { User } = require('../models/students.model');

const loginStudent = async (req, res) => {
    try {
      const { email, password } = req.body; 
      const loginuser = await User.findOne({ email: email});
      if (!loginuser) {
        return res.status(404).json({ message: 'User not found' });
      }
      try {
        if(await bcrypt.compare(req.body.password,loginuser.password)){
          const userEmail = {email:email}
          const accessToken = jwt.sign(userEmail,process.env.ACCESS_TOKEN_SECRET)
          res.json({accessToken:accessToken})
          // res.send('Success')
          console.log("access jwt tocken created");
          
        }else{
          res.send('Not Allowed')
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


const signstudent = async (req,res)=>{
  try {
    const salt= await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedPassword;
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error){
    res.send(500).json({message:error.message})
}
}

function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus($401)
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,userEmail)=>{
    if (err) {
      return res.sendStatus(403)
    }
    req.userEmail=userEmail
    next()
  })
}


module.exports={
    loginStudent,
    signstudent,
    authenticateToken
}