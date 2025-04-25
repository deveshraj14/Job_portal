const adminjobform = require('../models/createJobForm');
const Userapplication = require('../models/userjobform'); 
const multer = require('multer');
// Create a new job form

const storage=multer.memoryStorage();
const upload=multer({storage:storage});
const createJobForm = async (req, res) => {
    const { Title, Description, Location, job_title, Requirements, experience, No_Of_Positions, Companyname } = req.body;
    const pic64 = req.file ? req.file.buffer.toString("base64") : null;

    try {
        const jobform = new adminjobform({
            Companyname,
            Logo: pic64,
            Title,
            Description,
            Location,
            job_title,
            Requirements,
            experience,
            No_Of_Positions,
            

        });

        await jobform.save();
        res.status(201).json({ message: 'Job form created successfully', jobform });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create job form', details: err.message });
    }
};

// Get all job forms
const getAllJobForms = async (req, res) => {
    try {
        const jobforms = await adminjobform.find();
        res.status(200).json(jobforms);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch job forms', details: err.message });
    }
};

// Delete a job form
const deleteJobForm = async (req, res) => {
    const { id } = req.params;

    try {
        await adminjobform.findByIdAndDelete(id);
        res.status(200).json({ message: 'Job form deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete job form', details: err.message });
    }
};

const findbyids=async(req,res)=>{
    try {
        const job = await adminjobform.findById(req.params.id);
        res.json(job);
      } catch (error) {
        res.status(500).send("Job not found");
      }
    }

const applyjobforms=async(req,res)=>{
    const{
        fullname,
            email,
            companyName,
            phone,
            position,
            linkedin,
            portfolio,
            coverletter     
    }=req.body;
    try {
        const jobform = new Userapplication({
            fullname,
            email,
            companyName,
            phone,
            position,
            linkedin,
            portfolio,
            coverletter           
        });
        await jobform.save();
        res.status(201).json({ message: 'Job form created successfully', jobform });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create job form', details: err.message });
    }
}

const getuserjobform = async (req, res) => {
    try {
      const { email } = req.params;
      const jobforms = await Userapplication.find({ email });
      res.status(200).json(jobforms);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch job forms', details: err.message });
    }
  };
  
  const deleteuserjobfom=async(req,resp)=>{
    try
    {
        const deleteuserform=await Userapplication.findByIdAndDelete(req.params.id);
        resp.status(200).json({ message: 'Job form deleted successfully', deleteuserform });
    }
    catch(err)
    {
        resp.status(500).json({ error: 'Failed to delete job form', details: err.message });
    }
  }

  const getuserapplicants = async (req, res) => {
    try {
        const { Companyname } = req.params;
      const jobforms = await Userapplication.find({ companyName: new RegExp(`^${Companyname}$`, 'i') });
      res.status(200).json(jobforms);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch job forms', details: err.message });
    }
  }
  const getAllJobFormsbycompanyname = async (req, res) => {
    try {
      const { Companyname } = req.params;
      const jobforms = await adminjobform.find({
        Companyname: new RegExp(`^${Companyname}$`, 'i')});
      res.status(200).json(jobforms);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch job forms', details: err.message });
    }
  }
  const deleterecruiterjobfom=async(req,resp)=>{
    try
    {
        const deleteuserform=await adminjobform.findByIdAndDelete(req.params.id);
        resp.status(200).json({ message: 'Job form deleted successfully', deleteuserform });
    }
    catch(err)
    {
        resp.status(500).json({ error: 'Failed to delete job form', details: err.message });
    }
  }
module.exports = { createJobForm, getAllJobForms, deleteJobForm,findbyids,applyjobforms,getuserjobform,deleteuserjobfom,getuserapplicants,getAllJobFormsbycompanyname,deleterecruiterjobfom };
