import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Pages/Nav/Nav.module.css';
import Logo from '../Images/Admin Logo.svg';
import Avater from '../Images/avatar33.png';
import "./assets/plugins/bootstrap/css/bootstrap.min.css";
import "./assets/plugins/metisMenu/metisMenu.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/plugins/typicons/src/typicons.min.css";
import "./assets/plugins/themify-icons/themify-icons.min.css";
import "./assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "./style.css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoAdmin from '../Images/Admin Logo.svg'
import Swal from 'sweetalert2';

export const AdminHeaderNav = () => {
  const [bearer, setBearer] = useState('');
  const [name, setName] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [permittedHeaders, setPermittedHeaders] = useState([]);
  const [myCompanyName, setMyCompanyName] = useState('This Company');
  const [isAdmin, setIsAdmin] = useState(false);

  

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    readData();

    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('tobi');
      const value2 = await AsyncStorage.getItem('userEmail');
      const value3 = await AsyncStorage.getItem('userPhone');
      const thiscompanyName = await AsyncStorage.getItem('companyName');
      
      if (thiscompanyName !== null) {
        setMyCompanyName(thiscompanyName);
      }

      if (value !== null) {
        setBearer(value);
      }
      if (value1 !== null) {
        setName(value1);
      }
      if (value2 !== null) {
        setEmail(value2);
      }
      if (value3 !== null) {
        setPhone(value3);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
  
      navigate('/login');
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
  
      // console.log(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'An error occurred while logging out';
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorMessage,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    const retrieveAdminStatus = async () => {
      try {
        const permitted = await AsyncStorage.getItem('permissions');
        if (permitted) {
          setPermittedHeaders(permitted);
        }
        const adminStatus = await AsyncStorage.getItem('admin');
          setIsAdmin(adminStatus === 'true');
        
  
        
      } catch (error) {
        console.error('Error retrieving admin status:', error);
      }
    };

    retrieveAdminStatus();
  }, []);

  // console.log(isAdmin, "AMISEEING");

  return (
    <div className='fixed-top'>
      <div style={{ backgroundColor: "#F5F5F5" }}>
        <nav className="navbar-custom-menu navbar navbar-expand-lg m-0">
          <div className="sidebar-toggle-icon" id="sidebarCollapse">
            sidebar toggle<span></span>
          </div>

          <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <NavLink to={'/admin'} className="navbar-brand">
                <img src={LogoAdmin} style={{ width: 210, height: 200}} className={classes.logoAdmin}  />
              </NavLink>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <li className="nav-item dropdown user-menu" style={{ listStyle: 'none' }} >
                <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" style={{ paddingRight: '0' }} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-sharp fa-solid fa-user"></i>
                </NavLink>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-header d-sm-none">
                    <NavLink to={'#'} href="#" className="header-arrow"><i className="icon ion-md-arrow-back"></i></NavLink>
                  </div>
                  <div className="user-header">
                    <div className="img-user">
                      <img src={Avater} alt="Avater" />
                    </div>

                    <h6>{name}</h6>
                    <span>{email}</span>
                  </div>

                  <NavLink to={'/admin_onboarding'} href="#" className="dropdown-item"><i className="typcn typcn-user-outline"></i> My Profile</NavLink>
                  <NavLink to={'/EditProfile'} href="#" className="dropdown-item"><i className="typcn typcn-edit"></i> Edit Profile</NavLink>
                  <NavLink to={'/manage_user'} className="dropdown-item"><i className="typcn typcn-user-outline"></i> Manage User</NavLink>
                  {/* <NavLink to={'#'} href="#" className="dropdown-item"><i className="typcn typcn-arrow-shuffle"></i> Activity Logs</NavLink> */}
                  <NavLink to={'/ChangePassword'} href="#" className="dropdown-item"><i className="typcn typcn-cog-outline"></i> Change Password</NavLink>
                  <NavLink style={{cursor: "pointer"}} onClick={() => handleLogout()} className="dropdown-item"><i className="typcn typcn-key-outline"></i> Sign Out</NavLink>
                </div>
              </li>

              <div className="nav-clock">
                <div className="time">
                  <span className="time-hours">{hours}</span>
                  <span className="time-min">{minutes}</span>
                  <span className="time-sec">{seconds}</span>
                </div>
              </div>

            </div>

          </div>
        </nav>
      </div>

      <div style={{ backgroundColor: "#F5F5F5" }}>
        <nav className="navbar-custom-menu navbar-menu navbar-expand-lg m-0">
          <div className="sidebar-toggle-icon" id="sidebarCollapse">
            sidebar toggle<span></span>
          </div>

          <div className="d-flex mainMenuStyle">
            <div className='mainMenu'>
              <ul className="navbar-nav flex-row align-items-center ">


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink to={'/admin'} id="nav-color" style={{ paddingLeft: '0' }} className="nav-link active" aria-current="page" href="admin"><i className="fas fa-home"></i> Home</NavLink>
                    </li>

                    {/* {isAdmin && ( */}
  <li className="nav-item dropdown">
    <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i className="fa-solid fa-gear"></i> Admin
    </NavLink>
    <ul className="dropdown-menu">
      <li><NavLink to={"/role"} className="dropdown-item">Manage Roles</NavLink></li>
      <li><NavLink to={"/approval_level"} className="dropdown-item">Approval Levels</NavLink></li>
      <li><NavLink to={"/manage_user"} className="dropdown-item">Manage User</NavLink></li>
     
    </ul>
  </li>
{/* )} */}

{/* {!isAdmin && (
  <li className="nav-item dropdown">
    <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i className="fa-solid fa-gear"></i> Setup
    </NavLink>
    <ul className="dropdown-menu">
      {permittedHeaders.includes('view-role') && <li><NavLink to={"/role"} className="dropdown-item">Manage Roles</NavLink></li>}
      {permittedHeaders.includes('view-approval-level') && <li><NavLink to={"/approval_level"} className="dropdown-item">Approval Levels</NavLink></li>}
      {permittedHeaders.includes('view-user') && <li><NavLink to={"/manage_user"} className="dropdown-item">Manage User</NavLink></li>}
      {permittedHeaders.includes('view-category') && <li><NavLink to={"/category"} className="dropdown-item">Manage Category</NavLink></li>}
      {permittedHeaders.includes('manage-account') && <li><NavLink to={"/charts"} className="dropdown-item">Charts of Account</NavLink></li>}
      {permittedHeaders.includes('view-loan-account') && <li><NavLink to={"/loan_account"} className="dropdown-item">Manage Loan Account</NavLink></li>}
      {permittedHeaders.includes('view-savings-account') && <li><NavLink to={"/savings_account"} className="dropdown-item">Manage Savings Account</NavLink></li>}
    </ul>
  </li>
)} */}



                    <li className="nav-item dropdown">
                      <NavLink to={'/booking'} id="nav-toggle" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-file-invoice-dollar"></i> Registrations
                      </NavLink>
                      
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-file-invoice"></i> Loans
                      </NavLink>
                    </li>

                    <li className="nav-item dropdown">
                      <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-file-invoice"></i> Grants
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-file-invoice"></i> Approvals
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-file-invoice"></i> Disbursement
                      </NavLink>
                    </li>
                    
                    
                    
                    {/* <li className="nav-item dropdown">
                       
                       <NavLink to={'/Purchase_Delivery'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button"><i className="fa-solid fa-file-invoice"></i> Purchase Delivery</NavLink>
                      
                    </li> */}

                    {/* <li className="nav-item dropdown">
                      <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg><span data-key="t-extra-pages">Transactions</span> <div className="arrow-down"></div>
                      </NavLink>
                      <ul className="dropdown-menu" aria-labelledby="topnav-more" >
                        <li className="nav-item dropdown">
                          <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="nav-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span data-key="t-extra-pages" onClick={() => setShowPaymentsSubMenu(!showPaymentsSubMenu)}>Payments</span> <div className="arrow-down"></div>
                          </a>
                          {showPaymentsSubMenu && (
                            <div className="dropdown-menu" aria-labelledby="topnav-pages">
                              <a href="https://accounting.brookessoftware.com/admin/beneficiary" className="dropdown-item"> Manage Beneficiaries</a>
                              <a href="https://accounting.brookessoftware.com/admin/payment/bank" className="dropdown-item"> Manage Banks</a>
                              <a href="https://accounting.brookessoftware.com/admin/payment/voucher/payment_gazette" className="dropdown-item">Payment Gazette</a>

                              <a href="https://accounting.brookessoftware.com/admin/payment/voucher" className="dropdown-item">View Payment Voucher</a>
                              <a href="https://accounting.brookessoftware.com/admin/payment/schedule_of_payments" className="dropdown-item">Schedule Of Payments</a>

                              <div className="dropdown">
                                <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="manage-payment" role="button">
                                  <span data-key="t-forms">Manage Payment</span> <div className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="manage-payment">
                                  <a href="https://accounting.brookessoftware.com/admin/payment/voucher/pending_payment_list" className="dropdown-item">Pending</a>
                                  <a href="https://accounting.brookessoftware.com/admin/payment/voucher/approved_payment_list" className="dropdown-item">Approved</a>
                                </div>
                              </div>
                              <div className="dropdown">
                                <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="manage-Tax" role="button">
                                  <span data-key="t-forms">Manage Tax</span> <div className="arrow-down"></div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="manage-Tax">
                                  <a href="https://accounting.brookessoftware.com/admin/payment/tax" className="dropdown-item">Taxes</a>
                                  <a href="https://accounting.brookessoftware.com/admin/payment/tax/tax_deduction" className="dropdown-item">Tax Deductions</a>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>
                        <a href="https://accounting.brookessoftware.com/admin/receipts/school-income" className="dropdown-item" data-key="t-income">School Income </a>
                        <a href="https://accounting.brookessoftware.com/admin/receipts" className="dropdown-item" data-key="t-income">Income &amp; Revenue</a>
                        <a href="https://accounting.brookessoftware.com/admin/creditors" className="dropdown-item" data-key="t-school">Creditors List</a>
                        <a href="https://accounting.brookessoftware.com/admin/debtors" className="dropdown-item" data-key="t-school">Debtors List</a>
                        <div className="dropdown">
                          <a className="dropdown-item dropdown-toggle arrow-none" href="#" id="topnav-auth" role="button">
                            <span data-key="t-authentication">Bank Lodgement</span> <div className="arrow-down"></div>
                          </a>
                          <div className="dropdown-menu" aria-labelledby="topnav-auth">
                            <a href="https://accounting.brookessoftware.com/admin/lodgement/pending" className="dropdown-item" data-key="t-login">Pending</a>
                            <a href="https://accounting.brookessoftware.com/admin/lodgement/lodged" className="dropdown-item" data-key="t-register">Lodged</a>
                          </div>
                        </div>
                      </ul>
                    </li> */}

                  </ul>
                </div>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    </div>
  )
}
