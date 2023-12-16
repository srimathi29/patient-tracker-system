import React from 'react';
import { Link } from 'react-router-dom';
import classes from './SideNav.module.css';
const SideNav = ({ navItems }) => {
  return (
    <div className={classes.navbar}>
      <nav>
        <ul className={classes.navitems}>
          {navItems.map((item, index) => (
            <li className={classes.navitem} key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
