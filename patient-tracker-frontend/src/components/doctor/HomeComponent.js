import classes from './HomeComponent.module.css';
import AppointmentList from '../appointments/AppointmentList';
import SearchPatient from './SearchPatient';
import AuthContext, { AuthContextProvider }   from '../../store/auth-context';
import React from 'react';

function HomeComponent(props) {
    // Replace with your actual appointments and patients data
    //BACKEND LINK: To appointments: 
  const appointments = [
    { id: 1, title:"Checkup of patient1", patientName:"John Doe ", dateTime: '2023-04-12 10:00' },
    { id: 1, title:"Checkup of patient2", patientName:"Joe Dane ", dateTime: '2023-02-13 02:00' },
    // ...other appointments
  ];
    //BACKEND LINK: To doctor information
    const authCtx = React.useContext(AuthContext);

  return (

    <div>
        {authCtx.user && (
      <div className={classes.doctorInfo}>
        <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
        <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
      </div>
    )}
    

    <div className={classes.homePageContainer}>
      <div className={classes.appointmentsSection}>
        <AppointmentList appointments={appointments} />
      </div>
      <div className={classes.searchSection}>
        <SearchPatient />
      </div>
    </div>
    </div>
  );
}
    



export default HomeComponent;