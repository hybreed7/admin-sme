import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { InfoFooter } from '../../InfoFooter';
import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './Registration.module.css';
import favicon from '../../Images/faviconn.png'

function Registration() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [applicationsLoading, setApplicationsLoading] = useState(false)
  const [applications, setApplications] = useState([]);

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


  const fetchApplications = async () => {
    setApplicationsLoading(true);
    try {
      const response = await axios.get('https://api-smesupport.ogunstate.gov.ng/api/fetch-all-applications', { headers });
      const fetchedApplication = response.data?.data;
      setApplications(fetchedApplication);
  



      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        
        navigate('/login');
      } else {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setApplications([]);
    }
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchApplications();
        
    }
  }, [bearer]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

 
  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  const handleEyeClick = (id) => {

    const foundBooking = tableData.find(item => item.id === id);
    //  console.log(foundBooking);
    navigate('/edit_booking', { state: { selectedBooking: foundBooking } });
    setEyeClicked(true);
  };

  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/destroy?id=${id}`, { headers });
     
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      setTrashClicked(true);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(errorStatus);
    }
  };

  const editUser = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/update',
        {
          name: fullName1,
          // id: deptId, 
          email: email1,
          phone_no: phone1,
          role: selectedRole
        },
        { headers }
      );

      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });

      // console.log(response.data);
    } catch (error) {
      const errorStatus = error.response?.data?.message || 'An error occurred';

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const filteredData = applications.filter(item => item.user?.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const totalEntries = filteredData.length;
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  const displayedData = filteredData.slice(startIndexx - 1, endIndexx);

 
  

  return (

    <div style={{marginTop:'8rem',}}>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

            <AdminHeaderNav />
            <div className='newBody'>
              <div className='newWidth'>

            {/* <!--Content Header (Page header)--> */}
            <div className="content-header row align-items-center m-0">

              {/* <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "flex-end",
                    display: "flex",
                    marginLeft: "auto",
                  }}
                >
                  <Button variant="success" onClick={handleCreate}>
                    Add New Booking
                  </Button>
                </div>

              </nav> */}
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                  <div className="media-body">
                    <h1 className="font-weight-bold">Registrations</h1>
                    <small>View all registrations below...</small>
                  </div>
                </div>
              </div>
            </div>

            {/* <!--/.Content Header (Page header)--> */}
            <div className="body-content">
              <div className="row">

                <div className="col-lg-12 col-xl-6">
                  <div className="row">

                    <div className="col-md-6 col-lg-6">

                      {/* <!--Feedback--> */}

                    </div>
                    <div className="col-md-6 col-lg-6">

                      {/* <!--Balance indicator--> */}

                    </div>
                    <div className="col-md-6 col-lg-6">

                      {/* <!--Time on site indicator--> */}

                    </div>
                    <div className="col-md-6 col-lg-6">

                      {/* <!--Top Referrals--> */}

                    </div>
                    <div className="col-md-6 col-lg-6">

                      {/* <!--Sessions by device--> */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col-md-12 col-lg-12 col-xl-3 mb-4">
                  <div className="card">


                  </div>
                </div> */}



                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-resposive">
                        <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                          <div className={classes.greenbtn} style={{ display: 'flex', }}>
                            {/* <div>
                              <button>Copy</button>
                              <button>Excel</button>
                              <button>PDF</button>
                              <button className={classes.diffbtn}>Column visibility</button>
                            </div> */}
                            <div>
                              <label className="d-flex justify-content-start align-items-center">
                                Show
                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" value={entriesPerPage}
                                  onChange={(e) => {
                                    setEntriesPerPage(parseInt(e.target.value));
                                    setCurrentPage(1);
                                  }}>
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                </select>
                                entries
                              </label>
                            </div>
                          </div>
                          <div className="text-right modal-effect ">
                            <div id="DataTables_Table_0_filter" className="dataTables_filter">
                              <div className="d-flex justify-content-start align-items-center">
                                <div className="mr-2">Search:</div>
                                <input
                                  type="search"
                                  value={searchTerm}
                                  className="form-control form-control-sm"
                                  placeholder=""
                                  aria-controls="DataTables_Table_0"
                                  onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    // setCurrentPage(1);
                                  }}
                                />
                              </div>

                            </div>
                          </div>
                        </div>


                        {applicationsLoading ? (
                          <p>Fetching all registrations...</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ }}>
                                <tr>
                                  <th>S/N</th>
                                  <th>Name</th>
                                  <th>Date of birth</th>
                                  <th>Home Address</th>
                                  <th>Business Name</th>
                                  {/* <th>Bank Name</th> */}
                                  {/* <th>Amount</th> */}
                                  {/* <th>Status</th> */}
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{textAlign: "left" }}>
                                {displayedData.map((item, index) => (
                                  <tr key={index}>
                                    <td style={{textAlign: "left"}}>{index + 1}</td>
                                    <td style={{textAlign: "left"}}>{item.user?.name}</td>
                                    <td style={{textAlign: "left"}}>{item.user?.dob}</td>
                                    <td style={{textAlign: "left"}}>{item.user?.home_address}</td>
                                    <td style={{textAlign: "left"}}>{item.user?.company_name}</td>
                                    {/* <td style={{textAlign: "left"}}>{item.user?.bank_name}</td> */}
                                    {/* <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td> */}
                                    {/* <td style={{textAlign: "left"}}>{item.status}</td> */}
                                    <td>
                                      <div onClick={() => handleEyeClick(item.id)}  className="btn btn-success-soft btn-sm mr-1">
                                        <i className="far fa-eye"></i>
                                      </div>
                                      {/* <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                        <i className="far fa-trash-alt"></i>
                                      </div> */}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div className={classes.endded}>
                          <p>
                            Showing {startIndexx} to {endIndexx} of {totalEntries} entries
                          </p>
                          <div style={{ display: 'flex' }}>
                            <button
                              style={{ border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginRight: 10, cursor: "pointer" }}
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                            {[...Array(totalPages)].map((_, page) => {
                              // Show only 5 pages or less if available
                              if (page < 5 || page === currentPage - 1 || page === totalPages - 1) {
                                return (
                                  <button
                                    key={page + 1}
                                    style={{
                                      marginLeft: '0.4rem',
                                      marginRight: '0.4rem',
                                      fontSize: '14px',
                                      fontFamily: 'nunito',
                                      fontWeight: 400,
                                      color: page + 1 === currentPage ? '#ffffff' : '#000',
                                      backgroundColor: page + 1 === currentPage ? '#28a745' : 'gainsboro',
                                      height: '2.5rem',
                                      borderRadius: '89px',
                                      padding: '0.5rem',
                                      border: 'none',
                                      width: '40px',
                                      cursor: "pointer"
                                    }}
                                    onClick={() => setCurrentPage(page + 1)}
                                  >
                                    {page + 1}
                                  </button>
                                );
                              }
                              return null;
                            })}
                            <button
                              style={{ cursor: "pointer", border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginLeft: 10 }}
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </div>
                        </div>

                        

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/.body content--> */}
          </div>
          {/* <!--/.main content--> */}
          </div>
          </div>
          <InfoFooter />
          {/* <!--/.footer content--> */}
          <div className="overlay"></div>
        </div>
        {/* <!--/.wrapper--> */}


      </div>
    </div>

  );
}

export default Registration;