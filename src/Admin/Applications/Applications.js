import React, { useState, useEffect } from 'react';

import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";

import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../style.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { NavLink } from 'react-router-dom';

import { InfoFooter } from '../../InfoFooter';
import { Button, Modal, Form, Spinner , Badge} from 'react-bootstrap';
import classes from './Applications.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





function Applications() {
  const [user, setUser] = useState('');
  const [bearer, setBearer] = useState('');
  const [mycompanyName, setMyCompanyName] = useState('');
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigate = useNavigate();


  const readData = async () => {
    try {
      const detail = await AsyncStorage.getItem('tobi');
      const details = await AsyncStorage.getItem('userToken');

      if (detail !== null) {
        setUser(detail);
      }


      if (details !== null) {
        setBearer(details);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

  // ??
  let totalEntries = applications.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);


  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const startIdx = (currentPage - 1) * entriesPerPage + 1;
  const endIdx = Math.min(startIdx + entriesPerPage - 1, totalEntries);
  const displayedData = applications.slice(startIdx - 1, endIdx);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const fetchApplications = async () => {
    setApplicationsLoading(true);
    try {
      const response = await axios.get('https://api-smesupport.ogunstate.gov.ng/api/fetch-all-applications', { headers });
      const fetchedApplication = response.data?.data;
      setApplications(fetchedApplication);
  



      console.log(fetchedApplication);
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

    
      
      
    return (

    // <div className="fixed">
    <div style={{ marginTop: '9rem', }}>
      {/* <!-- #END# Page Loader --> */}
      <div></div>
      <div className="wrapper">

        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">
            <AdminHeaderNav />


            {/* <!--Content Header (Page header)--> */}
            <div className='newBody'>
              <div className='newWidth'>
                <div className="content-header row align-items-center m-0">

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                      {/* <div className="media-body">
                        <h1 className="font-weight-bold"> Welcome, {user} </h1>
                        <small>From now on you will start your activities.</small>
                      </div> */}

                    </div>
                  </div>
                </div>

                <div className="body-content">
    <div className="row">
        <div className="col-lg-12 col-xl-12">
            <div className="card mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20, marginTop: -40 }}>
                            <div className={classes.greenbtn} style={{ display: 'flex' }}>
                                {/* Green button content */}
                            </div>
                            <div className="text-right modal-effect">
                                {/* Modal effect content */}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <h4 className={classes.applyText}>Applications</h4>
                            </div>
                            <div className="col">
                              {/* <Form.Label>Filter</Form.Label> */}
                                <Form.Select aria-label="Select approval status">
                                    <option value="">Select Approval Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="disapproved">Disapproved</option>
                                </Form.Select>
                            </div>
                            <div className="col">
                            {/* <Form.Label>Filter</Form.Label> */}
                                <Form.Select aria-label="Select application type">
                                    <option value="">Select Application type</option>
                                    <option value="loans">Loans</option>
                                    <option value="grants">Grants</option>
                                </Form.Select>
                            </div>
                        </div>

                        {/* Table and pagination */}
                        {applicationsLoading ? (
                              <p>Fetching data...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead className='admin-table-head'  style={{ whiteSpace: 'nowrap'}}>
                                    <tr>
                                      <th>S/N</th>
                                      <th>NAME</th>
                                      <th>APPLICATION TYPE</th>
                                      <th>STATUS</th>
                                      <th>AMOUNT</th>
                                      <th>ACTIONS </th>
                                     
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap',  }}>
                                  {applications.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{textAlign: "left"}}>{index + 1}</td>
                                        <td style={{textAlign: "left"}}>{item.user?.name}</td>
                                        <td style={{textAlign: "left"}}>{item.type === 1 ? "Loan" : "Grant"}</td>
                                        <td><Badge bg={item.status === "Pending" ? 'warning' : item.status === "Approved" ? 'success' : 'danger'}>
                                        {item.status}
                                        </Badge>
                                        </td>
                                        <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                        <td><div   className="btn btn-success-soft btn-sm mr-1">
                                        <i className="far fa-eye"></i>
                                      </div></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <div className={classes.endded}>
                              <p>
                                Showing {startIdx} to {endIdx} of {totalEntries } entries
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
                                  if (page < 1 || page === currentPage - 1 || page === totalPages - 1) {
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

              </div>
            </div>
            {/* <!--/.body content--> */}
          </div>
          <InfoFooter />
          {/* <div className="overlay"></div> */}
        </div>
      </div>



    </div>

  );
}

export default Applications;