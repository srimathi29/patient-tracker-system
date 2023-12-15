import classes from './MedicalRecordsComponent.module.css';
import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import AuthContext, { AuthContextProvider } from '../../store/auth-context';
import ReportFilterComponent from '../common/ReportFilterComponent';
import { useNavigate } from 'react-router-dom';


function MedicalRecordsComponent() {
    const authCtx = React.useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const navigate = useNavigate(); // To navigate to the report form page

    useEffect(() => {
        // Fetch reports and set state here
        // For now, we'll use dummy data

        //BACKEND CALL: fetch reports from backend
        const fetchedReports = [
            { id: 1, title: 'Report 1', content: 'Content for report 1' },
            { id: 2, title: 'Report 2', content: 'Content for report 2' },
            // ...more reports
        ];
        setReports(fetchedReports);
        setFilteredReports(fetchedReports);
    }, []);

    const handleFilter = (filterValue) => {
        // Filter logic here
        const filtered = reports.filter(report =>
            report.title.toLowerCase().includes(filterValue.toLowerCase())
        );
        setFilteredReports(filtered);
    };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // Handle file upload logic here
    };

    const navigateToAddReportForm = () => {
        navigate('/add-record'); // The path to your form page to add a report
    };

    return (
        <div>
            <h3> Medical Records Component History Component</h3>

            <div className={classes.reportsComponent}>
                {authCtx.user && (
                    <div className={classes.doctorInfo}>
                        <h2>{authCtx.user.firstName} {authCtx.user.lastName}</h2>
                        <img src={authCtx.user.img} alt={`${authCtx.user.firstName} ${authCtx.user.lastName}`} />
                    </div>
                )}

                <div className={classes.actionBar}>
                    <button onClick={navigateToAddReportForm}>Add Record</button>
                    {/* <label>
                        Upload File
                        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label> */}
                </div>
                <div className={classes.homePageContainer}>
                    <div className={classes.searchSection}>
                        <ReportFilterComponent onFilter={handleFilter} />
                    </div>
                    <div className={classes.appointmentsSection}>
                        <div className={classes.reportsList}>
                            {filteredReports.map(report => (
                                <Card key={report.id}>
                                    <h3>{report.title}</h3>
                                    <p>{report.content}</p>
                                    {/* Add more report details here */}
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MedicalRecordsComponent;