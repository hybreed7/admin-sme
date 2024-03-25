import React, { useState, useEffect } from "react";
import classes from '../SignUp/Signup.module.css'
import Footer from '../Footer/Footer';
import Navigation from '../Nav/Navigation';
import { NavLink, useLocation } from 'react-router-dom';
import Check from '../../Images/Check-icon.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";


function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedPlan = location.state?.selectedPlan;
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false);

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken');

            if (value !== null) {
                setBearer(value);
                // setAuthenticated(true);
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };

    useEffect(() => {
        readData();
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    };

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const responses = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-all-plans`
            );
    
            const planss = responses.data?.data;
            // console.log(planss, "here");
            setPlans(planss);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            setPlans([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchPlans();
    }, []);
    



    const handleRegistration = async () => {
        setLoad(true);
        try {
            const responses = await axios.post(
                `https://api-sme.promixaccounting.com/api/v1/register`,
                {
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword,
                    name: fullName,
                    phone: phone,
                    company_name: companyName,
                    company_email: companyEmail,
                    company_phone_number: companyPhoneNumber,
                    plan_id: selectedOption,
                    address: address
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
    
            const target  = responses.data.data.url;
            console.log(target);
    
            if (selectedOption === "1") {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'Proceed to login page?',
                    icon: 'success',
                    confirmButtonText: 'Proceed to login',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
            } else {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'Proceed to payment?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Proceed to payment',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Open a new tab with the payment URL
                        window.open(target, '_blank');
                    }
                });
            }
    
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setCompanyEmail('');
            setCompanyName('');
            setCompanyPhoneNumber('');
            setAddress('');
            setFullName('');
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response.data.message,
            });
            console.log(error.response.data.message);
        } finally {
            setLoad(false);
        }
    };
    


    const [selectedOption, setSelectedOption] = useState('');
    const [selectedValidity, setSelectedValidity] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSelectChange1 = (event) => {
        setSelectedValidity(event.target.value);
    };

    const getDescription = () => {

        if (selectedPlan && selectedPlan.id === 1) {
            return (
                <div className={classes.pricingshi}>
                    <h1 className={classes.myh1}>{selectedPlan.yearly === "0.00"
    ? "₦0.00/30 days" : `₦ ${parseFloat(selectedPlan.yearly).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}/year`}
    </h1>
                    <p className={classes.myp}>{selectedPlan.name}</p>
                    <p className={classes.my2p}>{selectedPlan.use}</p>
                    <div className={classes.myhp}>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            {selectedPlan.priviledges[0]}
                        </p>
                        <p className={classes.mysubp}>
                            {selectedPlan.priviledges.slice(1).map((privilege, index) => (
                                    <p key={index} className={classes.mysubp}>
                                        <img src={Check} className={classes.Check} alt="Check-icon" />
                                        {privilege}
                                    </p>
                                ))}
                        </p>
                    </div>
                </div>
            );
        } else if (selectedPlan && selectedPlan.id === 2) {
            return (
                <div className={classes.pricingshi}>
                    <h1 className={classes.myh1}>{selectedPlan.yearly === "0.00"
    ? "₦0.00/30 days" : `₦ ${parseFloat(selectedPlan.yearly).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}/year`}</h1>
                    <p className={classes.myp}>{selectedPlan.name}</p>
                    <p className={classes.my2p}>{selectedPlan.use}</p>
                    <div className={classes.myhp}>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            {selectedPlan.priviledges[0]}
                        </p>
                        <p className={classes.mysubp}>
                            {selectedPlan.priviledges.slice(1).map((privilege, index) => (
                                    <p key={index} className={classes.mysubp}>
                                        <img src={Check} className={classes.Check} alt="Check-icon" />
                                        {privilege}
                                    </p>
                                ))}
                        </p>
                    </div>
                </div>
            );
        } else if (selectedPlan && selectedPlan.id === 3) {
            return (
                <div className={classes.pricingshi}>
                    <h1 className={classes.myh1}>{selectedPlan.yearly === "0.00"
    ? "₦0.00/30 days" : `₦ ${parseFloat(selectedPlan.yearly).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}/year`}</h1>
                    <p className={classes.myp}>{selectedPlan.name}</p>
                    <p className={classes.my2p}>{selectedPlan.use}</p>
                    <div className={classes.myhp}>
                        <p className={classes.mysubp}>
                            <img src={Check} className={classes.Check} alt="Check-icon" />
                            {selectedPlan.priviledges[0]}
                        </p>
                        <p className={classes.mysubp}>
                            {selectedPlan.priviledges.slice(1).map((privilege, index) => (
                                    <p key={index} className={classes.mysubp}>
                                        <img src={Check} className={classes.Check} alt="Check-icon" />
                                        {privilege}
                                    </p>
                                ))}
                        </p>
                        
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
                            <label htmlFor="myInput" className={classes.label}>Full Name</label> <br></br>
                            <input type="text" className={classes.myinput} placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Email</label> <br></br>
                            <input type="email" className={classes.myinput} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Phone Number</label> <br></br>
                            <input type="number" className={classes.myinput} placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        
                        <div className={classes.inputfield}>
                            <label htmlFor="myInput" className={classes.label}>Password</label> <br></br>
                            <input type="text" className={classes.myinput} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        </div>
                        <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Confirm password</label> <br></br>
                                <input type="text" className={classes.myinput} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                    </div>
                    <div className={classes.theinputs} style={inlineStyles} >
                        <div className={classes.inputfield}>
                        <div className={classes.inputfield}>
                            <label  className={classes.label}>Company Name</label> <br></br>
                            <input type="text" className={classes.myinput} placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                            <div className={classes.inputfield}>
                                <label  className={classes.label}>Company Phone Number</label> <br></br>
                                <input type="number" className={classes.myinput} placeholder="Enter Company Phone Number" value={companyPhoneNumber} onChange={(e) => setCompanyPhoneNumber(e.target.value)} />
                            </div>

                            <div className={classes.inputfield}>
                                <label  className={classes.label}>Company Email</label> <br></br>
                                <input type="email" className={classes.myinput} placeholder="Enter company email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
                            </div>
                            <div className={classes.inputfield}>
                                <label  className={classes.label}>Company Address</label> <br></br>
                                <input type="text" className={classes.myinput} placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            
                            {/* <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Company Address</label> <br></br>
                                <input type="text" className={classes.myinput} placeholder="Enter Company Address" />
                            </div> */}
                            
                            {/* <div className={classes.inputfield}>
                                <label htmlFor="myInput" className={classes.label}>Select Validity</label> <br></br>
                                <select className={classes.myinput} value={selectedValidity} onChange={handleSelectChange1}>
                            <option value="" >Select validity</option>
                            <option value="1" >Monthly</option>
                            <option value="2" >Yearly</option>
                        </select>
                            </div> */}
                        </div>

                    </div>



                    <div className={classes.pricingshi}>
                        {getDescription()}
                        <label  className={classes.label}>Confirm your Package</label> <br />
                        <select className={classes.myinput} value={selectedOption} onChange={handleSelectChange}>
                            <option value="" >Select package</option>
                            {plans.map((item) =>
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            )}
                        </select>
                    </div>
                </div>


                <button type="button" className={classes.prcdbtn} onClick={handleRegistration}>
                    {load ? (
                        <>
                            <Spinner size='lg' />
                            <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                        </>
                    ) : (
                        "Signup"
                    )}
                </button>
            </div>
            <Footer />
        </div>

    )
}

export default SignUp;