const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    Companyname:{
        type:String,
        required:true
    },
    Logo:{
        type:String,
        required:false
    },
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
    },
    Requirements: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    No_Of_Positions: {
        type: Number,
        required: true,
    }
   
});

const adminjobform = mongoose.model('adminjobform', CompanySchema);
module.exports = adminjobform;