import React, { useState, useEffect,   } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate, useLocation} from 'react-router-dom';
import { Button, Spinner, Form, Select, Modal} from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import { InfoFooter } from '../../InfoFooter';

function ViewRequisition() {
    
    const [createLoading, setCreateLoading] = useState(false);
    const [createLoadings, setCreateLoadings] = useState(false);
    const [releasedLoading, setReleaseLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);
    const [itemDesc, setItemDesc] = useState([]);
    const [narration, setNarration] = useState('');
    const [totalQuantity, setTotalQuantity] = useState('');
    const [department, setDepartment] = useState('');
    const [buttonShow, setButtonShow] = useState(false);
    const [buttonShow1, setButtonShow1] = useState(false);
    // const [buttonShow2, setButtonShow2] = useState(false);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//   const navigate = useNavigate();
    
    const [approvalStatus, setApprovalStatus] = useState(null);
    const [description, setDescription] = useState(null);
    const location = useLocation();
    const { selectedRequisition } = location.state || {};
    const [requestId, setRequestId] = useState(selectedRequisition[0].request_id);
    const stocksArray = selectedRequisition.map(item => item.stocks);
    const reasons = selectedRequisition.map(item => item.description.length > 0 ? item.description[0].description : null);
const quantityArray = selectedRequisition.map(item => item.quantity);
console.log(selectedRequisition);
const formData = stocksArray.map((item, index) => ({
    itemsDescription: item.name,
    qty: quantityArray[index]
}));

    useEffect(() => {
        if (selectedRequisition[0].approval_status === "0" || selectedRequisition[0].approval_status === "2") {
        setButtonShow(false);
        } else {
        setButtonShow(true);
        }
    }, [selectedRequisition]);

    // useEffect(() => {
    //     setButtonShow1(selectedRequisition[0].approval_status === "1");
    //   }, [selectedRequisition]);

  
    useEffect(() => {
        const calcTotQty = () => {
            if (selectedRequisition) {
                const quantities = selectedRequisition.map(item => item.quantity);
                const totalQuant = quantities.reduce((total, qty) => total + parseFloat(qty) || 0, 0);
                setTotalQuantity(totalQuant.toString());
            } else {
                setTotalQuantity('');
            }
        };
    
        calcTotQty();
    }, [selectedRequisition]);
    
    // Ensure this useEffect runs only once to calculate the initial total quantity
    useEffect(() => {
        if (!totalQuantity) {
            const quantities = selectedRequisition?.map(item => item.quantity) || [];
            const totalQuant = quantities.reduce((total, qty) => total + parseFloat(qty) || 0, 0);
            setTotalQuantity(totalQuant.toString());
        }
    }, [selectedRequisition, totalQuantity]);
 
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/departments', { headers });
      const dept = response.data?.data;
      setTableData(dept);
    
    } catch (error) {
      const errorStatus = error.response?.data?.message;
    //   console.log(errorStatus);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItems = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/items/fetch-all', { headers });
      const ite = response.data?.data;
      setTableData1(ite);
    
    } catch (error) {
      const errorStatus = error.response?.data?.message;
    //   console.log(errorStatus);
      setTableData1([]);
    } finally {
      setIsLoading(false);
    }
  };


    


    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

   
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

    useEffect(() => {
        if (bearer) {
            fetchDepartments();
            fetchItems()
        }
    }, [bearer]);

    useEffect(() => {
        // Read user token when the component mounts
        readData();
      }, []);


    const ApproveRequest = async () => {

        setCreateLoading(true);
        try {
    // console.log(requestId, "inside");
        
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/stocks/approve-requisition?request_id=${requestId}`,
                
                    {headers}
            );
            // console.log(response.data.message)
            // return
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
            // console.log(response.data);
            

        } catch (error) {
            const errorStatus = error.response.data.message;
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: errorStatus,
            });
            console.log(error);
        } finally {
            setCreateLoading(false);
        }
        navigate('/requisition');
    };

    const handleDisApprove = async () => {
 
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/stocks/disapprove-requisition?request_id=${requestId}&description=${description}`,
            {headers}
          );
          // console.log(response.data.message)
          
          // return
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
        //   console.log(response.data);
        
      
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
        navigate('/requisition')
      };

    const releaseRequistion = async () => {
        console.log(headers)
        setReleaseLoading(true);
        try {
            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/stocks/release-requisition',
                {
                    request_id: requestId,
                },
                { headers }
              );
            console.log(response)
          // return
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
         //   console.log(response.data, "here");
        navigate('/requisition')
        } catch (error) {
          const errorStatus = error.response.data.message;
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: errorStatus,
          });
          console.log(error);
        } finally {
          setReleaseLoading(false);
        }
      };

    return (
        <div style={{ marginTop: '8rem', }}>
        <AdminHeaderNav />
        <div className='newBody'>
            <div className='newWidth'>
                <div className="wrapper">
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
                    <div className="content-wrapper">
                        <div className="main-content">
                            <div className="content-header row align-items-center m-0">

                                <div className="col-sm-8 header-title p-0">
                                    <div className="media">
                                        <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                        <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <h1 className="font-weight-bold">View Requisition </h1>
                                                <small>Complete the respective fields ....</small>
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


                                                        <div className="row">
                                                           
                                                            <div className="col-md-6">
                                                                <div className="form-group row">
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Department:</label>
                                                                    <div className="col-sm-9">
                                                                        <Form.Select name="department" className="form-control" required="" value={selectedRequisition[0].department?.id} onChange={handleDepartmentChange} disabled>
                                                                            <option value="">Choose Department</option>
                                                                            {tableData.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                            ))}
                                                                        </Form.Select>
                                                                    </div>

                                                                    <div style={{marginTop:'10px'}}/>
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Narration:</label>
                                                                    <div className="col-sm-9">
                                                                        <textarea rows="2" cols="50" className="form-control" value={selectedRequisition[0].narration} disabled
                                                                         />
                                                                        
                                                                    </div>
                                                                    {selectedRequisition[0].approval_status === "2" && (
  <>
    <div style={{ marginTop: '10px' }} />
    <label htmlFor="example-text-input" className="col-sm-3 col-form-label font-weight-400">Disapproval Reason:</label>
    <div className="col-sm-9">
      <textarea rows="2" cols="50" className="form-control" value={reasons} disabled />
    </div>
  </>
)}
                                                                </div>
                                                            </div>

                                                            
                                                        </div>

                                                        <div style={{ marginTop: 20 }} />
                                                        
                                                        <div className="row">
                                                            {/* <div className="col-md-6"> */}
                                                            <div className="table-responsive">
                                                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                    <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                        <tr>
                                                                            <th>Items Description</th>
                                                                            <th style={{width:'40%',}}>Quantity</th>
                                                                           
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                    {formData.map((row, index) => (
                                                                    <tr key={index}>
                                                                        <td>
                                                                        <input
                                                                                style={{ textAlign: "left" }}
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.itemsDescription}
                                                                                disabled
                                                                                
                                                                            />  
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                style={{ textAlign: "left" }}
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={row.qty}
                                                                                disabled
                                                                                
                                                                            />
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                ))}

                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                        </div>
                                                        <div style={{ marginTop: 20 }} />
                                                        <div className="col-md-11" style={{ width: '100%', padding: "0" }}>
                                                            <div className="form-group row justify-content-end">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Quantity:</label>
                                                                <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                    <input style={{textAlign: "right",}} className="form-control" type="number" value={totalQuantity} readOnly disabled/>
                                                                    {/* <input style={{ textAlign: "right", }} className="form-control" required="" type="number" value={totalQuantity} onChange={(e)=> setTotalQuantity(e.target.value) }  name="total" readOnly /> */}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        
                                                        
                                                        <div style={{justifyContent: "flex-start"}} className="modal-footer">
                                                             {selectedRequisition[0].approval_status === "0" && (
                                                            <Button style={{borderRadius: 0}} variant="success" onClick={ApproveRequest}>
                                                                {createLoading ? (
                                                                    <>
                                                                        <Spinner size='sm' />
                                                                        <span style={{ marginLeft: '5px' }}>Updating your requisition, Please wait...</span>
                                                                    </>
                                                                ) : (
                                                                    "Approve Requisition"
                                                                )}
                                                            </Button>
                                                             )}

                                                            {selectedRequisition[0].approval_status === "0" && (
                                                            <Button style={{borderRadius: 0}} variant="danger" onClick={handleShow} >
                                                                {createLoadings ? (
                                                                    <>
                                                                        <Spinner size='sm' />
                                                                        <span style={{ marginLeft: '5px' }}>Updating your requisition, Please wait...</span>
                                                                    </>
                                                                ) : (
                                                                    "Disapprove Requisition"
                                                                )}
                                                            </Button>
                                                            )}
                                                           {selectedRequisition[0].is_released !== "1" && selectedRequisition[0].approval_status === "1" && (
  <Button style={{borderRadius: "0", margin:'0'}} variant="primary" onClick={releaseRequistion}>
    {releasedLoading ? (
      <>
        <Spinner size='sm' />
        <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
      </>
    ) : (
      "Release Requisition"
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

                    </div>
                </div>
            </div>
        </div>
        <InfoFooter />
    </div>
    )
}

export default ViewRequisition;