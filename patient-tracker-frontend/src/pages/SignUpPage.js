import { useRef } from 'react'; 
import Card from '../components/ui/Card';
import classes from './SignUpPage.module.css';

function SignUpPage() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredRole = roleRef.current.value;

        console.log("Signing up with username: " + enteredUsername + ", password: " + enteredPassword + ", role: " + enteredRole);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="username">Username</label>
                    <input type="text" required id="username" ref={usernameRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" ref={passwordRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="role">Role</label>
                    <select id="role" ref={roleRef}>
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