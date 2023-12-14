import classes from './EditPersonalInfoComponent.module.css';
import { useRef } from 'react';
import Card from '../ui/Card';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';


function EditPersonalInfoComponent(props) {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addrInputRef = useRef();
    const descInputRef = useRef();

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef(); 
    const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const genderInputRef = useRef();
    const ageInputRef = useRef();
    const additionalDataInputRef = useRef();

    const authCtx = useContext(AuthContext);

    function submitHandler(event) {
        event.preventDefault();
        const enteredImage = imageInputRef.current.value;
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredGender = genderInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        const enteredAdditionalData = additionalDataInputRef.current.value;

        const userData = {
            img: enteredImage,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            phone: enteredPhone,
            gender: enteredGender,
            age: enteredAge,
            additionalData: enteredAdditionalData

        };
        console.log(userData);
        // props.onAddMeetup(userData);

        //BACKEND CALL: send data to backend.
        // update the user data in the context
        authCtx.setUser(userData);

    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" required id="firstName" ref={titleInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" required id="lastName" ref={titleInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="img">Display Image</label>
                    <input type="url" required id="img" ref={imageInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" required id="email" ref={addrInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" required id="phone" ref={addrInputRef} />
                </div>
                

                <div className={classes.control}>
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" required ref={genderInputRef}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="age">Age</label>
                    <input type="number" required id="age" ref={ageInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="additionalData">Additional Data</label>
                    <textarea id="additionalData" required rows='5' ref={additionalDataInputRef}></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Save Info</button>
                </div>
            </form>       
        </Card>
    )
}

export default EditPersonalInfoComponent;