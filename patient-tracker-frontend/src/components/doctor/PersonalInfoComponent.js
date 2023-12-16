import React, { useState, useEffect } from 'react';
import classes from './PersonalInfoComponent.module.css'; // Assume you have the corresponding CSS file
import AuthContext from '../../store/auth-context';
import config from '../../config.json'

function PersonalInfoComponent() {
  // Static data for now - replace this with real data loaded from a server or state
  const [userData, setUserData] = useState(null);

  const authCtx = React.useContext(AuthContext);
  
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "session=" + authCtx.session);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://${config.ipAddress}:${config.port}/users`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Assuming you want to display the first user's data
        // setUserData(data[0]);
        console.log("users data: ", data.data.users);
        console.log("role id: ", authCtx.user.roleId);
        console.log("user id: "+authCtx.user.user_id);
        const user = data.data.users.find(user => String(user.id)=== authCtx.user.user_id);
        console.log("users data: ", data.data.users[3]);

        console.log("userdata: ", user);

        if (user) {
          const mappedUserData = {
            firstName: user.first_name || authCtx.user.firstName,
            lastName: user.last_name || authCtx.user.lastName,
            gender: user.gender || authCtx.user.gender,
            age: user.age || authCtx.user.age,
            address: user.address || authCtx.user.address,
            img: user.img || authCtx.user.img,
            email: user.user_email || authCtx.user.email,
            phone: user.contact_number || authCtx.user.phone,
            additionalData: authCtx.user.additionalData,
            user_id: authCtx.user.user_id,
            role: authCtx.user.role,
            roleId: authCtx.user.roleId
          };
          //update authCtx
          authCtx.setUser(mappedUserData);
          setUserData(mappedUserData); // Update state with the found user data
        }
      })
      .catch(error => console.log('error', error));
  }, [authCtx.session]); // Dependency array with authCtx.session to re-run when session changes

  const displayUser = userData || authCtx.user;

  if (!displayUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.personalInfo}>
      <div className={classes.details}>
        <h2>Personal Info</h2>
        <div className={classes.detailItem}>
          <strong>First Name:</strong>
          <span>{displayUser.firstName}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Last Name:</strong>
          <span>{displayUser.lastName}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Phone:</strong>
          <span>{displayUser.contact_number}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Gender:</strong>
          <span>{displayUser.gender}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Age:</strong>
          <span>{displayUser.age}</span>
        </div>
        <div className={classes.detailItem}>
          <strong>Email:</strong>
          <span>{displayUser.email}</span>
        </div>
        <div className={classes.additionalData}>
          <strong>Address:</strong>
          <p>{displayUser.address}</p>
        </div>
        
      </div>
      <div className={classes.avatar}>
        <img src={displayUser.img} alt="User Avatar" />
      </div>
    </div>
  );
};


export default PersonalInfoComponent;
