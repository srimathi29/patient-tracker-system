import classes from './HomeComponent.module.css';
import AppointmentList from '../appointments/AppointmentList';
import AuthContext from '../../store/auth-context';
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'; // Assuming you have react-select installed
import config from '../../config.json';

function HomeComponent(props) {
  // Replace with your actual appointments and patients data
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]); // To store doctor options
  const [patientOptions, setPatientOptions] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);

  const authCtx = React.useContext(AuthContext);
 
    useEffect(() => {
        // Function to fetch appointments
        const fetchAppointments = (date) => {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            // Replace this cookie value with the actual session cookie from authentication
            myHeaders.append("Cookie", "session=YOUR_SESSION_COOKIE");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            // Use the date parameter to fetch either today's appointments or all appointments
            const baseUrl = `http://${config.ipAddress}:${config.port}/doctors/${authCtx.user.roleId}/appointments`;
            const url = date ? `${baseUrl}?date=${date}` : baseUrl;

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                  const appointments = result.data.appointments; // Adjust this according to the actual result structure
                    const now = new Date();
                    const today = now.toISOString().split('T')[0];
                    console.log("appointment page: today " + today);
                    console.log(appointments);
                    // Filter today's appointments
                    const todayAppointments = appointments.filter(a => a.date === today);

                    // Filter upcoming appointments
                    const upcomingAppointments = appointments.filter(a => {
                        const appointmentDate = new Date(`${a.date} ${a.end_time}`);
                        return appointmentDate > now && a.date !== today;
                    });

                    setTodaysAppointments(todayAppointments);
                    setUpcomingAppointments(upcomingAppointments);
                })
                .catch(error => console.log('error', error));
        };

        // Fetch today's appointments
        const today = new Date().toISOString().split('T')[0];
        fetchAppointments(today);
        // Fetch all upcoming appointments
        fetchAppointments();
        // Fetch doctors and store them in doctorOptions
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
        const fetchPatientsFromBackend = async () => {
            try {
              const myHeaders = new Headers();
              myHeaders.append("Cookie", `session=${authCtx.session}`);
              const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
              };
              const response = await fetch(`http://${config.ipAddress}:${config.port}/patients`, requestOptions);
              console.log(`http://${config.ipAddress}:${config.port}/patients`);
              if (!response.ok) {
                throw new Error('Failed to fetch patients');
              }
      
              const data = await response.json();
              console.log(data);
              const patientOptions = data.data.patients.map(patient => ({
                value: patient.id,
                label: patient.full_name
            }));
              setPatientOptions(patientOptions);
            } catch (error) {
              console.error('Error fetching patients:', error);
            }
          };

        fetchDoctors();
        fetchPatientsFromBackend();
    }, [authCtx.session]);


  // Function to handle filter changes
  const handleFilterChange = (selectedOption) => {
    // Apply filter logic
    console.log("todayappointments" + todayAppointments);
    console.log("upcomingappointments" + upcomingAppointments);
    console.log("selected option " + selectedOption.value);
    const filteredToday = todayAppointments.filter(appointment => appointment.patient_id === selectedOption.value);
    const filteredUpcoming = upcomingAppointments.filter(appointment => appointment.patient_id === selectedOption.value);
    setTodaysAppointments(filteredToday);
    setUpcomingAppointments(filteredUpcoming);
  };


  // Options for React Select
  const selectOptions = appointments.map(appointment => ({ value: appointment.patientName, label: appointment.patientName }));

  return (
    <div>
        {authCtx.user && (
      <div className={classes.doctorInfo}>
        <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
        <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
      </div>
    )}

    <div className={classes.homePageContainer}>
      <div className={classes.appointmentsSection}>
        <AppointmentList appointments={filteredAppointments} todayAppointments={todayAppointments} upcomingAppointments={upcomingAppointments} />
      </div>
      <div className={classes.searchSection}>
        {/* React Select for filtering */}
        <h3>Filter by Patient</h3>
        <Select options={patientOptions} onChange={handleFilterChange} />
      </div>
    </div>
    </div>
  );
}

export default HomeComponent;
