import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  // Define your schema here
  companyName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as needed
});

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
