import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import classes from '../Pages/Nav/Nav.module.css'
import Logo from '../Images/logo-green.png';
import Avater from '../Images/avatar33.png';
import "./assets/plugins/bootstrap/css/bootstrap.min.css";
import "./assets/plugins/metisMenu/metisMenu.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/plugins/typicons/src/typicons.min.css";
import "./assets/plugins/themify-icons/themify-icons.min.css";
import "./assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "./style.css";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AdminHeadernavMainMenu = () => {
    const [bearer, setBearer] = useState('');
    const [name, setName] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

      
        return () => clearInterval(intervalId);
    }, []); 

    
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value1 = await AsyncStorage.getItem('userName');
          const value2 = await AsyncStorage.getItem('userEmail');
          const value3 = await AsyncStorage.getItem('userPhone');
      
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
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
      
      useEffect(() => {
        readData();
      }, []); 

    return (
        <div>
          {/* <div style={{backgroundColor:"#F5F5F5",}}>
              <nav className="navbar-custom-menu navbar navbar-expand-lg m-0">
              <NavLink to={'/admin'} className="navbar-brand" href="#"><img src={Logo} className={classes.Logo} /></NavLink>
              <NavLink ></NavLink>
              </nav
          </div> */}


          <div style={{ backgroundColor: "#F5F5F5",}}>
            <nav className="navbar-custom-menu navbar-menu navbar-expand-lg m-0">
              <div className="sidebar-toggle-icon" id="sidebarCollapse">
                  sidebar toggle<span></span>
              </div>

              <div className="d-flex" style={{ justifyContent: 'center', alignItems: 'center', width: '100%', gap:"70px", }}>
                  {/* <NavLink to={'/admin'} className="navbar-brand" ><img src={Logo} className={classes.Logo} style={{height: 25, width: 100}}/></NavLink> */}
                <div className='mainMenu'>
                    <ul className="navbar-nav flex-row align-items-center ">

                                            
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={'/admin'} id="nav-color" className="nav-link active" aria-current="page" href="admin"><i className="fas fa-home"></i> Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                            <i className="fa-solid fa-gear"></i>  Configuration & Setup</NavLink>
                            <ul className="dropdown-menu">
                            <li><NavLink to={"/manage_user"} className="dropdown-item">Manage User</NavLink></li>
                            <li><NavLink to={"/category"} className="dropdown-item">Manage Category</NavLink></li>
                            <li><NavLink to={"/role"} className="dropdown-item">Charts of Account</NavLink></li>
                            
                            </ul>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink to={'#'} id="nav-toggle" className="nav-link"     role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-file-invoice-dollar"></i> General Ledger
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle"     role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-file-invoice-dollar"></i> Receiveables
                            </NavLink>
                            <ul className="dropdown-menu main-dropdown">
                            <li><NavLink to={'/deductions'} className="dropdown-item">Customers</NavLink></li>
                            <li><NavLink to={'/view_deduction'} className="dropdown-item"> Invoices</NavLink></li>
                            
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-file-invoice"></i> Payables
                            </NavLink>
                            <ul className="dropdown-menu">
                            <li><NavLink to={'/allowance_type'} className="dropdown-item" >Suppliers/Beneficiaries</NavLink></li>
                            <li><NavLink to={'/allowance_spec'} className="dropdown-item" >Payment Voucher</NavLink></li>
                            <li><NavLink to={'/allowances'} className="dropdown-item" >Schedule of Payables</NavLink></li>
                        
                            
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-file-invoice"></i> Transactions
                            </NavLink>
                            <ul className="dropdown-menu">
                            <li><NavLink to={"/department"} className="dropdown-item">Income Journal Entries</NavLink></li>
                            <li><NavLink to={'/manage_user'} className="dropdown-item">Payment Journal Entries</NavLink></li>
                            <li><NavLink to={'/manage_user'} className="dropdown-item">Deposit / Lodgment</NavLink></li>
                            <li><NavLink to={'/manage_user'} className="dropdown-item">Income Excel upload</NavLink></li>
                            <li><NavLink to={'/manage_user'} className="dropdown-item">Payment Excel upload</NavLink></li>
                            
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-file-invoice"></i> Reports
                            </NavLink>
                            <ul className="dropdown-menu">
                            <li><NavLink to={'/allowance_type'} className="dropdown-item" >General Ledger</NavLink></li>
                            <li><NavLink to={'/allowance_spec'} className="dropdown-item" >Cashbook</NavLink></li>
                            <li><NavLink to={'/allowances'} className="dropdown-item" >Trial Balance</NavLink></li>
                            <li><NavLink to={'/allowances'} className="dropdown-item" >Income & Expenditure</NavLink></li>
                            <li><NavLink to={'/allowances'} className="dropdown-item" >Balance Sheet</NavLink></li>
                            <li><NavLink to={'/allowances'} className="dropdown-item" >Inflow</NavLink></li>
                            </ul>
                        </li>
                        
                        </ul>
                    </div>



                    <li className="nav-item dropdown user-menu" >
                        <NavLink to={'#'} id="nav-toggle" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-sharp fa-solid fa-user"></i> My Account
                        </NavLink>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-header d-sm-none">
                                <NavLink to={'#'} href="#" className="header-arrow"><i className="icon ion-md-arrow-back"></i></NavLink>
                            </div>
                            <div className="user-header">
                                <div className="img-user">
                                    {/* <img src={Avater} alt="Avater" /> */}
                                </div>
                                
                                <h6>{name}</h6>
                                <span>{email}</span>
                            </div>
                            
                            <NavLink to={'/admin_onboarding'} href="#" className="dropdown-item"><i className="typcn typcn-user-outline"></i> My Profile</NavLink>
                            <NavLink to={'/EditProfile'} href="#" className="dropdown-item"><i className="typcn typcn-edit"></i> Edit Profile</NavLink>
                            <NavLink to={'/manage_user'} className="dropdown-item"><i className="typcn typcn-user-outline"></i> Manage User</NavLink>
                            {/* <NavLink to={'#'} href="#" className="dropdown-item"><i className="typcn typcn-arrow-shuffle"></i> Activity Logs</NavLink> */}
                            <NavLink to={'/ChangePassword'} href="#" className="dropdown-item"><i className="typcn typcn-cog-outline"></i> Change Password</NavLink>
                            <NavLink to={'/login'} className="dropdown-item"><i className="typcn typcn-key-outline"></i> Sign Out</NavLink>
                        </div>
                    </li>
                    </ul>
                </div>

                  {/* <!--/.navbar nav--> */}
                  {/* <div className="nav-clock">
                      <div className="time">
                          <span className="time-hours">{hours}</span>
                          <span className="time-min">{minutes}</span>
                          <span className="time-sec">{seconds}</span>
                      </div>
                  </div> */}
                  {/* <!-- nav-clock --> */}
              </div>
            </nav>

            

          </div>
        </div>
        // </div>
        // </div>
    )
}
