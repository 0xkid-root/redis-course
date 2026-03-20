const mongoose = require('mongoose');
const express = require('express');
const  userRoutes =  require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


const app = express();

mongoose.connect('mongodb://localhost:27017/redistest')
.then(console.log('connected to mongo'))
.catch(console.error)

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);



app.listen(4002,()=>{
    console.log('listening on port 4002')
});