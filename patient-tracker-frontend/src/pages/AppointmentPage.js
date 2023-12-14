import React, { useState, useEffect } from 'react';
import AppointmentList from '../components/appointments/AppointmentList';

function AppointmentPage(props) {
    // State for appointments, in a real app you might fetch this from a backend
    const [appointments, setAppointments] = useState([
        {
            id: 'a1',
            title: 'Dental Checkup',
            patientName: 'John Doe',
            dateTime: '2023-04-21 14:00',
        },
        {
            id: 'a2',
            title: 'Regular Checkup',
            patientName: 'Jane Smith',
            dateTime: '2023-04-22 09:30',
        },
        // ... more appointments
    ]);

    // Fetch appointments from a backend when the component mounts
    useEffect(() => {
        // Here you would fetch the data from a backend and then set it using setAppointments
        // For this example, we're using static data defined above
    }, []);

    return (
        <div>
            <h1>Appointment Page</h1>
            {/* Render AppointmentList and pass the appointments to it */}
            <AppointmentList appointments={appointments} />
        </div>
    );
}

export default AppointmentPage;
