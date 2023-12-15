import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import NavigateButton from '../ui/NavigateButton';
import MainNavigation from '../layout/MainNavigation';
import DoctorNavigation from '../layout/DoctorNavigation';
import PatientNavigation from '../layout/PatientNavigation';

function Navbar(props) {

    return (
        <nav>
            <ul className={classes.navList}>
                {props.role === 'doctor' && <DoctorNavigation />}
                {props.role === 'none' && <MainNavigation />}
                {props.role === 'patient' && <PatientNavigation />}
            </ul>
        </nav>
    );
}

export default Navbar;