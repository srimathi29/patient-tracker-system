import React from 'react';
import classes from './PersonalInfoComponent.module.css'; // Assume you have the corresponding CSS file
import AuthContext from '../../store/auth-context';

function PersonalInfoComponent() {
  // Static data for now - replace this with real data loaded from a server or state
  const userInfo = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 30,
    additionalData: 'No additional information.'
  };
  const authCtx = React.useContext(AuthContext);
  return (

    <div className={classes.personalInfo}>
      <div className={classes.details}>
        <h2>Personal Info</h2>
        <div className={classes.detailItem}>
          <strong>First Name:</strong>
          <span>{authCtx.user.firstName}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Last Name:</strong>
          <span>{authCtx.user.lastName}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Gender:</strong>
          <span>{authCtx.user.gender}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Age:</strong>
          <span>{authCtx.user.age}</span>
        </div>
        <div className={classes.additionalData}>
          <strong>Additional Data:</strong>
          <p>{authCtx.user.additionalData}</p>
        </div>
      </div>
      <div className={classes.avatar}>
        {/* If you have an avatar URL in your user info */}
        <img src={authCtx.user.img} alt="User Avatar" />
      </div>
    </div>
  );
};

export default PersonalInfoComponent;
