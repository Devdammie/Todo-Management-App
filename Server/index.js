require('dotenv').config();

const express = require('express') 
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.get('/get', (req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.put('/update/:id', (req, res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) =>{
    const {id} =req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))


})

app.post('/add', (req, res) => {
    const { task } = req.body; // Extract the task from the request body
    TodoModel.create({
        task: task 
    }).then(result => {
        res.json(result); // Send the created todo back as a response
    }).catch(err => {
        console.error('Error creating todo:', err);
        res.status(500).json({ error: 'Failed to create todo' });
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})