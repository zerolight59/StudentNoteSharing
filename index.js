const express = require('express')
const mongoose = require('mongoose');
const { User } = require('./models/students.model');
const loginroutes = require('./routes/user.routes');
const { UpdateNoteRoutes } = require('./routes/note.routes');
const app = express()

// middle ware
app.use(express.json())


//routes
app.use('/api/student',loginroutes)
app.use('/api/note',UpdateNoteRoutes)
app.use('app/note',UpdateNoteRoutes)

app.get('/', function (req, res) {
  res.send('Hello World its me all along')
})





mongoose.connect("mongodb+srv://manusankaru10:qyUhqWWp9j2AcugI@cluster0.chxy3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("connneted to MongooDB")
  app.listen(3000,()=>{
    console.log(" Listing to port 3000 ")
  })
})
.catch(()=>{
  console.log("database not connected")
})