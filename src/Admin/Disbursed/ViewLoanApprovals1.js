import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form, Accordion, Badge, Modal } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function ViewLoanApprovals1() {
  const location = useLocation();
  const { selectedApplicant } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  





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

  
  // const handlePrintInvoice = () => {
  //   navigate('/print_voucher', { state: { selectedVoucher } });
  // };

  const handleApprove = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api-smesupport.ogunstate.gov.ng/api/onging-application',
        {
          id: selectedApplicant.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
  navigate('/approval_loans')
      // Display success message
      toast.success(response.data.message);
      console.log(response.data);
  
    } catch (error) {
      const errorStatus = error.response.data.message;
      toast.error(errorStatus);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisApprove = async () => {
 
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/payment_voucher/disapprove_voucher?id=${selectedApplicant.id}&description=${description}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      // console.log(response.data.message)
      navigate('/payment_voucher')
      // return
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      console.log(response.data);
  
    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  

  return (
    <div style={{ marginTop: '10rem', }}>
      <AdminHeaderNav />
      <div className='newBody'>
        <div className='newWidth'>
          <div className="wrapper">
            {/* <!-- Sidebar  --> */}


            {/* <!-- Page Content  --> */}
            <div className="content-wrapper">
              <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Reason for Disapproving</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Description</Form.Label>
                          <textarea
                          className="form-control"
                          rows="3" 
                          cols="50"
                          placeholder="Enter reason here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="success" onClick={handleDisApprove}>
                    {isLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
    </>
  ) : (
                "Disapprove Payment"
                      )}
                    </Button>
                  </Modal.Footer>
                </Modal>


              <div className="main-content">


                <div className="content-header row align-items-center m-0">
<div style={{marginTop: 30}} />
                  <div className="col-sm-12 header-title p-0">
                    <div className="media">
                      {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div> */}
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">Details of {selectedApplicant.user?.name} </h1>
                          <small> View applicant's details below...</small>
                        </div>
                        <div style={{ marginBottom: 30,  }}>
                          <Button style={{borderRadius: 0, }} variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <div className="body-content">



                <div className="col-lg-12">
                  <div className="card">
                    <div className="create-new-staff-card-header">
                      <div className="d-flex justify-content-between align-items-center">

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">

                            <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Personal Details</Accordion.Header>
        <Accordion.Body>
        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
    <tbody>
      <tr>
        <td style={{width: 300, fontWeight: "bold", textAlign: "left"}}>Full Name</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Email Address</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.email}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Phone Number</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.phone_number}</td>
      </tr>
      
     
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Date of birth</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.dob}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Home Address</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.home_address}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Permanent Address</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.permanent_address}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Marital Status</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.marital_status}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Local Government</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.localgovt?.name}</td>
      </tr>
    </tbody>
  </table>
  </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Business Details</Accordion.Header>
        <Accordion.Body>
        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
    <tbody>
      <tr>
        <td style={{width: 300, fontWeight: "bold", textAlign: "left"}}>Business Name</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.company_name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Business Address</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.business_address}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Business Rc Number</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.rc_number}</td>
      </tr>
      
     
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Business Email Address</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.business_email}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Date of Commencement</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.date_of_commencement}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Business Sector</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.sector}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Marital Status</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.marital_status}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Ogun State Tax ID</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.stin}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Business Permit ID</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.business_premise_id}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Number of Employees</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.no_of_employees}</td>
      </tr>
    </tbody>
  </table>
  </div>
        </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
  <Accordion.Header>Uploaded Document</Accordion.Header>
  <Accordion.Body>
  <iframe
  title={selectedApplicant.user?.bank_statement_loan || 'No document available'}
  src={selectedApplicant.user?.bank_statement_loan || ''}
  style={{ width: '100%', height: '500px', border: 'none' }}
  />
</Accordion.Body>



</Accordion.Item>
<Accordion.Item eventKey="3">
        <Accordion.Header>Bank Details</Accordion.Header>
        <Accordion.Body>
        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
    <tbody>
      <tr>
        <td style={{width: 300, fontWeight: "bold", textAlign: "left"}}>Bank Name</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.bank_name}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Account Number</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.account_number}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>Account Name</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.account_name}</td>
      </tr>
      
     
      <tr>
        <td style={{fontWeight: "bold", textAlign: "left"}}>BVN</td>
        <td style={{textAlign: "left"}}>{selectedApplicant.user?.bvn}</td>
      </tr>
    </tbody>
  </table>
  </div>
        </Accordion.Body>
        </Accordion.Item>



    </Accordion>
                              
    <div style={{justifyContent: "flex-start"}} class="modal-footer">
                                
                               
    {selectedApplicant.disbursement_status !== "Disbursed" && (
  <Button style={{borderRadius: 0}} variant="success" onClick={handleApprove}>
    {loading ? (
      <>
        <Spinner size='sm' />
        <span style={{ marginLeft: '5px' }}>Approving, Please wait...</span>
      </>
    ) : (
      "Disburse Loan"
    )}
  </Button>
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
              {/* <div className="body-content">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <InfoFooter />
    </div>
  )
}

export default ViewLoanApprovals1;