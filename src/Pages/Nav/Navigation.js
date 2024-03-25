import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNamees from '../Nav/Nav.module.css';
import Logo from '../../Images/Admin Logo.svg';
import classes from '../Nav/Nav.module.css';
import 'boxicons'
// import { useState } from 'react';


function Navigation() {
  const [isNavMenuVisible, setNavMenuVisibility] = useState(false);


 



  return (
    <div className={classNamees.body}>
          <div className={classes.container}>
            <div className={classes.imageContainer}>
              <img src={Logo} alt="Logo" />
            </div>
           
      </div>
    </div>
  )
}

export default Navigation