import classes from './AddRecordForm.module.css';
import React, { useRef, useState, useContext , useEffect } from 'react';
import Card from "../ui/Card";
import config from '../../config.json';
import ReactSelect from 'react-select';
import AuthContext from '../../store/auth-context';

function AddRecordForm(props) {
    // Refs for existing inputs
    const [doctorOptions, setDoctorOptions] = useState([]); // To store doctor options
    const [doctor, setDoctor] = useState(null); // State for selected doctor

    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addrInputRef = useRef();
    const descInputRef = useRef();

    // Refs for new inputs
    const diagnosisInputRef = useRef();
    const commentsInputRef = useRef();
    const doctorIdInputRef = useRef();
    const patientIdInputRef = useRef();
    const authCtx = useContext(AuthContext);
    // State for file
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };
    
    useEffect(() => {
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

        fetchDoctors();
    }, [authCtx.session]);
    
    const handleDoctorChange = (selectedOption) => {
        setDoctor(selectedOption);
    };

    function submitHandler(event) {
        event.preventDefault();

        // New inputs
        const enteredDiagnosis = diagnosisInputRef.current.value;
        const enteredComments = commentsInputRef.current.value;

        var formdata = new FormData();
        formdata.append("diagnosis", enteredDiagnosis);
        formdata.append("comments", enteredComments);
        formdata.append("doctor_id", doctor ? doctor.value : ''); // Use selected doctor's value
        formdata.append("patient_id", authCtx.user.roleId); // Use patient ID from context
        formdata.append("file", file, file.name);

        // Fetch request configuration
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "session=YOUR_SESSION_COOKIE");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`http://${config.ipAddress}:${config.port}/medical-records`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                {/* Existing form controls... */}
                
                <div className={classes.control}>
                    <label htmlFor="diagnosis">Diagnosis</label>
                    <input type="text" required id="diagnosis" ref={diagnosisInputRef} />
                </div>

                <div className={classes.control}>
                    <label htmlFor="comments">Comments</label>
                    <textarea id="comments" required rows='3' ref={commentsInputRef}></textarea>
                </div>

                <div className={classes.control}>
                    <label htmlFor="doctor">Doctor</label>
                    <ReactSelect
                        options={doctorOptions}
                        onChange={handleDoctorChange}
                        className={classes.reactSelect}
                    />
                </div>


                <div className={classes.actionBar}>
                    <label>
                        Upload File
                        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                </div>

                <div className={classes.actions}>
                    <button type="submit">Add Medical Record</button>
                </div>
            </form>
        </Card>
    )
}

export default AddRecordForm;
