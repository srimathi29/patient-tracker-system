import React, { useState } from 'react';
import SideNav from '../components/layout/SideNav';
import styles from '../components/layout/Layout.module.css';
import classes from './DoctorPage.module.css';
import HomeComponent from '../components/doctor/HomeComponent';
import PersonalInfoComponent from '../components/doctor/PersonalInfoComponent';
import EditPersonalInfoComponent from '../components/doctor/EditPersonalInfoComponent';
import ReportsComponent from '../components/doctor/ReportsComponent';

function DoctorPage() {
  const [activeComponent, setActiveComponent] = useState('Home');

  // Adjust navItems to include an identifier for the component
  const navItems = [
    { name: 'Home', identifier: 'Home' },
    { name: 'Reports', identifier: 'Reports' },
    { name: 'Personal Info', identifier: 'PersonalInfo' },
    { name: 'Edit Personal Info', identifier: 'EditPersonalInfo' },
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
      case 'Reports':
        return <ReportsComponent />;
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
        <h1>Doctor Page</h1>
        {/* The rest of your page content goes here */}
      </div>
    </div>
  );
}

export default DoctorPage;
