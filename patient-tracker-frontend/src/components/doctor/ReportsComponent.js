import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import classes from './ReportsComponent.module.css'; // Your CSS module for this component
import ReportFilterComponent from '../common/ReportFilterComponent';

const FilterSection = ({ onFilter }) => {
  // ... (no changes here)
};

const ReportsComponent = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

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

  return (
    <div className={classes.reportsComponent}>
      <div className={classes.reportsList}>
        {filteredReports.map(report => (
          <Card key={report.id}>
            <h3>{report.title}</h3>
            <p>{report.content}</p>
            {/* Add more report details here */}
          </Card>
        ))}
      </div>
      <ReportFilterComponent onFilter={handleFilter} />
    </div>
  );
};

export default ReportsComponent;
