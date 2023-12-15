import classes from './AppointmentList.module.css';
import Appointment from './Appointment';


function AppointmentList(props) {
    return (<ul className={classes.list}>
        <h2>Upcoming Appointments</h2>
        {props.appointments.map((appointment) => (
            <Appointment
                id={appointment.id}
                title={appointment.title}
                patientName={appointment.patientName}
                doctorName={appointment.doctorName}
                datetime={appointment.dateTime}
            />
        ))}
    </ul>);

}

export default AppointmentList;