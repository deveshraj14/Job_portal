const express = require('express');
const { createJobForm, getAllJobForms, deleteJobForm,findbyids , applyjobforms,getuserjobform,deleteuserjobfom,getuserapplicants,getAllJobFormsbycompanyname,deleterecruiterjobfom} = require ('../controllers/adminControllers.js');
const { Login,Signup,verifyToken,allowRoles} = require ('../controllers/authControllers.js');
const router = express.Router();
const multer = require("multer");
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
router.post('/createjobForm',upload.single('Logo'), createJobForm);
router.get('/getAllJobForms', getAllJobForms);
router.get('/getAllJobFormscompanyname/:Companyname', getAllJobFormsbycompanyname);
router.post('/login', Login);
router.post('/signup',upload.single('profilepic'), Signup);
router.get('/findbyids/:id',findbyids);
router.post('/applyjobs',applyjobforms);
router.get('/getuserjobform/:email',getuserjobform);
router.get('/viewapplicants/:Companyname',getuserapplicants);
router.delete('/deleteuserjobform/:id',deleteuserjobfom);
router.delete('/deleteapplicationjobform/:id',deleterecruiterjobfom);
module.exports=router;





