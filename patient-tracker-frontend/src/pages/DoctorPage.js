import React from 'react';
import SideNav from '../components/layout/SideNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from '../components/layout/Layout.module.css';
import classes from './DoctorPage.module.css';
import HomeComponent from '../components/doctor/HomeComponent';


function DoctorPage() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Reports', path: '/reports' },
    { name: 'Personal Info', path: '/personal-info' },
    { name: 'Edit Personal Info', path: '/edit-personal-info' },
    // Add more items as needed
  ];

  return (
      <div className={`${styles.main} ${styles.doctorPageMain}`}>
        <SideNav navItems={navItems} />
        <div className={`${classes.maincontent}`}>
          <Routes>
            {/* Define routes and components for each path */}
            <Route path="/" element={<HomeComponent />} />
            {/*<Route path="/reports" element={<ReportsComponent />} />
            <Route path="/personal-info" element={<PersonalInfoComponent />} />
            <Route path="/edit-personal-info" element={<EditInfoComponent />} /> */}
            {/* Add more routes as needed */}
          </Routes>
          <h1>Doctor Page</h1>
          {/* The rest of your page content goes here */}
        </div>
      </div>
  );
}

export default DoctorPage;
