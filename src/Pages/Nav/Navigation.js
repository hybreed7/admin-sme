import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNamees from '../Nav/Nav.module.css';
import Logo from '../../Images/Logo.png';
import classes from '../Nav/Nav.module.css';
import 'boxicons'
// import { useState } from 'react';


function Navigation() {
  const [isNavMenuVisible, setNavMenuVisibility] = useState(false);

  const toggleNavMenu = () => {
    setNavMenuVisibility(!isNavMenuVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        // Apply the effect only for mobile view
        document.getElementById('navMenu').style.display = isNavMenuVisible ? 'flex' : 'none';
      } else {
        // Reset to default for desktop view
        document.getElementById('navMenu').style.display = 'flex';
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isNavMenuVisible]);



  return (
    <div className={classNamees.body}>
      <div className={classes.NavContainer}>
        <nav className={classes.Navbar}>
          {/* <div className="container-fluid" > */}
          <NavLink to={'/'} className="navbar-brand" href="#"><img src={Logo} className={classes.Logo} /></NavLink>
          <div className={classes.MenuContainer}>
            <ul id="navMenu" className={classes.navMenu}>
              <li className="nav-item">
                <NavLink to={'/landing_page'} className="nav-link active" aria-current="page" href="#">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={'/pricing'} className="nav-link" >Pricing</NavLink>
              </li>
              <div className={classes.topNavGroupbtns}>
                <button className={classes.LoginBtn}><NavLink to={'/Login'} >Login</NavLink></button>
                <button type="button" className={classes.SignUpBtn}  ><NavLink to={'/pricing'} >Sign Up</NavLink></button>
              </div>
            </ul>
          </div>
          <button className={classes.navbarToggler} type="button" onClick={toggleNavMenu}>
            <i className="bx bx-menu"></i>
          </button>

          {/* </div> */}
        </nav>
      </div>
    </div>
  )
}

export default Navigation