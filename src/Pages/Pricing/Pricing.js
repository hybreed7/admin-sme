import React, { useState, useEffect } from 'react';
import classes from './Pricing.module.css'
import image from '../../Images/mockuppromix.png'
import arrowRight from '../../Images/arrow-right.png'
import Demo from '../../Images/Icon.png'
import Body from '../../Images/body-bg.png'
import Check from '../../Images/Check-icon.png'
import Handdrawn from '../../Images/HandDrawn2.png'
import Footer from '../Footer/Footer';
import Navigation from '../Nav/Navigation';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';


function Pricing() {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [bearer, setBearer] = useState('');
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


    const handleSignup = (selectedPlan) => {
        if (selectedPlan.no_of_users === "") {
            Swal.fire({
                icon: 'success',
                title: 'Contact Us',
                text: 'Please contact us on +2348060202011 for further registration process.'
            });
        } else {
            navigate(`/signup`, { state: { selectedPlan } });
        }
    };




    return (
        <div className={classes.body}>
            <Navigation />
            <div className={classes.pricingHero}>
                <div className={classes.content}>
                    <div>
                        <button className={classes.pricebtn}>Get started <img src={arrowRight} className={classes.arrowRight} alt="arrow-right" /></button>
                    </div>
                    <h1 className={classes.herotext}>Simple transparent pricing</h1>
                    <p className={classes.pherotext}>Choose the pricing that works for you and align to your business</p>
                </div>
            </div>

            <div className={classes.pricing}>
                {/* <div>
                    <p className={classes.mostpop}><img src={Handdrawn} className={classes.Handdrawn} alt="handdrawn-icon" />Most popular!</p>
                </div> */}
                {isLoading ? (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Spinner size='lg' style={{ marginTop: '50px' }} />
    <span style={{ marginTop: '10px' }}>Loading plans, Please wait...</span>
  </div>
) : (
                <div className={classes.pricingcards}>
                    {plans.map((item, index) => (
                        <div key={index} className={classes.basic}>
                            <h1 className={classes.myh1}>
                            {item.no_of_users === ""
    ? "Contact us"
    : item.yearly === "0.00"
        ? "₦0.00/30 days"
        : `₦${parseFloat(item.yearly).toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}/year`}


                            </h1>

                            <p className={classes.myp} >{item.name}</p>
                            <p className={classes.my2p} >{item.use}</p>
                            <div className={classes.myhp}>
                                <p className={classes.mysubp}>
                                    <img src={Check} className={classes.Check} alt="Check-icon" />
                                    {item.priviledges[0]}
                                </p>

                                {item.priviledges.slice(1).map((privilege, index) => (
                                    <p key={index} className={classes.mysubp}>
                                        <img src={Check} className={classes.Check} alt="Check-icon" />
                                        {privilege}
                                    </p>
                                ))}
                            </div>
                            <button onClick={() => handleSignup(item)} className={classes.mibtn}>Go For {item.name}</button>
                        </div>
                    ))}
                </div>
                  )}
            </div>

            <Footer />
        </div>
    )
}

export default Pricing 