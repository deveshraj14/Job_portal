const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectdb = async () => {
mongoose.connect('mongodb://127.0.0.1:27017/jobportal', {
    dbName: 'jobportal',
}) 
    
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
}
module.exports=connectdb;  
