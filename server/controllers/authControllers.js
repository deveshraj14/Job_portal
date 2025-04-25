const authjob=require("../models/signUp");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const multer = require('multer');

const Login=async(req,res)=>{
try{
    const { email, password } = req.body;
    const loginuser=await authjob.findOne({email});
    if(loginuser){
        const isMatch = await bcrypt.compare(password, loginuser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials: wrong password' });
        }
        const token=jwt.sign({id:loginuser._id,email:loginuser.email,role: loginuser.role,name:loginuser.name,profilepic:loginuser.profilepic},process.env.SECRET_KEY,{expiresIn:"1d"});
       return res.status(200).json({ message: 'User logged in successfully', loginuser,token });
    }
    else{
       res.status(404).json({ message: 'User not found' });
    }
}
catch(err){
    res.status(500).json({ error: 'Failed to login user', details: err.message });
}
}
   


const storage=multer.memoryStorage();
const upload=multer({storage:storage});
const Signup= async (req,res)=>{
    try{
        const{name,
            email,
            password,
            profilepic,
            role
        }=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const picbase64 = req.file?req.file.buffer.toString('base64'):null;

const newuser=new authjob(
    {
        name,
        email,
        password : hashedPassword,
        profilepic: picbase64,
        role: role || "user",
    });
    await newuser.save();
    const token=jwt.sign({id:newuser._id,email:newuser.email,role: newuser.role,profilepic:newuser.profilepic},process.env.SECRET_KEY,{expiresIn:"1d"});
    res.status(201).json({ message: 'User created successfully', newuser,token})
    
    console.log("Uploaded File:", req.file);

;
}
catch(err){
    res.status(500).json({ error: 'Failed to create user', details: err.message });
}
}




const verifyToken = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Extract token from header
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // Verify token
      req.user = decodedToken; // Attach user data to request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
   
  };

  const allowRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
      next();
    };
  };
  

module.exports={Login,Signup,verifyToken,allowRoles};