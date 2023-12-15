import React, { useState } from 'react';
import classes from './MedicalHistoryComponent.module.css';
import Card from '../ui/Card';


const dummyMedicalHistory = [
    {
        id: 'visit-1',
        eventName: 'General Checkup',
        eventType: 'Routine Check',
        description: 'Annual physical examination',
        medicalRecord: 'Record #001',
        conductedBy: 'Dr. Jane Smith',
        status: 'Completed',
        statusColor: 'green', // You can also use specific color codes here
        dateTime: '01/15/2023 10:00 AM'
    },
    {
        id: 'visit-2',
        eventName: 'Dermatology Consultation',
        eventType: 'Specialist Consult',
        description: 'Consultation about skin rash',
        medicalRecord: 'Record #002',
        conductedBy: 'Dr. John Doe',
        status: 'In Progress',
        statusColor: 'orange',
        dateTime: '03/12/2023 02:30 PM'
    },
    // ...more entries
];

const MedicalHistoryComponent = () => {
    const [medicalHistory, setMedicalHistory] = useState(dummyMedicalHistory);

    // Later replace the useState with data fetched from the backend
    // useEffect(() => {
    //   fetchMedicalHistory().then(data => {
    //     setMedicalHistory(data);
    //   });
    // }, []);
    // BACKEND LINK: 
    return (
        <div className={classes.medicalHistory}>
            <h2>Medical History</h2>
            {medicalHistory.map((visit) => (
                <Card>
                    <div key={visit.id} className={classes.visitEntry}>
                        <h3>{visit.eventName}</h3>
                        <p><strong>Type:</strong> {visit.eventType}</p>
                        <p><strong>Description:</strong> {visit.description}</p>
                        <p><strong>Record:</strong> {visit.medicalRecord}</p>
                        <p><strong>Conducted by:</strong> {visit.conductedBy}</p>
                        <p style={{ color: visit.statusColor }}>
                            <strong>Status:</strong> {visit.status}
                        </p>
                        <p><strong>Date:</strong> {visit.dateTime}</p>
                    </div>
                </Card>
            ))}

        </div>
    );
};

export default MedicalHistoryComponent;
