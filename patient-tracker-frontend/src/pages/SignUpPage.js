import { useRef, useState } from 'react';
import Card from '../components/ui/Card';
import classes from './SignUpPage.module.css';

function SignUpPage() {
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    });

    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const roleRef = useRef();

    function validateInput() {
        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;

        let tempErrors = {};
        tempErrors.username = /^[A-Za-z0-9]+$/.test(enteredUsername) ? '' : 'Username must not contain spaces or special characters.';
        tempErrors.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(enteredPassword) ? '' : 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.';
        tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail) ? '' : 'Please enter a valid email address.';
        tempErrors.firstName = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(enteredFirstName) ? '' : 'First name must contain only letters, apostrophes, or hyphens.';
        tempErrors.lastName = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(enteredLastName) ? '' : 'Last name must contain only letters, apostrophes, or hyphens.';

        setErrors(tempErrors);

        // Return false if there are any errors
        return !Object.values(tempErrors).some(error => error);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateInput()) {
            // Proceed with the signup process...
            console.log("Signing up with details: ", {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                email: emailRef.current.value,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                role: roleRef.current.value
            });
            // Here you would send the data to the server
        }
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input type="text" required id="username" ref={usernameRef} />
                    {errors.username && <p className={classes.error}>{errors.username}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" ref={passwordRef} />
                    {errors.password && <p className={classes.error}>{errors.password}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" ref={emailRef} />
                    {errors.email && <p className={classes.error}>{errors.email}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" required id="firstName" ref={firstNameRef} />
                    {errors.firstName && <p className={classes.error}>{errors.firstName}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" required id="lastName" ref={lastNameRef} />
                    {errors.lastName && <p className={classes.error}>{errors.lastName}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="role">Role</label>
                    <select id="role" ref={roleRef} required>
                        <option value="">Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>Sign Up</button>
                </div>
            </form>
        </Card>
    );
}

export default SignUpPage;
