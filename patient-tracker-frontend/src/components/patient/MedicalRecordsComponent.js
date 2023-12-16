import React, { useState, useEffect, useContext } from 'react';
import classes from './MedicalRecordsComponent.module.css';
import Card from '../ui/Card';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';

function MedicalRecordsComponent() {
    const authCtx = useContext(AuthContext);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const patientId = authCtx.user.roleId;
                var myHeaders = new Headers();
                myHeaders.append("Cookie", "session=YOUR_SESSION_COOKIE");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const response = await fetch(`http://${config.ipAddress}:${config.port}/medical-records/${patientId}`, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch medical records');
                }
                
                const data = await response.json();
                setMedicalRecords(data.data.medical_records);
                setDocuments(data.data.documents);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        fetchMedicalRecords();
    }, [authCtx.user.roleId]);

    const navigateToAddReportForm = () => {
        navigate('/add-record');
    };

    return (
        <div>
            <h3>Medical Records</h3>
            <div className={classes.reportsComponent}>
                {authCtx.user && (
                    <div className={classes.doctorInfo}>
                        <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
                        <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
                    </div>
                )}

                <div className={classes.actionBar}>
                    <button onClick={navigateToAddReportForm}>Add Record</button>
                </div>

                <div className={classes.homePageContainer}>
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
                </div>
            </div>
        </div>
    );
}

export default MedicalRecordsComponent;
