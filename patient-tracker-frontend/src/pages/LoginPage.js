import { useState, useRef, useContext } from 'react'; 
import Card from '../components/ui/Card';
import classes from './LoginPage.module.css';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import cardClasses from '../components/ui/Card.module.css';

function LoginPage() {
    const authCtx = useContext(AuthContext);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        console.log("Logging in with username: " + enteredUsername + " and password: " + enteredPassword);
        authCtx.login(enteredUsername, enteredPassword);
        if (authCtx.isAuthenticated && authCtx.userRole === 'doctor') {
            navigate('/');
          }
    };

    return (
        // align Card to center
        <div className={cardClasses.centercard}>
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
        </div>
    );


}

export default LoginPage;