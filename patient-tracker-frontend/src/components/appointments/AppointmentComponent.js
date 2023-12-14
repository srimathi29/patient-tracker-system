import AppointmentList from "./AppointmentList";
import { useState } from "react";

function AppointmentComponent(props) {
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
    // BACKEND CALL: fetch appointments from backend
    
    return(
    <div>
        <AppointmentList appointments={appointments} />

    </div>
    );
}

export default AppointmentComponent;