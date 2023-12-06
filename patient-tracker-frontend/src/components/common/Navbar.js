import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import AuthContext from '../../store/auth-context';
import NavigateButton from '../ui/NavigateButton';


function Navbar() {
    const authContext = useContext(AuthContext); // Get the authentication status

    return (
        <nav>
            <ul className={classes.navList}>
                {authContext.isAuthenticated ? (
                    // Links to show when user is authenticated
                    <>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/logout'>Log Out</Link>
                        </li>
                    </>
                ) : (
                    // Links to show when user is not authenticated
                    <>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/services'>Services</Link>
                        </li>
                        <li>
                            <Link to='/help'>Help</Link>
                        </li>
                        <li>
                            <NavigateButton path="/login"> Log In </NavigateButton>
                        </li>
                        <li>
                            <NavigateButton path="/signup"> Sign Up </NavigateButton>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;