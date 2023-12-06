import { useNavigate } from "react-router-dom";
import classes from './NavigateButton.module.css';

const NavigateButton = ({ path, children, onClick }) => {
  let navigate = useNavigate();

  const handleNavigation = () => {
    navigate(path);
  }

  return (
    <div className={classes.actions}>
        <button className={classes.button} onClick={handleNavigation}>
            {children}
        </button>
    </div>
  );
}
export default NavigateButton;
