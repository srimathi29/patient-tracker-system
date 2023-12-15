import React, { useState, useEffect } from 'react';
import classes from './PatientsListPage.module.css';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import config from '../config.json';


function PatientsListPage(props) {
  const navigate = useNavigate();
  const searchInputRef = React.useRef();
  const authCtx = React.useContext(AuthContext);
  // Sample data for patients
  const [patients, setPatients] = useState([]);

  // Fetch patients from the backend when the component mounts
  useEffect(() => {
    const fetchPatientsFromBackend = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "session=YOUR_SESSION_COOKIE_HERE");
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
        setPatients(data.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchPatientsFromBackend();
  }, [authCtx.session]);

  console.log("outside");
  const handleSelectPatient = (selectedOption) => {
    navigate(`/patients/${selectedOption.value}`);
  };


  return (
    <div>
      {authCtx.user && (
        <div className={classes.doctorInfo}>
          <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
          <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
        </div>
      )}

      <div className={classes.selectPatientContainer}>
        <label htmlFor="patientSelect" className={classes.selectLabel}>Select Patient:</label>
        <Select
          ref={searchInputRef}
          options={patients.map(patient => ({ value: patient.id, label: patient.full_name }))}
          onChange={handleSelectPatient}
          placeholder="Search for a patient..."
          isSearchable={true}
          isClearable={true}
          className={classes.patientSelect}
        />
      </div>
    </div>
  );
}

export default PatientsListPage;
