
const mongoose=require('mongoose');
const Signup=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        required:false
    },
    role: 
    { type: String, 
        enum: ['recruiter', 'user'],
         default: 'user' }, 
        
    createdAt:
     { type: Date, 
        default: Date.now }
   
})                                     
const SignUp=mongoose.model('SignUp',Signup);


module.exports= SignUp   