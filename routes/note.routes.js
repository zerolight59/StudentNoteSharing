const express = require('express');
const { UplodeNote, ViewNote } = require('../controllers/note.controller');
const { authenticateToken } = require('../controllers/user.controller');
const UpdateNoteRoutes = express.Router()

UpdateNoteRoutes.post('/Uplode',authenticateToken,UplodeNote)
UpdateNoteRoutes.get('/view',authenticateToken,ViewNote)


module.exports={
    UpdateNoteRoutes,
}