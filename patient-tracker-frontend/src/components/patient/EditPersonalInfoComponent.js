import React, { useRef, useContext } from 'react';
import classes from './EditPersonalInfoComponent.module.css';
import Card from '../ui/Card';
import AuthContext from '../../store/auth-context';
import config from '../../config.json';

function EditPersonalInfoComponent() {
    const imageInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef(); 
    const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const genderInputRef = useRef();
    const ageInputRef = useRef();
    const addressInputRef = useRef();

    const authCtx = useContext(AuthContext);

    function submitHandler(event) {
        event.preventDefault();

        // Collect the data from the form fields
        const enteredData = {
            img: imageInputRef.current.value,
            first_name: firstNameInputRef.current.value,
            last_name: lastNameInputRef.current.value,
            email: emailInputRef.current.value,
            contact_number: phoneInputRef.current.value,
            gender: genderInputRef.current.value,
            age: ageInputRef.current.value,
            address: addressInputRef.current.value
        };
        const userData = {
            firstName: enteredData.first_name,
            lastName: enteredData.last_name,
            email: enteredData.email,
            age: enteredData.age,
            gender: enteredData.gender,
            phone: enteredData.contact_number,
            additionalData: authCtx.user.additionalData,
            img: enteredData.img,
            user_id: authCtx.user.user_id,
            role: authCtx.user.role,
            roleId: authCtx.user.roleId,
            address: enteredData.address,
  
          }
        // TODO: Add your backend call here

        // Update authCtx with the new data
        authCtx.setUser(userData);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "session=" + authCtx.session);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(userData),
            redirect: 'follow'
        };

        // Replace '/users/6' with the correct endpoint if needed
        fetch(`http://${config.ipAddress}:${config.port}/users/${authCtx.user.user_id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                // authCtx.setUser(userData); // update the user data in the context
            })
            .catch(error => console.log('error', error));
    }
    

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" required id="firstName" ref={firstNameInputRef} defaultValue={authCtx.user.firstName} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" required id="lastName" ref={lastNameInputRef} defaultValue={authCtx.user.lastName} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="img">Display Image (URL)</label>
                    <input type="url" required id="img" ref={imageInputRef} defaultValue={authCtx.user.img} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" required id="email" ref={emailInputRef} defaultValue={authCtx.user.email} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" required id="phone" ref={phoneInputRef} defaultValue={authCtx.user.phone} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" required ref={genderInputRef} defaultValue={authCtx.user.gender}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="age">Age</label>
                    <input type="number" required id="age" ref={ageInputRef} defaultValue={authCtx.user.age} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="address">Address</label>
                    <textarea id="address" required rows='5' ref={addressInputRef} defaultValue={authCtx.user.address}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Save Info</button>
                </div>
            </form>       
        </Card>
    );
}

export default EditPersonalInfoComponent;
