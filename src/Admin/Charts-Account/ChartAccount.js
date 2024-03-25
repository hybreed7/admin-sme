import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../style.css";
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { InfoFooter } from '../../InfoFooter';
import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './ChartAccount.module.css';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import {  useNavigate } from 'react-router-dom';

function ChartAccount() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  // const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  // const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [glcode, setGlcode] = useState("");
  // const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  // const [selectedDirection, setSelectedDirection] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [permittedHeaders, setPermittedHeaders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [glname, setGlname] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubCategory1, setSelectedSubCategory1] = useState('');
  const [glname1, setGlname1] = useState("");
  const [balance1, setBalance1] = useState("");
  const [selectedDirection1, setSelectedDirection1] = useState("");
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedChart, setSelectedChart] = useState('')

 



  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');

      if (value !== null) {
        setBearer(value);
        setAuthenticated(true);
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

  const fetchCharts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account', { headers });
      const results = response.data?.data;
     
      setTableData(results);
      // console.log(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        navigate('/login');
      } else {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    }
    } finally {
      setIsLoading(false);
    }
  };


  const fetchSubCat = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/get-sub-categories', { headers });
      const subCat = response.data?.data;
      console.log(subCat, "sub categories");
      setTableData2(subCat);
      
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData2([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubCatChange = (event) => {
    setSelectedSubCategory(event.target.value);
};
  const handleSubCatChange1 = (event) => {
    setSelectedSubCategory1(event.target.value);
};
 
const handleDateChange = (event) => {
  setSelectedDate(event.target.value);
};
const handleDateChange1 = (event) => {
  setSelectedDate1(event.target.value);
};

  useEffect(() => {
    if (bearer) {
      fetchCharts();
      fetchSubCat();
    }
  }, [bearer]);

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


  const createAccount = async () => {
    setLoading(true);
    try {

      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/account/add',
        {
          gl_code: glcode,
          sub_category_id: selectedSubCategory,
          gl_name: glname,
          opening_balance: balance,
          direction: selectedDirection,
          transaction_date: selectedDate
        },
        { headers }
      );
      fetchCharts();
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      console.log(response.data);
    setGlcode('');
    setGlname('');
    setBalance('');
    setSelectedSubCategory('');
    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  const handleEyeClick = (id) => {

    const foundCharts = tableData.find(item => item.id === id);
    const chartId = foundCharts.id;
    setSelectedChart(chartId)

    const { gl_code, gl_name, balance, direction, transaction_date} = foundCharts;
    setSelectedSubCategory1(gl_code || '');
    setGlname1(gl_name|| '');
    setBalance1(balance || '');
    setSelectedDirection1(direction || '');
    setSelectedDate1(transaction_date || '');
    // const selectedRole = roles.length > 0 ? roles[0].id : '';
    // setSelectedRole(selectedRole);

    setShow1(true);
    setEyeClicked(true);
  };
  useEffect(() =>{

  },{selectedChart}

  )


  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/account/add?id=${id}`, { headers });
      fetchCharts();
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

  

  const filteredData = tableData.filter(item => item.gl_name.toLowerCase().includes(searchTerm.toLowerCase()));

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
  const handleDirectionChange = (e) => {
    setSelectedDirection(e.target.value);
  };
  const handleDirectionChange1 = (e) => {
    setSelectedDirection1(e.target.value);
  };

  

const handleValueChange = (value, name, values) => {
  setBalance(value); // Update the balance state
  console.log(value, name, values);
};
const handleValueChange1 = (value1, name1, values1) => {
  setBalance1(value1); // Update the balance state
  console.log(value1, name1, values1);
};



  

  return (

    <div style={{ marginTop: '8rem', }}>

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

                {(isAdmin || permittedHeaders.includes('create-account')) && (
                  <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                    <div
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        justifyContent: "flex-end",
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      <Button variant="success" onClick={handleShow} >
                        Add New Account
                      </Button>
                    </div>
                  </nav>
                )}
                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Chart Of Accounts</h1>
                        <small>Create and update your chart of accounts...</small>
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
                    <div className="col-md-12 col-lg-12 col-xl-3 mb-4">
                      <div className="card">


                      </div>
                    </div>

                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Create Chart Of Account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form >
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ marginTop: 20 }}>Gl Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Gl Name"
                              value={glname}
                              onChange={(e) => setGlname(e.target.value)}
                            />

                            <Form.Label style={{ marginTop: 20 }}>Account Type</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedSubCategory}
                              onChange={handleSubCatChange}
                            >
                              <option value="" disabled>Select Type</option>
                              {tableData2.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.description}
                                </option>
                              ))}
                            </Form.Select>

                            <Form.Label style={{ marginTop: 20 }}>Direction</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedDirection}
                              onChange={handleDirectionChange}
                            >
                              <option value="" disabled>Select Direction</option>
                              <option value="1" >Debit</option>
                              <option value="2" >Credit</option>
                          
                            </Form.Select>
                            
                            <Form.Label style={{ marginTop: 20 }}>Opening Balance</Form.Label> <br />
                            
                            <CurrencyInput
                              id="exampleForm.ControlInput1"
                              name="Balance"
                              placeholder="Enter Opening balance"
                              decimalsLimit={2}
                              value={balance} // Set the value to the balance state
                                  onValueChange={handleValueChange}
                              style={{
                                
                          minWidth: "100%",
                          height: "calc(1.8em + .75rem + 2px)",
                          border: '1px solid #e4e5e7',
                          borderRadius: 5,
                          overflow: 'hidden',
                          zIndex: 999,
                          fontSize: 14,
                          padding: ".375rem .75rem"
                        }}
                  />
                  <Form.Label style={{ marginTop: 20 }}>Balance as at</Form.Label>

                  <input
                    className="form-control"
                    required=""
                    type="date"
                    onChange={handleDateChange}
                    name="date"
                    value={selectedDate}
                  />

                        
                          </Form.Group>
                        </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createAccount}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Creating account, Please wait...</span>
    </>
  ) : (
                "Save changes"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

                    <div className="col-lg-12">
                      <div className="card">
                        {/* <div className="card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="fs-17 font-weight-600 mb-0">Chart of Accounts</h6>
                            </div>

                          </div>
                        </div> */}
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
                              <p>Fetching charts...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                    <tr>
                                      <th>S/N</th>
                                      <th>Account Code</th>
                                      <th>Account Name</th>
                                      <th>Account Type</th>
                                      <th>Category</th>
                                      <th>Sub Category</th>
                                      {/* <th>Opening Balance</th> */}
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.gl_code}</td>
                                        <td style={{textAlign: "left"}}>{item.gl_name}</td>
                                        <td>{item.class?.description}</td>
                                        <td>{item.category?.description}</td>
                                        <td style={{textAlign: "left"}}>{item.subcategory?.description}</td>
                                        {/* <td>{parseFloat(item.balance).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td> */}
                                      
                                        <td style={{textAlign: "left"}}>
                                        {(isAdmin || permittedHeaders.includes('update-account')) && (
                                          <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                            <i className="far fa-eye"></i>
                                          </div>
                                        )}
                                        {(isAdmin || permittedHeaders.includes('delete-account')) && (
                                          <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                            <i className="far fa-trash-alt"></i>
                                          </div>
                                        )}
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

                            <Modal show={show1} onHide={handleClose1} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit Chart Of Accounts</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                        <Form >
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ marginTop: 20 }}>Gl Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Gl Name"
                              value={glname1}
                              onChange={(e) => setGlname1(e.target.value)}
                            />

                            <Form.Label style={{ marginTop: 20 }}>Account Type</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedSubCategory1}
                              onChange={handleSubCatChange1}
                            >
                              <option value="" disabled>Select Type</option>
                              {tableData2.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.description}
                                </option>
                              ))}
                            </Form.Select>

                            <Form.Label style={{ marginTop: 20 }}>Direction</Form.Label>
                            <Form.Select className="form-control"
                              as="select"
                              value={selectedDirection1}
                              onChange={handleDirectionChange1}
                            >
                              <option value="" disabled>Select Direction</option>
                              <option value="1" >Debit</option>
                              <option value="2" >Credit</option>
                          
                            </Form.Select>
                            
                            <Form.Label style={{ marginTop: 20 }}>Opening Balance</Form.Label> <br />
                            
                            <CurrencyInput
                    id="exampleForm.ControlInput1"
                    name="Balance"
                    placeholder="Enter Opening balance"
                    decimalsLimit={2}
                    value={balance1} // Set the value to the balance state
                        onValueChange={handleValueChange1}
                    style={{
                      
                      minWidth: "100%",
                      height: "calc(1.8em + .75rem + 2px)",
                      border: '1px solid #e4e5e7',
                      borderRadius: 5,
                      overflow: 'hidden',
                      zIndex: 999,
                      fontSize: 14,
                      padding: ".375rem .75rem"
                    }}
                  />
                  <Form.Label style={{ marginTop: 20 }}>Balance as at</Form.Label>

                  <input
                    className="form-control"
                    required=""
                    type="date"
                    onChange={handleDateChange1}
                    name="date"
                    value={selectedDate1}
                  />

                        
                          </Form.Group>
                        </Form>
                      </Modal.Body>

                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                {/* <Button variant="success" onClick={editUser}> */}
                                <Button variant="success" >
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

export default ChartAccount;