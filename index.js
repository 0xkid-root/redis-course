const mongoose = require('mongoose');
const express = require('express');



const app = express();

mongoose.connect('mongodb://localhost:27017/redistest')
.then(console.log('connected to mongo'))
.catch(console.error)



app.listen(4002,()=>{
    console.log('listening on port 4002')
});