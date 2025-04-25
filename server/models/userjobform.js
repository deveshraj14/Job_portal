const mongoose = require("mongoose");

const userjobformforjob = new mongoose.Schema({
    
    fullname: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String
        // required: true,
    },
    portfolio: {
        type: String
        // required: true,
    },
    coverletter: {
        type: String
        // required: true,
    }
    
})
const Userapplication= mongoose.model("userjobform", userjobformforjob);  

module.exports=Userapplication
    