import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicantList = () => {
    const [applications, setApplications] = useState([]); // Store the applications data
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/user/getEmployer", {
                withCredentials: true,
            });
            console.log(response.data); // Debugging
            if (response.data && response.data.users) {
                setApplications(response.data.users);
            } else {
                setError('No users found.');
            }
        } catch (error) {
            console.error('Error fetching applicants:', error);
            setError('Failed to fetch applicants.');
        }
    };

    const deleteApplicant = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/user/deleteUser/${id}`);
            setApplications(applications.filter(applicant => applicant._id !== id)); // Filter out the deleted applicant
        } catch (error) {
            console.error('Error deleting applicant:', error);
            setError('Failed to delete applicant.');
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
            <h2 style={{display:"block" , width:"100%",textAlign:"center"}}>Employers</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {applications.length > 0 ? (
                applications.map(applicant => (
                    <div
                        key={applicant._id}
                        style={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '20px',
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <p><strong>Name:</strong> {applicant.name}</p>
                            <p><strong>Email:</strong> {applicant.email}</p>
                            <p><strong>Phone:</strong> {applicant.phone}</p>
                            <p><strong>Role:</strong> {applicant.role}</p>
                            <p><strong>Id:</strong> {applicant._id}</p>
                        </div>
                        <button
                            onClick={() => deleteApplicant(applicant._id)}
                            style={{
                                backgroundColor: '#ff4d4f',
                                color: 'white',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px',
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p>No applicants found.</p>
            )}
        </div>
    );
};

export default ApplicantList;
