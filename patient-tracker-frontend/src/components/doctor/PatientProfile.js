import React from 'react';
import classes from './PatientProfile.module.css'; // Make sure to create this CSS module

function PatientProfile(props) {
    const { patient } = props;

    if (!patient) {
        return <p>No patient selected.</p>;
    }

    return (
        <div className={classes.patientProfile}>
            <h1>Patient Profile: {patient.name}</h1>
            {/* <p><strong>ID:</strong> {patient.id}</p> */}
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Medical History:</strong> {patient.history}</p>

            <div className={classes.historySection}>
                <h2>Diagnosis History</h2>
                <ul>
                    {patient.history_diagnosis.map(diagnosis => (
                        <li key={diagnosis.id}>
                            <p><strong>Date:</strong> {new Date(diagnosis.timestamp).toLocaleDateString()}</p>
                            <p><strong>Doctor:</strong> {diagnosis.doctorName}</p>
                            <p><strong>Diagnosis:</strong> {diagnosis.diagnosis}</p>
                            <p><strong>Result:</strong> {diagnosis.result}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={classes.prescriptionSection}>
                <h2>Prescription History</h2>
                <ul>
                    {patient.history_prescriptions.map(prescription => (
                        <li key={prescription.id}>
                            <p><strong>Date:</strong> {new Date(prescription.timestamp).toLocaleDateString()}</p>
                            <p><strong>Doctor:</strong> {prescription.doctorName}</p>
                            <p><strong>Prescriptions:</strong> {prescription.prescriptions.map(p => p.name).join(', ')}</p>
                            <p><strong>Description:</strong> {prescription.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PatientProfile;
