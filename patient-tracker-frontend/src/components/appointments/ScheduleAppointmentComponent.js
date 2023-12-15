import React from 'react';
import classes from './ScheduleAppointmentComponent.module.css'; // Make sure to create and import the corresponding CSS module

function ScheduleAppointmentComponent(props) {
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission, e.g., sending data to a server
    console.log("Form submitted");
  };

  return (
    <div className={classes.scheduleAppointment}>
      <h1>Schedule Appointment</h1>
      <form onSubmit={handleSubmit}>

        <div className={classes.formControl}>
          <label htmlFor="reason">Reason of appointment</label>
          <input type="text" id="reason" name="reason" required />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="patientName">Patient Name</label>
          <select id="patientName" name="patientName" required>
            {/* Options should be generated based on your patients data */}
            <option value="">Select</option>
            <option value="patient1">Patient 1</option>
            <option value="patient2">Patient 2</option>
            {/* ... more options */}
          </select>
          {/* <button className={classes.tooltip}>Tooltip</button> */}
        </div>

        <div className={classes.formControl}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" required />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" required />
          {/* <button className={classes.tooltip}>Tooltip</button> */}
        </div>

        <div className={classes.formControl}>
          <label htmlFor="details">Details</label>
          <textarea id="details" name="details" rows="5" required></textarea>
        </div>

        <div className={classes.formActions}>
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  );
}

export default ScheduleAppointmentComponent;
