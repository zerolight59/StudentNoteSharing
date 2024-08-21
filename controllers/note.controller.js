const { Note, User } = require("../models/students.model");



const UplodeNote = async (req,res)=>{
    try {
        const loginUserEmail = req.userEmail.email;
        const loginUser = await User.findOne({ email: loginUserEmail})
        if (!loginUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.body.author=loginUser._id;
        const note = await Note.create(req.body)
        res.json(note)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const ViewNote = async (req,res)=>{
    try {
        const loginUserEmail = req.userEmail.email;
        let visible = req.body.visibility
        let data
        if (visible === 'batch') {
            const loginUser = await User.findOne({ email: loginUserEmail})
            if (!loginUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            visible=loginUser.batch;
            data = await Note.find({'batch':visible})
        }
        else{
            data = await Note.find({'visibility':visible})
        }
        
        if (!data) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.send(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports={
    UplodeNote,
    ViewNote
}