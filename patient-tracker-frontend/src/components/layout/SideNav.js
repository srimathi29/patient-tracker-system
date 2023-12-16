import React from 'react';
import classes from './SideNav.module.css';

const SideNav = ({ navItems, onNavItemSelect }) => {
  return (
    <div className={classes.navbar}>
      <nav>
        <ul className={classes.navitems}>
          {navItems.map((item) => (
            <li 
              className={classes.navitem} 
              key={item.identifier}
              onClick={() => onNavItemSelect(item.identifier)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
