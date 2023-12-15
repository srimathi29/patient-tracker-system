import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import classes from './ReportsComponent.module.css';
import ReactSelect from 'react-select';
import AuthContext from '../../store/auth-context';
import config from '../../config.json';

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [documents, setDocuments] = useState([]);
  const authCtx = React.useContext(AuthContext);
  const [patientOptions, setPatientOptions] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
  
  // Fetch the list of patients from the backend
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
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }

      const data = await response.json();
      const patientOptions = data.data.patients.map(patient => ({
        value: patient.id,
        label: patient.full_name
      }));
      setPatientOptions(patientOptions);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }};
    fetchPatientsFromBackend();

  
  }, [authCtx.session]);

  const fetchMedicalRecords = async (patientId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", `session=${authCtx.session}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(`http://${config.ipAddress}:${config.port}/medical-records/${patientId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch medical records');
      }

      const data = await response.json();
      console.log('data for medical record:', data);
      setMedicalRecords(data.data.medical_records);
      setDocuments(data.data.documents);
      setFilteredReports(data.data.medical_records); // Set filtered reports here
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };


  const handleFilterChange = (selectedOption) => {
    setSelectedPatientId(selectedOption ? selectedOption.value : null);
    if (selectedOption) {
      fetchMedicalRecords(selectedOption.value);
      console.log('selectedOption:', selectedOption );
    } else {
      setFilteredReports([]);
    }
  };

  return (
    <div className={classes.reportsComponent}>
      <div>
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <Card key={report.id}>
              <h3>{report.title}</h3>
              <p>{report.content}</p>
              {/* Additional report details */}
            </Card>
          ))
        ) : (
          <p>No records for selected filters</p>
        )}
      </div>
      <div className={classes.appointmentsSection}>
                        <h4>Documents:</h4>
                        <ul>
                            {documents.map(document => (
                                <li key={document.id}>
                                    <a href={`http://${config.ipAddress}:${config.port}${document.download_link}`} target="_blank" rel="noopener noreferrer">
                                        {document.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <h4>Medical Records:</h4>
                        <div className={classes.reportsList}>
                            {medicalRecords.map(record => (
                                <Card key={record.id} className={classes.reportsComponent}>
                                    <h3>{record.diagnosis}</h3>
                                    <p>Doctor: {record.doctor_name}</p>
                                    <p>Date: {record.date}</p>
                                    <p>Comments: {record.comments}</p>
                                    {/* Add more medical record details here */}
                                </Card>
                            ))}
                        </div>
                    </div>
      <div className={classes.filterSection}>
        <label htmlFor="patientName">Select Patient: </label>
        <ReactSelect
          options={patientOptions}
          id="patientName"
          name="patientName"
          onChange={handleFilterChange}
          className={classes.reactSelect}
        />
      </div>
    </div>
  );
};

export default ReportsComponent;
