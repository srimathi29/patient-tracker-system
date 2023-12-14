import classes from './EditPersonalInfoComponent.module.css'; // Make sure to create and import the corresponding CSS module
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context'; // Update the path as needed


function EditPersonalInfoComponent() {
    const authCtx = useContext(AuthContext);
    const [editedUser, setEditedUser] = useState(authCtx.user || {});
  
    useEffect(() => {
      // If the user info updates in the context, update the local state
      if (authCtx.user) {
        setEditedUser(authCtx.user);
      }
    }, [authCtx.user]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would handle updating the user information
        // For example, you might call an API to update the user data
        // Then you would update the context with the new user data
        authCtx.setUser(editedUser);
      };

    return (

    <form className={classes.form} onSubmit={handleSubmit}>
        <div>
            <h1>Edit Personal Info</h1>
        </div>
        <div className={classes.formGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
            id="firstName"
            name="firstName"
            type="text"
            value={authCtx.user.firstName}
            onChange={handleChange}
        />
        </div>

        <div className={classes.formGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input
            id="lastName"
            name="lastName"
            type="text"
            value={authCtx.user.lastName}
            onChange={handleChange}
        />
        </div>

        <div className={classes.formGroup}>
        <label htmlFor="gender">Gender</label>
        <select
            id="gender"
            name="gender"
            value={authCtx.user.gender}
            onChange={handleChange}
        >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        </div>

        <div className={classes.formGroup}>
        <label htmlFor="age">Age</label>
        <input
            id="age"
            name="age"
            type="number"
            value={authCtx.user.age}
            onChange={handleChange}
        />
        </div>

        <div className={classes.formGroup}>
        <label htmlFor="additionalData">Additional Data</label>
        <textarea
            id="additionalData"
            name="additionalData"
            value={authCtx.user.additionalData}
            onChange={handleChange}
        />
        </div>

        <button type="submit" className={classes.saveButton}>Save</button>
    </form>
          
    );
}

export default EditPersonalInfoComponent;
