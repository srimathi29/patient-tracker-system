import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from './ScheduleAppointmentComponent.module.css';
import ReactSelect from 'react-select';
import config from '../../config.json';
import AuthContext from '../../store/auth-context';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ScheduleAppointmentPatientComponent(props) {
    const reasonRef = useRef();
    const doctorRef = useRef(); // Reference for the selected doctor
    const dateRef = useRef();
    const detailsRef = useRef();
    const doctorVisitRef = useRef();
    const authCtx = useContext(AuthContext);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Cookie", `session=${authCtx.session}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const response = await fetch(`http://${config.ipAddress}:${config.port}/doctors`, requestOptions);
                const data = await response.json();

                const doctorOptions = data.data.map(doctor => ({
                    value: doctor.doctor_id,
                    label: doctor.full_name
                }));
                setDoctorOptions(doctorOptions);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchDoctors();
    }, [authCtx.session]);

    const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `session=${authCtx.session}`);

        const formattedStartTime = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}:00`;
        const formattedEndTime = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}:00`;
        // Check if a doctor is selected before accessing its value
        const doctorId = doctorRef.current ? doctorRef.current.value : null;
        console.log("role id ");
        console.log(authCtx.user.roleId);
        // Check if authCtx.roleId is defined and has a value
        const patientId = authCtx.user.roleId ? authCtx.user.roleId : null;

        var raw = JSON.stringify({
            patient_id: patientId,
            doctor_id: doctorId,
            title: reasonRef.current.value,
            date: dateRef.current ? dateRef.current.value : null,
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            time_slot_start: "09:00:00",
            time_slot_end: "17:00:00",
            notes: detailsRef.current ? detailsRef.current.value : null,
            doctor_visit: doctorVisitRef.current ? doctorVisitRef.current.checked : false
        });
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://${config.ipAddress}:${config.port}/appointments`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                alert("Appointment scheduled successfully");
            })
            .catch(error => {
                console.log('error', error);
                alert("Error scheduling appointment");
            });
    };

    const handleDoctorChange = (selectedOption) => {
        if (doctorRef.current) {
            doctorRef.current.value = selectedOption.value;
        }
    };

    const handleStartTimeChange = (date) => {
        setStartTime(date); // Set start time

        // Calculate and set the end time
        const newEndTime = new Date(date);
        newEndTime.setMinutes(newEndTime.getMinutes() + 30); // Add 30 minutes for end time
        setEndTime(newEndTime);
    };
    const calculateEndTime = () => {
        const newEndTime = new Date(startTime);
        newEndTime.setMinutes(newEndTime.getMinutes() + 30);
        return newEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={classes.scheduleAppointment}>
            <h1>Schedule Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.formControl}>
                    <label htmlFor="reason">Reason of appointment</label>
                    <input type="text" id="reason" name="reason" ref={reasonRef} required />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="doctorName">Doctor Name</label>
                    <ReactSelect
                        options={doctorOptions}
                        id="doctorName"
                        name="doctorName"
                        onChange={handleDoctorChange}
                        className={classes.reactSelect}
                        ref={doctorRef}
                    />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" ref={dateRef} required />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="startTime">Start Time</label>
                    <DatePicker
                        selected={startTime}
                        onChange={handleStartTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="HH:mm"
                        className="custom-time-picker"
                    />
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="endTime">End Time</label>
                    <input
                        type="text"
                        value={calculateEndTime()}
                        readOnly
                        className={classes.readOnlyInput}
                    />
                </div>

                <div className={classes.formControl}>
                    <label>
                        Doctor Visit
                        <input type="checkbox" ref={doctorVisitRef} />
                    </label>
                </div>

                <div className={classes.formControl}>
                    <label htmlFor="details">Details</label>
                    <textarea id="details" name="details" rows="5" ref={detailsRef} required></textarea>
                </div>

                <div className={classes.formActions}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ScheduleAppointmentPatientComponent;
