import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  // Define your schema here
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as needed
});

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;
