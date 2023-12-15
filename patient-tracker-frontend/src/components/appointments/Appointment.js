import { useContext } from 'react';
import classes from './Appointment.module.css';
import Card from '../ui/Card';
import FavoritesContext from '../../store/favorites-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function Appointment(props) {
    function confirmHandler() {
        console.log("Confirming appointment with id: " + props.id);
    }
    function cancelHandler() {
        console.log("Canceling appointment with id: " + props.id);
    }
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <p> <b>Patient Name:</b> {props.patientName} <br></br>
                        <b>Doctor Name:</b> {props.doctorName} <br></br>
                        <b>DateTime:</b> {props.datetime}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={confirmHandler} className={classes.confirm}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>



                    <button onClick={cancelHandler} className={classes.cancel}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </Card>
        </li>
    );
}

export default Appointment;