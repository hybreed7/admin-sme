import React, {useState, useEffect} from 'react';
import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
import Navigation from '../Nav/Navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import Signup from '../SignUp/SignUp';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swal from "sweetalert2";
import {Spinner, Button} from 'react-bootstrap';
import axios from "axios";
import crossedEyeIcon from '../../Images/eye-slash.png';
import ogunLogo from '../../Images/log ad.svg'


function SignIn() {
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

 
  const handleLogin = async  () => {
    setLoading(true);
    try {
     const response = await axios.post('https://api-smesupport.ogunstate.gov.ng/api/admin-login ',
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
    <div className={classes.generalBody}>
        <div className={classes.topNavLogo}>
            <div className={classes.TopLogo}>
                <img src={ogunLogo} alt='OgunLogo'/>
            </div>
        </div>
        {/* <Navigation/> */}
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
                    {/* <span className={classes.dntHvAcct}>
                        <p>Don’t have an account?</p>
                        <span onClick={SignUp}>Sign up</span>
                    </span> */}
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default SignIn;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import OnbImg from '../../Images/image bg.svg';
// import classes from './SignIn.module.css';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Spinner } from 'react-bootstrap';
// import crossedEyeIcon from '../../Images/eye-slash.png'
// import Swal from 'sweetalert2';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';


// const SignIn = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState({});
//     const [errorMessage, setErrorMessage] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [termsSelected, setTermsSelected] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isValidEmail, setIsValidEmail] = useState(true);
//     const [errorMessage1, setErrorMessage1] = useState('');
//     const location = useLocation();

//     const validateEmail = (email) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };

//     const handleEmailBlur = () => {
//         const isValid = validateEmail(email);
//         setIsValidEmail(isValid);
//         if (!isValid) {
//             setErrorMessage1('Invalid email');
//         } else {
//             setErrorMessage1('');
//         }
//     };

    

//     const handleLogin = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.post(
//                 `https://api-smesupport.ogunstate.gov.ng/api/admin-login`,
//                 {
//                     email: email,
//                     password: password,
//                 },
//             );
//     console.log(response.data.data.user);
            
//             const tobi = response.data?.data?.user?.name;
//      const phones = response.data?.data?.user?.phone_number;
//      const emails = response.data?.data?.user?.email;
//      const token = response.data?.data?.token;
     
//      AsyncStorage.setItem('email', emails);
//      AsyncStorage.setItem('phone', phones);
//      AsyncStorage.setItem('userToken', token);
//      AsyncStorage.setItem('tobi', tobi);     
//         navigate('/admin');
  

//         } catch (error) {
//             let errorMessage = 'An error occurred. Please try again.';
//             if (error.response && error.response.data && error.response.data.message) {
//                 if (typeof error.response.data.message === 'string') {
//                     errorMessage = error.response.data.message;
//                 } else if (Array.isArray(error.response.data.message)) {
//                     errorMessage = error.response.data.message.join('; ');
//                 } else if (typeof error.response.data.message === 'object') {
//                     errorMessage = JSON.stringify(error.response.data.message);
//                 }
//             }
//             setErrorMessage(errorMessage);
//             toast.error(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const isButtonDisabled = !email || !password ;

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleForgotPassword = () => {
//         navigate('/forgot_password');
//     };

 


//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !isButtonDisabled) {
//             handleLogin();
//         }
//     };

//     return (
//         <div className={classes.signin}>
//             <div className={classes.marketersImg}>
//                 <img src={OnbImg} className="leftonb-img" alt="img" />
//             </div>

//             <div className={classes.signContainer}>
//                 <p className={classes.headerText}>Log In</p>
//                 <p className={classes.subText}>to access your portal</p>
//                     <div style={{ marginTop: 20 }}>
//                     <ToastContainer />
                    
//                         <span className={classes.stId}> Email Address </span>
//                             <div className={classes.inputContainer}>
//                                 <input autoComplete='off' type="text" className={classes.snInput} placeholder="" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
//                             </div>
                            
//                     </div>

//                     <div style={{ marginTop: 20 }}>
//                         <span className={classes.stId}> Password </span>
//                         <div className={classes.passwordInputContainer}>
//                             <div className={classes.inputContainer}>
//                                 <input autoComplete='off' type={showPassword ? 'text' : 'password'} className={classes.snInput} placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
//                             </div>
//                             <button
//                                 type="button"
//                                 className={classes.passwordToggleButton}
//                                 onClick={togglePasswordVisibility}
//                             >
//                                 {showPassword ? (
//                                     <img src={crossedEyeIcon} alt="Hide Password" style={{ height: "20px", width: "20px" }} />
//                                 ) : (
//                                     '👁️'
//                                 )}
//                             </button>
//                         </div>
                    
//                         <p className={classes.forgotPassword} onClick={handleForgotPassword}>Forgot password</p>
//                     </div>

//                     <button className={classes.signinButton} style={{backgroundColor: isButtonDisabled ? "#acebc9" : "#2D995F", cursor: isButtonDisabled ? "default" : "pointer"}} onClick={handleLogin} disabled={isButtonDisabled}>
//                     {isLoading ? (
//                         <>
//                             <Spinner size='sm' />
//                             <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
//                         </>
//                     ) : (
//                         "Log In"
//                     )}
//                     </button>
                    
//             </div>

//         </div>


//     );
// }

// export default SignIn;