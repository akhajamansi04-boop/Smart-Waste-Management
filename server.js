
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));

const MessageSchema = new mongoose.Schema({
  name:String,
  email:String,
  message:String,
  createdAt:{type:Date,default:Date.now}
});

const Message = mongoose.model('Message', MessageSchema);

app.post('/contact', async (req,res)=>{
  await Message.create(req.body);
  res.json({success:true});
});

app.get('/messages', async (req,res)=>{
  const data = await Message.find();
  res.json(data);
});

app.listen(5000, ()=>console.log('Server running on 5000'));
