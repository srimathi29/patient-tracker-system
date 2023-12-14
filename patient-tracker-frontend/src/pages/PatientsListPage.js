import React, { useState } from 'react';
import classes from './PatientsListPage.module.css';
import AuthContext, { AuthContextProvider } from '../store/auth-context'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

// Sample data for patients
const mockPatients = [
  { id: 1, name: 'John Doe', history: 'Patient has a history of allergies.' },
  { id: 2, name: 'Jane Smith', history: 'Patient has a recurring condition of asthma.' },
  { id: 3, name: 'Emma Jones', history: 'Patient is diabetic and has hypertension.' },
];

function PatientsListPage(props) {
    const navigate = useNavigate();
    const searchInputRef = React.useRef();

   //BACKEND LINK: To patients information
   const patientOptions = [
    { value: 1, label: 'John Doe' },
    { value: 2, label: 'Jane Smith' },
    { value: 3, label: 'Emma Jones' },
    // ... more patients
  ];



   const authCtx = React.useContext(AuthContext);
    const patients = mockPatients;
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

    {/* <div className={classes.PageContainer}>
      <div className={classes.diagnosticSection}>
        <AppointmentList appointments={appointments} />
      </div>
      <div className={classes.searchSection}>
        <SearchPatient />
      </div>
    </div> */}

    {/* <div>
      {patients.map(patient => (
        <div
          key={patient.id}
          onClick={() => handleSelectPatient(patient.id)}
        >
          {patient.name}
        </div>
      ))}


    </div> */}

    <div className={classes.selectPatientContainer}>
    <label htmlFor="patientSelect" className={classes.selectLabel}>Select Patient:</label>

      <Select
        ref={searchInputRef}
        options={patientOptions}
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


