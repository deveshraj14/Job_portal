// const mongoose=require('mongoose');
const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const connectdb=require('./dataBase/connectdb');
const port=process.env.PORT || 8000; 
const routers=require('./Routes/route');
app.use(cors());
app.use(express.json());  

app.use('/api',routers);


connectdb();     
app.listen(port,()=>{  
      
    console.log(`Server is running on port ${port}`);
})