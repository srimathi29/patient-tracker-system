import React, { useRef, useContext } from 'react';
import classes from './DiagnosisForm.module.css'; // Make sure to create this CSS module
import Card from '../ui/Card';
import AuthContext from '../../store/auth-context';
import config from '../../config.json';

function DiagnosisForm(props) {
    const diagnosisInputRef = useRef();
    const prescriptionInputRef = useRef();

    const authCtx = useContext(AuthContext);

    function submitHandler(event) {
        event.preventDefault();

        const enteredDiagnosis = diagnosisInputRef.current.value;
        const enteredPrescription = prescriptionInputRef.current.value;
        const doctorId = authCtx.user.roleId;
        const patientId = props.patientId;

        // FormData for sending the data to the backend
        const formData = new FormData();
        formData.append('diagnosis', enteredDiagnosis);
        formData.append('comments', enteredPrescription);
        formData.append('doctor_id', doctorId);
        formData.append('patient_id', patientId);

        // Fetch options for the POST request
        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        // Make the API call
        fetch(`http://${config.ipAddress}:${config.port}/medical-records`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                // Handle success (e.g., clear form, show success message)
            })
            .catch(error => {
                console.log('error', error);
                // Handle error (e.g., show error message)
            });

        console.log(formData);
        // props.onSubmitDiagnosis(formData);

        // BACKEND CALL: send data to backend.
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="diagnosis">Diagnosis</label>
                    <textarea
                        id="diagnosis"
                        required
                        rows='5'
                        ref={diagnosisInputRef}
                        className={classes.textarea}></textarea>
                </div>
                <div className={classes.control}>
                    <label htmlFor="prescription">Prescription</label>
                    <textarea
                        id="prescription"
                        required
                        rows='5'
                        ref={prescriptionInputRef}
                        className={classes.textarea}></textarea>
                </div>
                <div className={classes.actions}>
                    <button type="submit">Publish</button>
                </div>
            </form>
        </Card>
    );
}

export default DiagnosisForm;
