import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPatient.module.css';

function SearchPatient() {
  const navigate = useNavigate();


  // BACKEND LINK: list of searched patientids 
  const dummy_list_patients = [
    { patientName: "John Doe", patientId: 1},
    { patientName: "Jane Doe", patientId: 2}
  ]
  // Dummy search handler, replace with actual search logic
  const handleSearch = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className={styles.searchPatientContainer}>
  <h2>Search Patient</h2>
  <select className={styles.searchPatientInput}>
    {/* Replace options with actual data */}
    <option>Select</option>
    {/* Map through your patients data */}
  </select>
  <input type="search" placeholder="Search" className={styles.searchPatientInput} />
  <button onClick={() => handleSearch("patientId")} className={styles.searchPatientButton}>Search</button>
  {/* List patients or search results */}
  <div className={styles.searchCard}>
  <ul>
    {/* Replace with actual patient data */}
    {/* BACKEND LINK: list of searched patientids */}
    
      
    {dummy_list_patients.map((patient) => (
    <li key={patient.patientId} onClick={() => handleSearch(patient.patientId)}>
        <div>{patient.patientName} </div>
    </li>
    ))}
{/* 
    <li onClick={() => handleSearch("patientId")}>
       <div>Patient Name - Foobar</div> 
    </li>
    <li onClick={() => handleSearch("patientId")}>
        <div>Patient Name - Foo Doe</div>
    </li> */}

    {/* Map through your patient data */}
  </ul>
  </div>
</div>
  );
};

export default SearchPatient;