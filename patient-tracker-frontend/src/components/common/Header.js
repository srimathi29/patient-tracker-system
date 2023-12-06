import React from "react";

import classes from './Header.module.css';
import Navbar from "./Navbar";

function Header(props) {
    return (    
        <header className={classes.header}>
            <div className={classes.logo}>{props.title}</div>
            <Navbar role={props.role}/>
        </header>
    )
}


export default Header;