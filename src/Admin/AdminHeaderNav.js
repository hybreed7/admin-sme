import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Pages/Nav/Nav.module.css';
import Logo from '../Images/log ad.svg';
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

          <div className="d-flex newNavLogo">
            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
              <NavLink to={'/admin'} className="navbar-brand">
                <img src={Logo} className={classes.Logo} style={{ height: 125, width: 200 }} />
              </NavLink>
              
            {/* </div> */}

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





                    <li className="nav-item dropdown">
                      <NavLink to={'/applications'} id="nav-toggle" className="nav-link"   aria-expanded="false">
                        <i className="fa-solid fa-file-invoice-dollar"></i> Applications
                      </NavLink>
                      
                    </li>
                    <li className="nav-item">
                      <NavLink to={'/loans'} id="nav-toggle" className="nav-link"   aria-expanded="false">
                        <i className="fa-solid fa-file-invoice"></i> Loans
                      </NavLink>
                    </li>
                    
                    <li className="nav-item">
                      <NavLink to={'/grants'} id="nav-toggle" className="nav-link"   aria-expanded="false">
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