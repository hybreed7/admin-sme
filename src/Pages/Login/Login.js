import React, {useState, useEffect} from 'react';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import Navigation from '../Nav/Navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import Signup from '../SignUp/SignUp';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swal from "sweetalert2";
import {Spinner, Button} from 'react-bootstrap';
import axios from "axios";
import crossedEyeIcon from '../../Images/eye-slash.png';


function Login() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [showError, setShowError] = useState(false);
const navigate = useNavigate();
const location = useLocation();
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // const handleLogin = async () => {
  //   setLoading(true); 

  //   try {
  //     const response = await axios.post('https://api-payroll.promixaccounting.com/api/login', {
  //       email: email,
  //       password: password,
  //     });
  //     console.log(response, "After");
  //     AsyncStorage.setItem('userToken', response.data?.data?.token);
  //     AsyncStorage.setItem('userName', response.data?.data?.user?.name);
  //     AsyncStorage.setItem('userEmail', response.data?.data?.user?.email);
  //     AsyncStorage.setItem('userPhone', response.data?.data?.user?.phone_no);
  //     console.log(response.data?.user?.name);
  
  
  //     if (location.state && location.state.from) {
  //       navigate(location.state.from);
  //     } else {
       
  //       navigate('/admin');
  //     }
  
  //     console.log('Login successful', response?.data?.message);
  //     setEmail('');
  //     setPassword('');
  
  //   } catch (error) {
  //     const errorMessage = JSON.stringify(error.response?.message || 'An error occurred');
  //     setErrorMessage(errorMessage);
  
  //     console.error('Login failed', error.response?.message);
      
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Login failed',
  //       text: error.response?.data?.message || 'An error occurred',
  //     });
  
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 
  const handleLogin = async  () => {
    setLoading(true);
    try {
     const response = await axios.post('https://api-sme.promixaccounting.com/api/v1/login',
     {email: email,
    password: password}
     );
    //  console.log(response);
     const result = response.data?.data?.user?.name;
     const addresses = response.data?.data?.user?.company?.address;
     const phones = response.data?.data?.user?.company?.phone_number;
     const emails = response.data?.data?.user?.company?.email;
     const resultx = response.data?.data?.user?.email;
     const results = response.data?.data?.token;
     const permit = response.data?.data?.permissions;
     const isAdmin = response.data?.data?.user?.is_admin === "1";
     const companyName = response.data?.data?.company_name;
     AsyncStorage.setItem('permissions', permit);
     AsyncStorage.setItem('admin', isAdmin);
    AsyncStorage.setItem('companyName', companyName);
     AsyncStorage.setItem('tobi', result);
     AsyncStorage.setItem('userToken', results);
     AsyncStorage.setItem('userEmail', resultx);
     AsyncStorage.setItem('companyEmail', emails);
     AsyncStorage.setItem('companyPhone', phones);
     AsyncStorage.setItem('companyAddress', addresses);
     

     if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // If there's no previous page, navigate to a default route
      navigate('/admin');
    }
 
    } catch (error) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
      Swal.fire({
              icon: 'error',
              title: 'Login failed',
              text: errorMessage || 'An error occurred',
            });
      
    }
    setLoading(false);
  }
   
    const SignUp = () =>{
        navigate('/pricing')
     }

     const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !isButtonDisabled) {
        handleLogin();
      }
    };

    const isButtonDisabled = !email || !password;

  return (
    <div>
        <Navigation/>
        <div className={classes.body}>
            <div className={classes.main}>
                <div className={classes.Login}>
                    <div className={classes.LoginHeader}>
                        <h2>Log in </h2>
                        <p> Welcome back! Please enter your details.</p>
                    </div>
                    <form>
                        <div>
                            <label>Email</label><br/>
                            <input type='email' className={classes.formInput} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} ></input>
                        </div>
                        <div>
                            <label>Password</label><br/>
                            <div style={{alignItems: 'center'}}>
                            <div style={{flex: 1}}>
                            <input type={showPassword ? 'text' : 'password'} className={classes.formInput}  placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}></input>
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
                        </div>
                        <div className={classes.section}>
                            {/* <span>
                                <input type='radio'></input>
                                <p>Remember for 30 days</p>
                            </span> */}
                            <Link to={'/forgot_password'} className={classes.link}>Forgot password</Link>
                        </div>
                       
                        <Button className={classes.SignInBtn} onClick={handleLogin} disabled={isButtonDisabled}>
  {loading ? (
    <>
      <Spinner size='lg'/>
      <span style={{ marginLeft: '5px' }}>Signing in, Please wait...</span>
    </>
  ) : (
    "Sign in"
  )}
</Button>


                    </form>
                    <span className={classes.dntHvAcct}>
                        <p>Don’t have an account?</p>
                        <span onClick={SignUp}>Sign up</span>
                    </span>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Login