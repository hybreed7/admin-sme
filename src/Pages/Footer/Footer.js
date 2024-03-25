import React from "react";
import { NavLink } from 'react-router-dom';
import Logo from '../../Images/Logo.png';
import instagram from '../../Images/Instagram.png';
import twitter from '../../Images/Twitter.png';
import facebook from '../../Images/Facebook.png';
import linkedin from '../../Images/Linkedin.png';
import send from '../../Images/send.png';
import classes from '../Footer/Footer.module.css';

function Footer() {

    return (
        <div className={classes.entirebody}>
            <div className={classes.firstdiv}>
            <NavLink to ={'/'}>  <img src={Logo} className={classes.Logo} alt="Logo" /></NavLink>
                <p className={classes.firstp}>Copyright © 2023 Promix</p>
                <p className={classes.firstpp}>All rights reserved</p>
                <div className={classes.smediaicons}>
                <NavLink to ={'#'}><img src={instagram} className={classes.ig} alt="smedia" /></NavLink>
                <NavLink to ={'#'}><img src={twitter} className={classes.twitter} alt="smedia" /></NavLink>
                <NavLink to ={'#'}><img src={linkedin} className={classes.linkedin} alt="smedia" /></NavLink>
                <NavLink to ={'#'}><img src={facebook} className={classes.facebook} alt="smedia" /></NavLink>
                </div>
            </div>
            <div className={classes.fckngptags}>
                <div className={classes.seconddiv}>
                    <p className={classes.headp}>Product</p>
                    <NavLink to ={'#'}><p className={classes.bodyp}>Individual</p></NavLink>
                    <NavLink to ={'#'}><p className={classes.bodyp}>Businesses</p></NavLink>
                    <NavLink to ={'#'}><p className={classes.bodyp}>Request Demo</p></NavLink>
                    <NavLink to ={'#'}><p className={classes.bodyp}>Pricing</p></NavLink>
                </div>
                <div className={classes.thirddiv}>
                <p className={classes.headp}>Legal</p>
                <NavLink to ={'#'}><p className={classes.bodyp}>Privacy Policy</p></NavLink>
                <NavLink to ={'#'}><p className={classes.bodyp}>Terms of Service</p></NavLink>
                </div>
                
                <div className={classes.fourthdiv}>
                <p className={classes.headp}>Resources</p>
                <NavLink to ={'#'}><p className={classes.bodyp}>FAQS</p></NavLink>
                <NavLink to ={'#'}><p className={classes.bodyp}>Blog</p></NavLink>
                <NavLink to ={'#'}><p className={classes.bodyp}>Career</p></NavLink>
                <NavLink to ={'#'}><p className={classes.bodyp}>Customer Stories</p></NavLink>
                </div>
                <div className={classes.fifthdiv}>
                <p className={classes.headp}>Contact us</p>
                    <p className={classes.bodyp}>info@brookessoftware.com</p>
                    <p className={classes.bodyp}>+234 816 124 1827
                    , +234 806 020 2011</p>
                    <img src={send} className={classes.send} alt="icon" />
                    <input className={classes.fotrinput} placeholder="Your email address"></input>
                </div>
            </div>
        </div>

    )
}

export default Footer