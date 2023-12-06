import { useState, useRef } from 'react'; 
import Card from '../components/ui/Card';
import classes from './LoginPage.module.css';


function LoginPage() {
    const usernameRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        console.log("Logging in with username: " + enteredUsername + " and password: " + enteredPassword);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="title">Username</label>
                    <input type="text" required id="username" ref={usernameRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" ref={passwordRef} />
                </div>
                <div className={classes.actions}>
                    <button>Log In</button>
                </div>
            </form>       
        </Card>
    );


}

export default LoginPage;