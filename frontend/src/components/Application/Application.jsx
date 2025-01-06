import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import Assessment from "./assessment"; // Import the Assessment component

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(""); // Score state
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  
  // State to hold submitted form data
  const [submittedData, setSubmittedData] = useState(null);

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("title", title);
    formData.append("score", score);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    formData.append("status", "false");

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Store submitted data in state
      setSubmittedData({
        name,
        email,
        phone,
        address,
        title,
        score,
        status,
        coverLetter,
        resume: resume.name, // Just the file name
      });

      // Reset form fields
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      setTitle("");
      setStatus(false);
      setScore(""); // Reset score after submission
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  const handleAssessmentCompletion = (score) => {
    setScore(score); // Update the score from the assessment
    setAssessmentCompleted(true);
    setAssessmentStarted(false); // Hide the assessment after completion
  };

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        {!assessmentStarted && !submittedData && (
          <>
            {/* Form Fields */}
            <form onSubmit={handleApplication}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter The Job Position You Are Interested In."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Cover Letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div>
                <label
                  style={{
                    textAlign: "start",
                    display: "block",
                    fontSize: "20px",
                  }}
                >
                  Select Resume
                </label>
                <input
                  type="file"
                  accept=".pdf, .jpg, .png, .pdf"
                  onChange={handleFileChange}
                  style={{ width: "100%" }}
                />
              </div>

              {/* Assessment Button */}
              <button
                type="button"
                onClick={() => setAssessmentStarted(true)}
                disabled={assessmentCompleted}
              >
                Take Assessment
              </button>

              {/* Submit Button */}
              <button type="submit" disabled={!assessmentCompleted}>
                Send Application
              </button>
            </form>
          </>
        )}

        {/* Render the Assessment component when the assessment is started */}
        {assessmentStarted && (
          <Assessment onComplete={handleAssessmentCompletion} />
        )}

        {/* Display Submitted Data */}
        {submittedData && (
          <div className="submitted-data">
            <h3>Form Submitted Successfully!</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Phone:</strong> {submittedData.phone}</p>
            <p><strong>Address:</strong> {submittedData.address}</p>
            <p><strong>Job Title:</strong> {submittedData.title}</p>
            <p><strong>Score:</strong> {submittedData.score}</p>
            <p><strong>Cover Letter:</strong> {submittedData.coverLetter}</p>
            <p><strong>Resume:</strong> {submittedData.resume}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Application;
