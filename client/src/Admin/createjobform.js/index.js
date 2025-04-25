import React, { useState } from 'react';
import axios from 'axios';

function Index() {
  const [firstpageform, setfirstpageform] = useState({
    Companyname: "",
    Logo: "",
    Title: "",
    Description: "",
    Location: "",
    job_title: "",
    Requirements: "",
    experience: "",
    No_Of_Positions: "",
  });

  const [step, setStep] = useState(1); // 👈 to control which part is shown

  const handleContinue = (e) => {
    e.preventDefault();
    if (!firstpageform.Companyname || !firstpageform.Logo) {
      alert("Please fill Company Name and upload Logo.");
      return;
    }
    setStep(2); // Move to second step
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate second step
    const {
      Title,
      Description,
      Location,
      job_title,
      Requirements,
      experience,
      No_Of_Positions
    } = firstpageform;

    if (
      !Title ||
      !Description ||
      !Location ||
      !job_title ||
      !Requirements ||
      !experience ||
      !No_Of_Positions
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Companyname", firstpageform.Companyname);
      formData.append("Logo", firstpageform.Logo);
      formData.append("Title", Title);
      formData.append("Description", Description);
      formData.append("Location", Location);
      formData.append("job_title", job_title);
      formData.append("Requirements", Requirements);
      formData.append("experience", experience);
      formData.append("No_Of_Positions", No_Of_Positions);

      const response = await axios.post('http://localhost:5000/api/createJobForm', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("Job Posted Successfully!");

      // Reset form
      setfirstpageform({
        Companyname: "",
        Logo: "",
        Title: "",
        Description: "",
        Location: "",
        job_title: "",
        Requirements: "",
        experience: "",
        No_Of_Positions: "",
      });

      setStep(1); // reset to step 1
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={step === 1 ? handleContinue : handleSubmit} className="min-h-screen flex justify-center">
      {step === 1 && (
        <div className="flex justify-center w-full min-h-screen">
          <div className="p-6">
            <h1 className="font-bold text-3xl mb-4">Your Company Name</h1>
            <h5 className="font-semibold mb-4">
              What would you like to name your company? You can change it later.
            </h5>
            <h4 className="font-bold mb-2 mt-10">Company Name</h4>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Company name"
                className="w-[800px] p-2 border rounded-md border-black"
                value={firstpageform.Companyname}
                onChange={(e) =>
                  setfirstpageform({ ...firstpageform, Companyname: e.target.value })
                }
              />
            </div>
            <h4 className="font-bold mb-2 mt-10">Logo</h4>
            <div className="flex justify-center">
              <input
                type="file"
                className="w-[800px] p-2 border rounded-md border-black"
                accept="image/*"
                onChange={(e) =>
                  setfirstpageform({ ...firstpageform, Logo: e.target.files[0] })
                }
              />
            </div>
            <div className="flex mt-4">
              <button className="bg-blue-300 p-2 rounded-lg">Continue</button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex justify-center w-full min-h-screen">
          <div className="w-[50vw] p-6 border rounded-md shadow-lg bg-white h-[400px] mt-3">
            <div className="flex">
              <div className="w-1/2 flex flex-col gap-4 mr-2">
                <div>
                  <h3 className="font-bold">Title</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.Title}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, Title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <h3 className="font-bold">Description</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.Description}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, Description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <h3 className="font-bold">Location</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.Location}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, Location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <h3 className="font-bold">No Of Positions</h3>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.No_Of_Positions}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, No_Of_Positions: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold">Qualification</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.job_title}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, job_title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <h3 className="font-bold">Experience</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.experience}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, experience: e.target.value })
                    }
                  />
                </div>
                <div>
                  <h3 className="font-bold">Requirement</h3>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md border-black hover:bg-blue-100"
                    value={firstpageform.Requirements}
                    onChange={(e) =>
                      setfirstpageform({ ...firstpageform, Requirements: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Post new job
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default Index;
