import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import Pdf from '../../Images/pdf.png'
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form  } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import classes from './ViewRegistration.module.css'


function ViewRegistration() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedApplicant } = location.state || {};
  console.log(selectedApplicant);


  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');

      if (value !== null) {
        setBearer(value);
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

  const goBack = () => {
    navigate(-1);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


 

  





 
  
 
  




 






  return (
    <div style={{ marginTop: '8rem', }}>
      <AdminHeaderNav />
      <div className='newBody'>
        <div className='newWidth'>
          <div className="wrapper">
            {/* <!-- Sidebar  --> */}


            {/* <!-- Page Content  --> */}
            <div className="content-wrapper">



              <div className="main-content">


                <div className="content-header row align-items-center m-0">


                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                     <Button style={{borderRadius: 0, marginTop: 20}} variant='success' onClick={goBack}> Go Back</Button>
                    </div>
                    <div style={{marginTop: 30}}/>
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div> */}
                  <div className="media-body" >
                    <h1 className="font-weight-bold">Details of {selectedApplicant[0].user?.name}</h1>
                    <small>View applicant's details below...</small>
                  </div>
                </div>
              </div>
                  </div>
                </div>
              </div>
              <div style={{marginTop: 30}}/>
              <div className="body-content">
  <div className="col-lg-12">
    <div className="card">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="card-body">
                <p style={{ marginTop: '20px', fontWeight: '700' }}>Personal Details</p>
                <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
                <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', }}>
                  <thead>
                    <tr>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Full Name</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Email Address</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Phone Number</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Date of birth</th>
                    </tr>
                  </thead>
                  <tbody className={classes.applicationTable}>
                  {selectedApplicant.map((item, index) => (
                                  <tr key={index}>
               
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left',  width: "25%"}}>{item.user?.name}</td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left' , width: "25%"}}>{item.user?.email} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.phone_number} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.dob} </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', }}>
                  <thead>
                    <tr>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Home Address</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Permanent Address</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Marital Status</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Local Government</th>
                    </tr>
                  </thead>
                  <tbody className={classes.applicationTable}>
                  {selectedApplicant.map((item, index) => (
                                  <tr key={index}>
               
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%"  }}>{item.user?.home_address}</td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%"}}>{item.user?.permanent_address} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%"}}>{item.user?.marital_status} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%"}}>{item.user?.local_govt} </td>
                    </tr>
                  ))}
                  </tbody>
                </table>

                {/* <p style={{ marginTop: '20px', fontWeight: '700' }}>Next of Kin details</p>
                <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">

                              <p style={{ marginTop: '30px', fontWeight: '700', }}>Business Details</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
                              <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', }}>
                  <thead>
                    <tr>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Business Name</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Business Address</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}> Business RC Number</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Business Email Address</th>
                    </tr>
                  </thead>
                  <tbody className={classes.applicationTable}>
                  {selectedApplicant.map((item, index) => (
                                  <tr key={index}>
               
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left',  width: "25%"}}>{item.user?.company_name}</td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left' , width: "25%"}}>{item.user?.business_address} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.rc_number} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                              <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', }}>
                  <thead>
                    <tr>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Date of Commencement</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Business Sector</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Ogun State Tax ID</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Business Permit ID</th>
                    </tr>
                  </thead>
                  <tbody className={classes.applicationTable}>
                  {selectedApplicant.map((item, index) => (
                                  <tr key={index}>
               
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left',  width: "25%"}}></td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left' , width: "25%"}}>{item.user?.sector} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.stin} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.business_premise_id}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                              <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', }}>
                  <thead>
                    <tr>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Number of Employees</th>
                    </tr>
                  </thead>
                  <tbody className={classes.applicationTable}>
                  {selectedApplicant.map((item, index) => (
                                  <tr key={index}>
               
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left',  width: "25%"}}></td>
                    </tr>
                  ))}
                  </tbody>
                </table>

                            </div>

                            <div style={{ marginLeft: '30px',alignItems: 'center' }}>
  <p style={{  fontWeight: '700' }}>Documents</p>
  <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
  <div style={{display: 'flex'}}>
  {(selectedApplicant[0]?.user?.bank_statement || selectedApplicant[0]?.user?.bank_statement_loan) ? (
    <>
      {selectedApplicant[0]?.user?.bank_statement && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', textAlign: 'center' }}>
          <span title={selectedApplicant[0]?.user?.bank_statement}>
            <img
              src={Pdf}
              alt="PDF Icon"
              style={{ width: '50px', height: '50px', cursor: 'pointer' }}
              onClick={() => window.open(selectedApplicant[0]?.user?.bank_statement, '_blank')}
            />
            <div style={{ marginTop: '5px' }}>
              {selectedApplicant[0]?.user?.bank_statement.length > 20
                ? `${selectedApplicant[0]?.user?.bank_statement.substring(0, 20)}...`
                : selectedApplicant[0]?.user?.bank_statement}
            </div>
          </span>
        </div>
      )}
      {selectedApplicant[0]?.user?.bank_statement_loan && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', textAlign: 'center' }}>
          <span title={selectedApplicant[0]?.user?.bank_statement_loan}>
            <img
              src={Pdf}
              alt="PDF Icon"
              style={{ width: '50px', height: '50px', cursor: 'pointer' }}
              onClick={() => window.open(selectedApplicant[0]?.user?.bank_statement_loan, '_blank')}
            />
            <div style={{ marginTop: '5px' }}>
              {selectedApplicant[0]?.user?.bank_statement_loan.length > 20
                ? `${selectedApplicant[0]?.user?.bank_statement_loan.substring(0, 20)}...`
                : selectedApplicant[0]?.user?.bank_statement_loan}
            </div>
          </span>
        </div>
      )}
    </>
  ) : (
    <p>No documents uploaded</p>
  )}
</div>
</div>
</div>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">
                              <p style={{ marginTop: '30px', fontWeight: '700', }}>Bank details</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />

                              <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', }}>
                  <thead>
                    <tr>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Bank Name</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Account Number</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>Account Name</th>
                      <th style={{ border: 'none', padding: '8px', textAlign: 'left' }}>BVN</th>
                    </tr>
                  </thead>
                  <tbody className={classes.applicationTable}>
                  {selectedApplicant.map((item, index) => (
                                  <tr key={index}>
               
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left',  width: "25%"}}>{item.user?.bank_name}</td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left' , width: "25%"}}>{item.user?.account_number} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.account_name} </td>
                      <td style={{ border: 'none', padding: '8px', textAlign: 'left', width: "25%" }}>{item.user?.bvn}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">
                            <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ }}>
                                <tr>
                                  <th>S/N</th>
                                  <th>Amount</th>
                                  <th>Date</th>
                                  <th>Type</th>
                                  <th>Mark as Paid</th>
                                </tr>
                              </thead>
                              <tbody style={{ textAlign: "left" }}>
  {selectedApplicant.map((item, index) => (
    <tr key={index}>
      <td style={{ textAlign: "left" }}>{index + 1}</td>
      <td style={{ textAlign: "right" }}>
        {parseFloat(item.amount).toLocaleString("en-US", {
          minimumIntegerDigits: 1,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td style={{ textAlign: "left" }}>{formatDate(item.created_at)}</td>
      <td style={{ textAlign: "left" }}>{item.type?.name}</td>
      <td style={{ textAlign: "center" }}>
        <Form>
          <Form.Check
            type="switch"
            id={`custom-switch-${index}`}
            label=""
           
          />
        </Form>
      </td>
    </tr>
  ))}
</tbody>;

                            </table>
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

          </div>
        </div>
      </div>
      <InfoFooter />
    </div>
  )
}

export default ViewRegistration;