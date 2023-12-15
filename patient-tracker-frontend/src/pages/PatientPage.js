import React, { useState } from 'react';
import SideNav from '../components/layout/SideNav';
import styles from '../components/layout/Layout.module.css';
import classes from './DoctorPage.module.css';
import HomeComponent from '../components/patient/HomeComponent';
import PersonalInfoComponent from '../components/patient/PersonalInfoComponent';
import EditPersonalInfoComponent from '../components/patient/EditPersonalInfoComponent';
import MedicalHistoryComponent from '../components/patient/MedicalHistoryComponent';
import MedicalRecordsComponent from '../components/patient/MedicalRecordsComponent';

function PatientPage() {
    const [activeComponent, setActiveComponent] = useState('Home');

    // Adjust navItems to include an identifier for the component
    const navItems = [
        { name: 'Home', identifier: 'Home' },
        { name: 'Personal Info', identifier: 'PersonalInfo' },
        { name: 'Edit Personal Info', identifier: 'EditPersonalInfo' },
        { name: 'Medical Records', identifier: 'MedicalRecords' },
        { name: 'Medical History', identifier: 'MedicalHistory' },
        // Add more items as needed
    ];

    // Function to handle selection of nav item
    const handleNavItemSelect = (identifier) => {
        setActiveComponent(identifier);
    };
    // Render the component based on activeComponent state
    const renderComponent = () => {
        switch (activeComponent) {
            case 'Home':
                return <HomeComponent />;
            case 'MedicalRecords':
                return <MedicalRecordsComponent />;
            case 'MedicalHistory':
                return <MedicalHistoryComponent />;
            case 'PersonalInfo':
                return <PersonalInfoComponent />;
            case 'EditPersonalInfo':
                return <EditPersonalInfoComponent />;
            default:
                return <HomeComponent />;
        }
    };



    return (
        <div className={`${styles.main} ${styles.doctorPageMain}`}>
            <SideNav
                navItems={navItems}
                onNavItemSelect={handleNavItemSelect}
            />
            <div className={`${classes.maincontent}`}>
                {renderComponent()}
                <h1>Patient Page</h1>
                {/* The rest of your page content goes here */}
            </div>
        </div>
    );
}

export default PatientPage;
