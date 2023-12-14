import React, { useState, useEffect } from 'react';
import classes from './PatientDetailsPage.module.css';
import AuthContext, { AuthContextProvider }   from '../store/auth-context';
import PatientProfile from '../components/doctor/PatientProfile';
import DiagnosisForm from '../components/doctor/DiagnosisForm';


function PatientDetailsPage(props) {
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const authCtx = React.useContext(AuthContext);

    // Array of dummy patient data
    const dummyPatientData = [
        { 
            id: 1, 
            name: 'John Doe', 
            age: 30, 
            gender: 'male', 
            phone: '4131434232', 
            history: 'History of allergies.', 
            history_diagnosis: [
                {
                    id: 101,
                    timestamp: '2022-12-01T10:00:00.000Z',
                    doctorName: 'Dr. Smith',
                    diagnosis: 'Seasonal allergies',
                    result: 'Mild allergic reactions to pollen'
                },
                {
                    id: 102,
                    timestamp: '2023-01-15T15:30:00.000Z',
                    doctorName: 'Dr. Johnson',
                    diagnosis: 'Food allergy',
                    result: 'Allergic to peanuts'
                }
            ],
            history_prescriptions: [
                {
                    id: 201,
                    timestamp: '2022-12-01T11:00:00.000Z',
                    doctorName: 'Dr. Smith',
                    prescriptions: [
                        { name: 'Cetirizine', dosage: '10mg', duration: '30 days' },
                        { name: 'Nasal spray', dosage: 'As needed', duration: '60 days' }
                    ],
                    description: 'Medication for managing seasonal allergy symptoms'
                },
                {
                    id: 202,
                    timestamp: '2023-01-16T16:00:00.000Z',
                    doctorName: 'Dr. Johnson',
                    prescriptions: [
                        { name: 'Epinephrine', dosage: '0.3mg', duration: 'Use in case of allergic reaction' }
                    ],
                    description: 'Emergency medication for peanut allergy'
                }
            ]
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            age: 25, 
            gender: 'female', 
            phone: '4123445566', 
            history: 'No significant medical history.', 
            history_diagnosis: [
                {
                    id: 103,
                    timestamp: '2023-02-20T14:20:00.000Z',
                    doctorName: 'Dr. Williams',
                    diagnosis: 'Routine Check-up',
                    result: 'Good overall health'
                }
            ],
            history_prescriptions: [
                {
                    id: 203,
                    timestamp: '2023-02-20T15:00:00.000Z',
                    doctorName: 'Dr. Williams',
                    prescriptions: [
                        { name: 'Multivitamins', dosage: 'Once daily', duration: '90 days' }
                    ],
                    description: 'General wellness and preventive care'
                }
            ]
        },
        { 
            id: 3, 
            name: 'Emma Jones', 
            age: 40, 
            gender: 'female', 
            phone: '4155667788', 
            history: 'Diabetic patient.', 
            history_diagnosis: [
                {
                    id: 104,
                    timestamp: '2023-03-10T09:00:00.000Z',
                    doctorName: 'Dr. Brown',
                    diagnosis: 'Type 2 Diabetes',
                    result: 'Stable condition with medication'
                }
            ],
            history_prescriptions: [
                {
                    id: 204,
                    timestamp: '2023-03-10T10:00:00.000Z',
                    doctorName: 'Dr. Brown',
                    prescriptions: [
                        { name: 'Metformin', dosage: '500mg', duration: 'Continuous' },
                        { name: 'Insulin', dosage: 'As prescribed', duration: 'As needed' }
                    ],
                    description: 'Medication for managing diabetes'
                }
            ]
        }
        // Add more patients as needed
    ];

    // Simulate an API call to fetch patient details
    useEffect(() => {
        const fetchPatientDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Simulate an API call
                const response = await fetch(`/api/patients/${props.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch patient details.');
                }
                const data = await response.json();
                setPatient(data);
            } catch (err) {
                setError(err.message);
            }

            setIsLoading(false);
        };

        // fetchPatientDetails();
        // BACKEND CALL: fetch patient details from backend
        const patientData = dummyPatientData.find(p => p.id === parseInt(props.id));
        setPatient(patientData);
    }, [props.id]);
    const patientData = dummyPatientData.find(p => p.id === parseInt(props.id));

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!patient) {
        return <p>No patient data found.</p>;
    }

    return (
        // <div className={classes.patientDetails}>
        //     <h3>Patient Details</h3>
        //     <h2>{patient.name}</h2>
        //     {/* Add more detailed fields here */}
        //     <p>Age: {patient.age}</p>
        //     <p>Medical History: {patient.history}</p>
        //     {/* Add more patient details as needed */}
        // </div>

        <div>
        {authCtx.user && (
      <div className={classes.doctorInfo}>
        <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
        <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
      </div>
    )}
    

    <div className={classes.PageContainer}>
      <div className={classes.DiagnosisSection}>
        {/* <AppointmentList appointments={appointments} /> */}
        <DiagnosisForm />
      </div>
      <div className={classes.searchSection}>
        {/* <SearchPatient /> */}
        <PatientProfile patient={patientData} />
      </div>
    </div>
    </div>

    );
}

export default PatientDetailsPage;