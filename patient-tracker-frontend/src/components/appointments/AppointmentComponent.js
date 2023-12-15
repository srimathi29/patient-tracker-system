import AppointmentList from "./AppointmentList";
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'; // Assuming you have react-select installed
import config from '../../config.json';
import AuthContext from '../../store/auth-context';

function AppointmentComponent(props) {
    // State for appointments, in a real app you might fetch this from a backend
    const [appointments, setAppointments] = useState([
        {
            id: 'a1',
            title: 'Dental Checkup',
            patientName: 'John Doe',
            doctorName: 'Dr. Megha',
            dateTime: '2023-04-21 14:00',
        },
        {
            id: 'a2',
            title: 'Regular Checkup',
            patientName: 'Jane Smith',
            doctorName: 'Dr. Megha',
            dateTime: '2023-04-22 09:30',
        },
        // ... more appointments
    ]);
    // BACKEND CALL: fetch appointments from backend
// Replace with your actual appointments and patients data
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

    return (
        <div>
            <AppointmentList appointments={appointments} todayAppointments={todayAppointments} upcomingAppointments={upcomingAppointments} />

        </div>
    );
}

export default AppointmentComponent;