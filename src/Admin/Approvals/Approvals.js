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
import classes from './Approvals.module.css';
import favicon from '../../Images/faviconn.png'
import SubIcon1 from '../../smeImgs/SubIcon1.svg';
import SubIcon2 from '../../smeImgs/SubIcon2.svg';
import SubIcon4 from '../../smeImgs/SubIcon4.svg';

function Approvals() {
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


  const fetchLoans = async () => {
    setApplicationsLoading(true);
    
    try {
      const response = await axios.get('https://api-smesupport.ogunstate.gov.ng/api/approved-loans', { headers });
      const fetchedApplication = response.data?.data;
      setApplications(fetchedApplication);
  
      console.log(response.data.data);
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
      fetchLoans();
        
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



  const handleView = async (id) => {
   
    try {
      const response = await axios.get(`https://api-smesupport.ogunstate.gov.ng/api/loan-details?id=${id}`, { headers });
      const applyInfo = response.data?.data;
      
   
     navigate('/view_approvals_loan1', {state: {selectedApplicant: applyInfo} });
      setEyeClicked(true);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
    }
  };

  const handleEyeClick = (id) => {
    const foundApproval = applications.find(item => item.id === id);

    if (foundApproval) {
      
        navigate('/view_loan_approval1', { state: { selectedApplicant: foundApproval } });
        setShow1(true);
        setEyeClicked(true);
    } else {
        console.error(`level with id ${id} not found`);
    }
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

  const totalApplications = applications.length;
  const pendingApplications = applications.filter(item => item.status === "Pending").length;
  const approvedApplications = applications.filter(item => item.approval_status === "Approved").length;
  
  

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
              <div style={{marginTop: 30}}/>
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                  <div className="media-body" >
                    <h1 className="font-weight-bold">Loan Application Approvals</h1>
                    <small>View all application approvals below...</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className={`${classes.gridBoxs} ${classes.gridSubgrid}`}>
                <div className={classes.subGridDetails}>
                    <div className={classes.iconCont}>
                    <img src={SubIcon4} alt='Icon'className={classes.img}/>
                        
                    </div>
                    <small>Total Applications</small>
                    <h1>{totalApplications.toLocaleString()}</h1>
                </div>
                <div className={classes.subGridDetails}>
                    <div className={classes.iconCont}>
                        <img src={SubIcon2} alt='Icon'className={classes.img}/>
                    </div>
                    <small>Total Pending Applications</small>
                    <h1>{pendingApplications.toLocaleString()}</h1>
                </div>
                <div className={classes.subGridDetails}>
                    <div className={classes.iconCont}>
                    <img src={SubIcon1} alt='Icon' className={classes.img}/>
                    </div>
                    <small>Total Approved Applications</small>
                    <h1>{approvedApplications.toLocaleString()}</h1>
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
                          <div className={classes.greenbtn}>
                            <div>
                              <button>Copy</button>
                              <button>Excel</button>
                              <button>PDF</button>
                              <button className={classes.diffbtn}>Column visibility</button>
                            </div>
                            <div>
                              <label className="d-flex justify-content-start align-items-center" style={{margin:'0'}}>
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
                          <p>Fetching all approved loan applications...</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ }}>
                                <tr>
                                  <th>S/N</th>
                                  <th>Name of Applicant</th>
                                  <th>Date of Application</th>
                                  <th>Amount</th>
                                  <th>Approval Status</th>
                                  <th>Approved by</th>
                                  <th>Approved Date</th>
                                  <th>Disbursement Status</th>
                                  <th>Disbursed by</th>
                                  <th>Disbursement Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{textAlign: "left" }}>
  {displayedData.length === 0 ? (
    <tr>
      <td colSpan="8" style={{textAlign: "center"}}>No loan has been approved yet</td>
    </tr>
  ) : (
    displayedData.map((item, index) => (
      <tr key={index}>
        <td style={{textAlign: "left"}}>{index + 1}</td>
        <td style={{textAlign: "left"}}>{item.user?.name}</td>
        <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
        <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
          minimumIntegerDigits: 1,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</td>
        <td > <Badge bg={item.approval_status === "Pending" ? 'warning' : item.approval_status === "Approved" ? 'success' : 'danger'}>
                        {item.approval_status}
                    </Badge></td>
                    <td>{item.approved_by?.name}</td>
                    <td>{item.approved_date}</td>
                    <td > <Badge bg={item.disbursement_status === "Awaiting" ? 'warning' : item.disbursement_status === "Disbursed" ? 'success' : 'danger'}>
                        {item.disbursement_status}
                    </Badge></td>
                    <td>{item.disbursed_by?.name}</td>
                    <td>{item.disbursed_date}</td>
        <td style={{whiteSpace: "nowrap"}}>
          <div onClick={() => handleEyeClick(item.id)}  className="btn btn-success-soft btn-sm mr-1">
            <i className="far fa-eye"></i>
          </div>
          <div  className="btn btn-danger-soft btn-sm">
            <i className="far fa-trash-alt"></i>
          </div>
          <div style={{marginLeft: 5}}  className="btn btn-primary-soft btn-sm">
            <i className="fa fa-pencil"></i>  
          </div>
        </td>
      </tr>
    ))
  )}
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

export default Approvals;