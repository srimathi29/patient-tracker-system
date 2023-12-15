import React, { useState, useEffect } from 'react';
import classes from './PatientDetailsPage.module.css';
import AuthContext from '../store/auth-context';
import PatientProfile from '../components/doctor/PatientProfile';
import DiagnosisForm from '../components/doctor/DiagnosisForm';
import config from '../config.json';

function PatientDetailsPage(props) {
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const authCtx = React.useContext(AuthContext);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            setIsLoading(true);
            setError(null);

            const myHeaders = new Headers();
            myHeaders.append("Cookie", "session=.eJwdzssNgzAMANBdcu4hBjt2WAb5q_YK5VR196Iu8PQ-ba8jz2fb3seVj7a_om0tMxf0BYB9TGTFDiQDKBCFFUCwknxiuBFnzjQXsinDBggBg3cpMBijm5uuGrXEXAuVQ4gZQGnWyKLUsLip6alZEb0WiWx35Drz-G_g-wNq7TBj.ZXvIQA.KN7BZ-GpPGtjwZU-ysoHsHVILWc");

            try {
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const response = await fetch(`http://${config.ipAddress}:${config.port}/v2/patients/${props.id}`, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch patient details.');
                }
                const data = await response.json();
                setPatient(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatientDetails();
    }, [props.id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!patient) {
        return <p>No patient data found.</p>;
    }

    return (
        <div>
            {authCtx.user && (
                <div className={classes.doctorInfo}>
                    <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
                    <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
                </div>
            )}

            <div className={classes.PageContainer}>
                <div className={classes.DiagnosisSection}>
                    <DiagnosisForm patientId={patient.id} />
                </div>
                <div className={classes.searchSection}>
                    <PatientProfile patient={patient} />
                </div>
            </div>
        </div>
    );
}

export default PatientDetailsPage;
