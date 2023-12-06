import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NavigateButton from '../ui/NavigateButton';

function MainNavigation() {

    return (
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
    )
}

export default MainNavigation;