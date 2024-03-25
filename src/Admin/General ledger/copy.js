// import React from 'react'

// export default function copy() {
//   return (
//     <div>
      
//     </div>
//   )
// }




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
import { Button, Spinner, Modal, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import classes from './GeneralLedger.module.css'

function GeneralLedger() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', amount: '' }]);
  const [totalAmount, setTotalAmount] = useState('');
  const [tableData, setTableData] = useState([]);
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
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDateChange1 = (event) => {
    setSelectedEndDate(event.target.value);
  };

  const handleDebitChange = (event) => {
    selectedDebitAccount(event.target.value);
  };


  const calculateTotalAmount = () => {
    const total = formData.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setTotalAmount(total.toLocaleString('en-US', {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  };


  useEffect(() => {

    calculateTotalAmount();
  }, [formData]);


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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://payroll.patna.ng/api/admin/users', { headers });
      const results = response.data?.data?.users;
      setFullName1(results.name);
      setEmail1(results.email);
      setPhone1(results.phone_no);
      const roleOptions = response.data?.data?.roles;
      setRoles(roleOptions);
      setTableData(results);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (bearer) {
      fetchUsers();

    }
  }, [bearer]);

  const createUser = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://payroll.patna.ng/api/admin/users/create',
        {
          name: fullName,
          email: email,
          phone_no: phone,
          role: selectedRole
        },
        { headers }
      );
      fetchUsers();
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      console.log(response.data);

    } catch (error) {
      const errorStatus = error.response.name;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.name,
      });
      console.error(errorStatus);
    } finally {
      setLoading(false);
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


  const handleEyeClick = (id) => {

    const foundUser = tableData.find(item => item.id === id);


    const { name, email, phone_no, roles } = foundUser;


    setFullName1(name || '');
    setEmail1(email || '');
    setPhone1(phone_no || '');

    const selectedRole = roles.length > 0 ? roles[0].id : '';
    setSelectedRole(selectedRole);

    setShow1(true);
    setEyeClicked(true);
  };


  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`https://payroll.patna.ng/api/admin/users/destroy?id=${id}`, { headers });
      fetchUsers();
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
        'https://payroll.patna.ng/api/admin/users/update',
        {
          name: fullName1,
          // id: deptId, 
          email: email1,
          phone_no: phone1,
          role: selectedRole
        },
        { headers }
      );

      fetchUsers();

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


  const filteredData = tableData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };


  return (
    <div style={{marginTop:'8rem',}}>
      <AdminHeaderNav />

      <div className='newBody'>
        <div className='newWidth'>
          <div className="wrapper">
            {/* <!-- Sidebar  --> */}


            {/* <!-- Page Content  --> */}
            <div className="content-wrapper">



              <div className="main-content">
                
                
              <div className='Generalbody' >
                <div className="content-header row align-items-center m-0">

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">General Ledger </h1>
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

              <div className="body-content" >
                <div className="col-lg-10" style={{maxWidth:'100%',}}>
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">
                                      Accounts:</label>
                                    <div className="col-sm-9">
                                      <select name="customer" className="form-control" required="" value={selectedCustomer} >
                                        <option value="">Choose Accounts</option>
                                        {/* <option value="Male">Male</option>
                                                                            <option value="Female">Female</option> */}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Start Date:</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="date" onChange={handleDateChange} name="start" value={selectedDate} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">End Date:</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="date" onChange={handleDateChange1} name="end" value={selectedEndDate} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6" style={{marginLeft: 50}}>
                                  <div className="form-group row">
                                    <Button variant='success' >
                                      {loading ? (
                                        <>
                                          <Spinner />
                                          <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                        </>
                                      ) : (
                                        "Process"
                                      )}
                                    </Button>

                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                      <div className="card">
                        <div className="card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="fs-17 font-weight-600 mb-0"></h6>
                            </div>

                          </div>
                        </div>
                        <div className="card-body">
                          <div className="table-resposive">
                          <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                              <div className={classes.greenbtn} style={{ display: 'flex', }}>
                                <div>
                                  <button>Copy</button>
                                  <button>Excel</button>
                                  <button>PDF</button>
                                  <button className={classes.diffbtn}>Column visibility</button>
                                </div>
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


                            {isLoading ? (
                              <p>Fetching data...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                    <tr>
                                      <th>Transaction Date</th>
                                      <th>Detail</th>
                                      <th>Debit</th>
                                      <th>Credit</th>
                                      
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone_no}</td>
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

                            <Modal show={show1} onHide={handleClose1} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form style={{ marginTop: 20 }}>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Full Name"
                                      // autoFocus
                                      value={fullName1}
                                      onChange={(e) => setFullName1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Email Address"
                                      // autoFocus
                                      value={email1}
                                      onChange={(e) => setEmail1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Phone Number"
                                      // autoFocus
                                      value={phone1}
                                      onChange={(e) => setPhone1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={selectedRole}
                                      onChange={handleRoleChange}
                                    >
                                      <option value="" disabled>Select a role</option>
                                      {roles.map((role, index) => (
                                        <option key={index} value={role.id}>
                                          {role.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Form.Group>
                                </Form>
                              </Modal.Body>






                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                <Button variant="success" onClick={editUser}>
                                  {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                                </Button>
                              </Modal.Footer>
                            </Modal>

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
              
            </div>
          </div>
        </div>
      </div>
      <InfoFooter />
    </div>
  )
}

export default GeneralLedger