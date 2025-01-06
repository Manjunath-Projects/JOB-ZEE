import Applicant from '../models/Applicant.js';
import Employer from '../models/Employer.js';

// Add an applicant
export const addApplicant = async (req, res) => {
    try {
        const newApplicant = new Applicant(req.body);
        await newApplicant.save();
        res.status(201).json(newApplicant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an applicant
export const deleteApplicant = async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndDelete(req.params.id);
        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }
        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add an employer
export const addEmployer = async (req, res) => {
    try {
        const newEmployer = new Employer(req.body);
        await newEmployer.save();
        res.status(201).json(newEmployer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an employer
export const deleteEmployer = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndDelete(req.params.id);
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }
        res.status(200).json(employer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
