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
import { Button, Spinner, Form, Accordion } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import { useLocation } from 'react-router-dom';
import { Document, Page } from 'react-pdf';


function ViewPayment() {
  const location = useLocation();
  const { selectedVoucher } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
 

//   useEffect(() => {
//     if (selectedVoucher && selectedVoucher.document) {
//         fetchDocumentFromAPI(selectedVoucher.document)
//             .then((document) => {
//                 setDocumentContent(document);
//             })
//             .catch((error) => {
//                 console.error('Error fetching document:', error);
//             });
//     }
// }, [selectedVoucher]);



  

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
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">View Payment Voucher </h1>
                          <small> ....</small>
                        </div>
                        <div style={{ marginBottom: 30 }}>
                          <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
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
        <Accordion.Header>View Payment Voucher Details</Accordion.Header>
        <Accordion.Body>
        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
    <tbody>
      <tr>
        <td style={{width: 300, fontWeight: "bold"}}>Description</td>
        <td>{selectedVoucher.description}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Particular</td>
        <td>{selectedVoucher.particular}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Date</td>
        <td>{selectedVoucher.date}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Total Tax Amount</td>
        <td>{parseFloat(selectedVoucher.total_tax_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Total Amount</td>
        <td>{parseFloat(selectedVoucher.total_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Contract Amount</td>
        <td>{parseFloat(selectedVoucher.contract_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>PV Number</td>
        <td>{selectedVoucher.pvnumber}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary</td>
        <td></td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary Account Name</td>
        <td></td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Beneficiary Account Number</td>
        <td></td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Payment Status</td>
        <td>{selectedVoucher.payment_status === "0" ? "Pending" : "Paid"}</td>
      </tr>
      <tr>
        <td style={{fontWeight: "bold"}}>Aproval Status</td>
        <td>{selectedVoucher.approval_status === "0" ? "Pending" : selectedVoucher.approval_status === "1" ? "Approved" : selectedVoucher.approval_status === "2" ? "Disapproved" : "null"}</td>
      </tr>
    </tbody>
  </table>
  </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
  <Accordion.Header>Uploaded Document</Accordion.Header>
  <Accordion.Body>
    {selectedVoucher && selectedVoucher.document ? (
      <Document
        file={selectedVoucher.document}
        onLoadSuccess={onDocumentLoadSuccess}
        onError={(error) => console.error('Error loading PDF:', error)}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    ) : (
      <p>No document available</p>
    )}
  </Accordion.Body>
</Accordion.Item>

    </Accordion>
                              

                              
                              

                              <div class="modal-footer">
                                <Button variant="success" >
                                  {isLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Approving, Please wait...</span>
                                    </>
                                  ) : (
                                    "Approve Payment"
                                  )}
                                </Button>

                                <Button variant="danger" >
                                  {isLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                    </>
                                  ) : (
                                    "Disapprove Payment"
                                  )}
                                </Button>
                                
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

export default ViewPayment