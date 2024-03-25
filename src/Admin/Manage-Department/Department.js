import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { InfoFooter } from '../../InfoFooter';
import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './Department.module.css';
import favicon from '../../Images/faviconn.png'

function Department() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
const [selectedItem,setSelectedItem] = useState(null);
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
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState("");
  const [glCode, setglCode] = useState("");
  const [reOderLevel, setReOrderLevel] = useState("");
  const [quantity, setQuantity] = useState("");

  const [name1, setName1] = useState("");
  const [description1, setDescription1] = useState('');
  const {selectedId, setSelectedId} = useState('');
  const [unit1, setUnit1] = useState("");
  const [glCode1, setglCode1] = useState("");
  const [reOderLevel1, setReOrderLevel1] = useState("");


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

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const fetchDepartment = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/departments', { headers });
      const dept = response.data?.data;
      setTableData(dept);
      console.log(dept);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        
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

  const fetchUnits = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/units/fetch-all',{ headers});
      const results = response.data?.data;
      setTableData1(results);
      console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData1([]);
    } finally {
      setIsLoading(false);
    }
  };


  // fetchCharts
  const fetchGl = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account', { headers });
      const results = response.data?.data;
     
      setTableData2(results);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData2([]);
    } finally {
      setIsLoading(false);
    }
  };




  useEffect(() => {
    if (bearer) {
      fetchDepartment();
      fetchGl();
      fetchUnits();

    }
  }, [bearer]);

  const createDepartment = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/departments/create',
        {
          name: description,
          // description: description,
          // unit: unit,
          // gl_code: glCode,
          // re_order_level: reOderLevel,
          // quantity: quantity
        },
        { headers }
        );
        console.log(response.data.message)
        fetchDepartment();
      handleClose();
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
        text: error.response.name,
      });
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  
 const handleUnitChange = (event) =>{
  setUnit(event.target.value)
 }
 const handleGlChange = (event) =>{
  setglCode(event.target.value)
 }

 const handleUnitChange1 = (event) =>{
  setUnit1(event.target.value)
 }
 const handleGlChange1 = (event) =>{
  setglCode1(event.target.value)
 }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  const handleEyeClick = (id) => {
    const foundDepartment = tableData.find(item => item.id === id);
    setSelectedDepartment(foundDepartment.id);
    const {  name } = foundDepartment;
    setDescription1(name || '');
    setShow1(true);
    setEyeClicked(true);
  };

  // UseEffect to log changes to selectedItem
  useEffect(() => {
    // console.log(selectedDepartment, "selectedItem changed");
  }, [selectedDepartment]);



  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/departments/delete?id=${id}`, { headers });
      fetchDepartment();
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

  const editDepartment = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/departments/update',
        {
          id: selectedDepartment,
          name: description1,
          
        

        },
        { headers }
      );

      fetchDepartment();
      handleClose1();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });

      // console.log(response.data);
    } catch (error) {
      const errorStatus = error.response?.data?.message;

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

  const handleCreate = () => {
    navigate('/create_booking');
  };
  

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
                  <Button variant="success" onClick={handleShow}>
                    Add New Department
                  </Button>
                </div>

              </nav>
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                  <div className="media-body">
                    <h1 className="font-weight-bold">Manage Department</h1>
                    <small>Create and view your department...</small>
                  </div>
                </div>
              </div>
            </div>

            {/* <!--/.Content Header (Page header)--> */}
            <div className="body-content">
              
              <div className="row">

              <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Department</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Description"
                              // autoFocus
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>


                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createDepartment}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Creating Customer, Please wait...</span>
    </>
  ) : (
                "Create Department"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>



                <div className="col-lg-12">
                  <div className="card">
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
                          <p>Fetching departments...</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ whiteSpace: 'nowrap' }}>
                                <tr>
                                  <th>S/N</th>
                                  <th>Name</th>
                                  <th>Created At</th>
                                  <th>Updated At</th>
                                  {/* <th>Description</th> */}
                                  {/* <th>UOM</th> */}
                                  {/* <th>GL Code</th> */}
                                  {/* <th>Re-order Level</th> */}
                                  {/* <th>Status</th> */}
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{ whiteSpace: 'nowrap' }}>
                                {displayedData.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td>{formatDate(item.updated_at)}</td>
                                    {/* <td style={{textAlign: "left"}}>{item.description}</td> */}
                                    {/* <td>{item?.unit?.name}</td> */}
                                    {/* <td>{item?.account?.gl_name}</td> */}
                                    {/* <td>{item.re_order_level}</td> */}
                                    {/* <td style={{textAlign: "left"}}>{item.quantity}</td> */}
                                    {/* <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td> */}
                                    {/* <td style={{textAlign: "left"}}>{item.status}</td> */}
                                    <td>
                                      <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                        <i className="far fa-eye"></i>
                                      </div>
                                      <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                        <i className="far fa-trash-alt"></i>
                                      </div>
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
                        <Modal.Title> Edit Department</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Description"
                              // autoFocus
                              value={description1}
                              onChange={(e) => setDescription1(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose1}>
                          Go back
                        </Button>

                        <Button variant="success" onClick={editDepartment} >
                          {loading ? ( <> <Spinner  size='sm' />
                            <span style={{ marginLeft: '5px' }}>
                              Updating item, Please wait...
                            </span>
                            </>) : ("Save Changes")}
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

export default Department;