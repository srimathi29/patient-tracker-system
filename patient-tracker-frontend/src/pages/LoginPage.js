import { useState, useRef, useContext, useEffect } from 'react';
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
    const [errorMessage, setErrorMessage] = useState(null);

    // If the user is already authenticated, redirect them
    useEffect(() => {
        if (authCtx.isAuthenticated && authCtx.userRole === 'doctor') {
            navigate('/'); // Navigate to the homepage or dashboard
        }
    }, [authCtx.isAuthenticated, authCtx.userRole, navigate]);

    async function handleSubmit(event) {
        event.preventDefault();

        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        // You should have a try/catch here if your login method can throw
        try {
            await authCtx.login(enteredUsername, enteredPassword);
            // If login is successful, the above useEffect will trigger navigation
        } catch (error) {
            // Handle errors (e.g., display a message to the user)
            console.error('Login failed:', error);
        }
        if(authCtx.isSuccess){
            navigate('/');
        }
        else{
            setErrorMessage('Login failed. Please contact the administrator or try again with proper credentials.');
        }
    };

    return (
        <div className={cardClasses.centercard}>
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
                    <div className={classes.actions}>
                        <button>Log In</button>
                    </div>
                </form>
                {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
            </Card>
        </div>
    );
}

export default LoginPage;
