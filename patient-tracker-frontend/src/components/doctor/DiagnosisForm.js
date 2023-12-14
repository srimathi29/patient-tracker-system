import React, { useRef } from 'react';
import classes from './DiagnosisForm.module.css'; // Make sure to create this CSS module
import Card from '../ui/Card';

function DiagnosisForm(props) {
    const diagnosisInputRef = useRef();
    const prescriptionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredDiagnosis = diagnosisInputRef.current.value;
        const enteredPrescription = prescriptionInputRef.current.value;

        const formData = {
            diagnosis: enteredDiagnosis,
            prescription: enteredPrescription
        };

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
