import React from 'react';
import classes from './ReportFilterComponent.module.css'; // Your CSS module for this component

const ReportFilterComponent = ({ onFilter }) => {
  const handleSearchChange = (event) => {
    onFilter(event.target.value);
  };

  // Add more handlers for other filter types as needed

  return (
    <div className={classes.filterSection}>
      <div className={classes.filterControl}>
        <label htmlFor="search">Search</label>
        <input type="text" id="search" onChange={handleSearchChange} />
      </div>
      <div className={classes.filterControl}>
        <label htmlFor="category">Category</label>
        <select id="category" onChange={handleSearchChange}> {/* TODO: Handle category change */}
          <option value="">Select</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          {/* Add more categories */}
        </select>
      </div>
      <fieldset className={classes.filterControl}>
        <legend>Options</legend>
        {/* Dynamically generate these based on available options */}
        <label htmlFor="option1">
          <input type="checkbox" id="option1" name="option1" /> Option 1
        </label>
        <label htmlFor="option2">
          <input type="checkbox" id="option2" name="option2" /> Option 2
        </label>
        {/* Add more options */}
      </fieldset>
      <div className={classes.filterActions}>
        <button type="button" onClick={handleSearchChange}>Filter</button>{/*TODO: Handle filter action */}
      </div>
    </div>
  );
}

export default ReportFilterComponent
