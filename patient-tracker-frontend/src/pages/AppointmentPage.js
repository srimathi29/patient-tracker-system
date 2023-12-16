import React, { useState, useEffect } from 'react';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentComponent from '../components/appointments/AppointmentComponent';
import styles from '../components/layout/Layout.module.css';
import classes from './AppointmentPage.module.css';
import SideNav from '../components/layout/SideNav';
import ReportsComponent from '../components/doctor/ReportsComponent';
import ScheduleAppointmentComponent from '../components/appointments/ScheduleAppointmentComponent';

function AppointmentPage(props) {
  const [activeComponent, setActiveComponent] = useState('appointments');


  // Adjust navItems based on the user role
  const navItems = [
    { name: 'Appointment Summary', identifier: 'Appointment Summary' },
    { name: 'Schedule Appointments', identifier: 'Schedule Appointments' },
    // Add more items as needed
  ];


  // Function to handle selection of nav item
  const handleNavItemSelect = (identifier) => {
    setActiveComponent(identifier);
  };
  // Render the component based on activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Appointment Summary':
        return <AppointmentComponent />;
      case 'Schedule Appointments':
        return <ScheduleAppointmentComponent />;

      default:
        return <AppointmentComponent />;
    }
  };

  // Fetch appointments from a backend when the component mounts
  useEffect(() => {
    // Here you would fetch the data from a backend and then set it using setAppointments
    // For this example, we're using static data defined above
  }, []);

  return (
    <div className={`${styles.main} ${styles.doctorPageMain}`}>
      <SideNav
        navItems={navItems}
        onNavItemSelect={handleNavItemSelect}
      />
      <div className={`${classes.maincontent}`}>
        <h1>Appointment Page</h1>
        {renderComponent()}

        {/* The rest of your page content goes here */}
      </div>
    </div>
  );
}

export default AppointmentPage;
