import React, { useState, useEffect } from 'react';
import classes from './SetNewPassword.module.css';
import { Link } from 'react-router-dom';
import Navigation from '../Nav/Navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import Signup from '../SignUp/SignUp';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swal from "sweetalert2";
import { Spinner, Button } from 'react-bootstrap';
import axios from "axios";
import crossedEyeIcon from '../../Images/eye-slash.png';

function SetNewPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleLogin = async () => {
        setLoading(true); // Set loading state to true
        try {
            const response = await axios.post('https://payroll.patna.ng/api/login', {
                email: email,
                password: password,
            });
            AsyncStorage.setItem('userToken', response.data.data?.token);
            AsyncStorage.setItem('userName', response.data.data?.user?.name);
            AsyncStorage.setItem('userEmail', response.data.data?.user?.email);
            AsyncStorage.setItem('userPhone', response.data.data?.user?.phone_no);
            console.log(response.data.user?.name)
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                // If there's no previous page, navigate to a default route
                navigate('/admin_onboarding');
            }
            console.log('Login successful', response.data);
            setEmail('');
            setPassword('');


        } catch (error) {
            const errorMessage = JSON.stringify(error.response?.data?.message || 'An error occurred');
            setErrorMessage(errorMessage);
            // Handle errors (e.g., display error message)
            console.error('Login failed', error);
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: error.response.data.message,
            });

        } finally {
            setLoading(false); // Set loading state back to false after handling the request
        }
    };


    const Continue = () => {
        navigate('/login')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isButtonDisabled) {
            handleLogin();
        }
    };

    const isButtonDisabled = !email || !password;

    return (
        <div>
            <Navigation />
            <div className={classes.body}>
                <div className={classes.main}>
                    <div className={classes.Login}>
                        <div className={classes.LoginHeader}>
                            <h2>Set New Password! </h2>
                            <p> Create a new password.</p>
                        </div>
                        <form>

                            <div>
                                <label> Password</label><br />
                                <div style={{ alignItems: 'center' }}>
                                    <div style={{ flex: 1, marginBottom: '15px' }}>
                                        <input type={showPassword ? 'text' : 'password'} className={classes.formInput} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}></input>
                                    </div>
                                    <button
                                        type="button"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            float: 'right',
                                            left: "-10px",
                                            marginTop: '-45px',
                                            position: 'relative',
                                            zIndex: 2
                                        }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                                        ) : (
                                            '👁️'
                                        )}
                                    </button>
                                </div>
                                <label className={classes.cnfpwd} >Confirm Password</label><br />
                                <div style={{ alignItems: 'center' }}>
                                    <div style={{ flex: 1, marginBottom: '15px' }}>
                                        <input type={showPassword ? 'text' : 'password'} className={classes.formInput} placeholder='Confirm your password' onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}></input>
                                    </div>
                                    <button
                                        type="button"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            float: 'right',
                                            left: "-10px",
                                            marginTop: '-45px',
                                            position: 'relative',
                                            zIndex: 2
                                        }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                                        ) : (
                                            '👁️'
                                        )}
                                    </button>
                                </div>
                                <label>Enter OTP</label><br />
                                <div style={{ alignItems: 'center' }}>
                                    <div style={{ flex: 1, marginBottom: '25px' }}>
                                        <input type={showPassword ? 'text' : 'password'} className={classes.formInput} placeholder='Enter OTP' onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}></input>
                                    </div>
                                    {/* <button
                                        type="button"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            float: 'right',
                                            left: "-10px",
                                            marginTop: '-45px',
                                            position: 'relative',
                                            zIndex: 2
                                        }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
                                        ) : (
                                            '👁️'
                                        )}
                                    </button> */}
                                </div>
                            </div>
                            

                            <Button className={classes.SignInBtn} onClick={Continue} >
                                {loading ? (
                                    <>
                                        <Spinner />
                                        <span style={{ marginLeft: '5px' }}>Signing in, Please wait...</span>
                                    </>
                                ) : (
                                    "Reset password"
                                )}
                            </Button>
                        </form>
                        
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SetNewPassword;