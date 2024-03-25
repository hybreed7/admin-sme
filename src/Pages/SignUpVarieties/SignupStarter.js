import React, { useState } from "react";
import classes from '../../Pages/SignUpVarieties/SignupStarter.module.css';
import Footer from '../Footer/Footer';
import Navigation from '../Nav/Navigation';
import { NavLink } from 'react-router-dom';
import Check from '../../Images/Check-icon.png'



function SignupStarter() {
    const [selectedOption, setSelectedOption] = useState('option2');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const getDescription = () => {

        if (selectedOption === 'option2') {
            return (
                <div className={classes.pricingshi}>
                    <h1 className={classes.myh1}>₦10,000/mth</h1>
                    <p className={classes.myp}>Business plan</p>
                    <p className={classes.my2p}>Use For Commercial.</p>
                    <div className={classes.myhp}>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            Unlimited accounts
                        </p>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            All Auto Match Features
                        </p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Manual Matching Features</p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Reconciliation Report in Excel and PDF</p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Outstanding Items Report</p>
                    </div>
                </div>
            );
        } else if (selectedOption === 'option3') {
            return (
                <div className={classes.pricingshi}>
                    <h1 className={classes.myh1}>₦5,000/mth</h1>
                    <p className={classes.myp}>Standard plan</p>
                    <p className={classes.my2p}>Use For Personal.</p>
                    <div className={classes.myhp}>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            10 accounts
                        </p>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            All Auto Match Features
                        </p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Manual Matching</p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Reconciliation </p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Outstanding Items Report</p>
                    </div>
                </div>
            );
        } else if (selectedOption === 'option4') {
            return (
                <div className={classes.pricingshi}>
                    <h1 className={classes.myh1}>₦0/mth</h1>
                    <p className={classes.myp}>Starter plan</p>
                    <p className={classes.my2p}>Use Only For Personal.</p>
                    <div className={classes.myhp}>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            1 Accounts
                        </p>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            All Auto Match Features
                        </p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Manual Matching Features</p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Reconciliation Report in Excel and PDF</p>
                        <p className={classes.mysubp}><img src={Check} className={classes.Check} alt="Check-icon" />Outstanding Items Report</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const inlineStyles = {

        // marginTop: '24px',
    };

    return (
        <div>
            <Navigation />
            <div className={classes.signupent}>
                <div className={classes.signupHero}>
                    <div className={classes.content}>
                        <p className={classes.herotext}>Sign up</p>
                        <p className={classes.pherotext}>We believe Promix should be accessible<br></br>to all companies, no matter the size..</p>
                    </div>

                </div>
                <div className={classes.signupbody}>
                    <div className={classes.theinputs}>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>First Name</label> <br></br>
                            <input type="text" className={classes.myinput} placeholder="Enter your first name" />
                        </div>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Last Name</label> <br></br>
                            <input type="email" className={classes.myinput} placeholder="Enter your last name" />
                        </div>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Email</label> <br></br>
                            <input type="number" className={classes.myinput} placeholder="Enter your email" />
                        </div>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Phone Number</label> <br></br>
                            <input type="text" className={classes.myinput} placeholder="Enter Phone Number" />
                        </div>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Address</label> <br></br>
                            <input type="text" className={classes.myinput} placeholder="Enter address" />

                        </div>

                    </div>
                    <div className={classes.theinputs} style={inlineStyles} >
                        <div className={classes.inputfield}>
                            <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Company Name</label> <br></br>
                                <input type="number" className={classes.myinput} placeholder="Enter Company name" />
                            </div>

                            <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Company Email</label> <br></br>
                                <input type="email" className={classes.myinput} placeholder="Enter company email" />
                            </div>
                            <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Company Phone</label> <br></br>
                                <input type="text" className={classes.myinput} placeholder="Enter company email" />
                            </div>
                            <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Password</label> <br></br>
                                <input type="text" className={classes.myinput} placeholder="Create your password" />
                            </div>
                            <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Confirm password</label> <br></br>
                                <input type="text" className={classes.myinput} placeholder="Confirm your created password" />

                            </div>
                        </div>

                    </div>



                    <div className={classes.pricingshi}>
                        {getDescription()}
                        <label htmlFor="myInput" className={classes.label}>Select Package</label> <br />
                        <select className={classes.myinput} value={selectedOption} onChange={handleSelectChange}>
                            {/* <option value="" disabled>Select a package</option> */}
                            <option value="option2">Business</option>
                            <option value="option3">Personal</option>
                            <option value="option4">Standard</option>
                        </select>


                    </div>
                </div>
                <button type="button" className={classes.prcdbtn}><NavLink to={'/choose'} >Proceed to payment</NavLink></button>

            </div>
            <Footer />
        </div>

    )
}

export default SignupStarter; 