import React from "react";

import classes from './Header.module.css';
import Navbar from "./Navbar";

function Header() {
    return (    
        <header className={classes.header}>
            <div className={classes.logo}>PTMS</div>
            <Navbar />
        </header>
    )
}


export default Header;