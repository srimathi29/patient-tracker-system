import React, { useState, useEffect } from 'react';
import classes from './ScheduleAppointmentComponent.module.css'; // Make sure to create and import the corresponding CSS module
import ReactSelect from 'react-select';
import config from '../../config.json'

function ScheduleAppointmentPatientComponent(props) {
    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would handle the form submission, e.g., sending data to a server
        console.log("Form submitted");
    };
    // const doctorOptions = [
    //     { value: 'doctor1', label: 'Doctor 1' },
    //     { value: 'doctor2', label: 'Doctor 2' },
    //     // Add more options here
    // ];
    const [doctorOptions, setDoctorOptions] = useState([]);

    useEffect(() => {
        // Function to fetch doctors
        const fetchDoctors = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "session=YOUR_SESSION_COOKIE"); // Replace with actual session cookie

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`http://${config.ipAddress}:${config.port}/doctors`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // Assuming the response data is an array of doctors
                    const doctorOptions = data.data.map(doctor => ({
                        value: doctor.doctor_id, // Replace 'id' with actual doctor ID field
                        label: doctor.full_name // Replace 'name' with actual doctor name field
                    }));
                    setDoctorOptions(doctorOptions);
                    console.log(doctorOptions);
                })
                .catch(error => console.log('error', error));
        };

        fetchDoctors();
    }, []);
    return (
        <div className={classes.scheduleAppointment}>
            <h1>Schedule Appointment</h1>
            <form onSubmit={handleSubmit}>

                <div className={classes.formControl}>
                    <label htmlFor="reason">Reason of appointment</label>
                    <input type="text" id="reason" name="reason" required />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="doctorName">Doctor Name</label>
                    <ReactSelect
                        options={doctorOptions}
                        id="doctorName"
                        name="doctorName"
                        className={classes.reactSelect} // You can define custom styles
                    />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" required />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" name="time" required />
                    {/* <button className={classes.tooltip}>Tooltip</button> */}
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" rows="5" required></textarea>
                </div>

                <div className={classes.formActions}>
                    <button type="submit">Submit</button>
                </div>

            </form>
        </div>
    );
}

export default ScheduleAppointmentPatientComponent;
