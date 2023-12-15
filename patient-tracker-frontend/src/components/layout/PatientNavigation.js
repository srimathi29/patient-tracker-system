import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NavigateButton from '../ui/NavigateButton';
import AuthContext from '../../store/auth-context';


function PatientNavigation() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = () => {
        authCtx.logout();
        navigate('/login');
    };
    return (
        <>
            <li>
                <Link to='/'>Dashboard</Link>
            </li>
            <li>
                <Link to='/appointments'>Appointments</Link>
            </li>
            <li>
                <Link to='/help'>Help</Link>
            </li>
            <li>
                <div className={classes.actions}>
                    <button className={classes.button} onClick={logoutHandler}>
                        Log Out
                    </button>
                </div>

            </li>
        </>
    )
}

export default PatientNavigation;