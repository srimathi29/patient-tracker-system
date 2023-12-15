import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Card from '../components/ui/Card';
import classes from './SignUpPage.module.css';

function SignUpPage() {
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        role: ''
    });

    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const roleRef = useRef();
    const [isSuccess, setIsSuccess] = useState(false);

    // Validation functions
    function validateUsername(enteredUsername) {
        return /^[A-Za-z0-9]+$/.test(enteredUsername) ? '' : 'Username must not contain spaces or special characters.';
    }

    function validatePassword(enteredPassword) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(enteredPassword) ? '' : 'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.';
    }

    function validateEmail(enteredEmail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail) ? '' : 'Please enter a valid email address.';
    }

    function validateFirstName(enteredFirstName) {
        return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(enteredFirstName) ? '' : 'First name must contain only letters, apostrophes, or hyphens.';
    }

    function validateLastName(enteredLastName) {
        return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(enteredLastName) ? '' : 'Last name must contain only letters, apostrophes, or hyphens.';
    }

    function validateRole(selectedRole) {
        return selectedRole ? '' : 'Please select a role.';
    }

    function handleInputChange(event, validator, field) {
        const inputValue = event.target.value;
        const errorMessage = validator(inputValue);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateInput()) {
            const userData = {
                username: usernameRef.current.value,
                user_email: emailRef.current.value,
                password: passwordRef.current.value,
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                user_type: roleRef.current.value
            };

            axios.post('http://10.0.0.123:8080/register', JSON.stringify(userData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    setIsSuccess(true);
                    navigate('/login'); // Navigate to the sign-in page
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors here, e.g., set error messages in state
                });
        }
    }

    function validateInput() {
        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredFirstName = firstNameRef.current.value;
        const enteredLastName = lastNameRef.current.value;
        const selectedRole = roleRef.current.value;

        const usernameError = validateUsername(enteredUsername);
        const passwordError = validatePassword(enteredPassword);
        const emailError = validateEmail(enteredEmail);
        const firstNameError = validateFirstName(enteredFirstName);
        const lastNameError = validateLastName(enteredLastName);
        const roleError = validateRole(selectedRole);

        setErrors({
            username: usernameError,
            password: passwordError,
            email: emailError,
            firstName: firstNameError,
            lastName: lastNameError,
            role: roleError
        });

        return (
            usernameError === '' &&
            passwordError === '' &&
            emailError === '' &&
            firstNameError === '' &&
            lastNameError === '' &&
            roleError === ''
        );
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                {/* Input fields for username, password, email, first name, last name, role */}
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input type="text" required id="username" ref={usernameRef} onChange={(event) => handleInputChange(event, validateUsername, 'username')} />
                    {errors.username && <p className={classes.error}>{errors.username}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" ref={passwordRef} onChange={(event) => handleInputChange(event, validatePassword, 'password')} />
                    {errors.password && <p className={classes.error}>{errors.password}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" ref={emailRef} onChange={(event) => handleInputChange(event, validateEmail, 'email')} />
                    {errors.email && <p className={classes.error}>{errors.email}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" required id="firstName" ref={firstNameRef} onChange={(event) => handleInputChange(event, validateFirstName, 'firstName')} />
                    {errors.firstName && <p className={classes.error}>{errors.firstName}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" required id="lastName" ref={lastNameRef} onChange={(event) => handleInputChange(event, validateLastName, 'lastName')} />
                    {errors.lastName && <p className={classes.error}>{errors.lastName}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor="role">Role</label>
                    <select id="role" ref={roleRef} required onChange={(event) => handleInputChange(event, validateRole, 'role')}>
                        <option value="">Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                    </select>
                    {errors.role && <p className={classes.error}>{errors.role}</p>}
                </div>
                <div className={classes.actions}>
                    <button>Sign Up</button>
                </div>
            </form>
        </Card>
    );
}

export default SignUpPage;
