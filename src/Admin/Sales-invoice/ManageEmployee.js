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
import Footer from '../../Pages/Footer/Footer';
import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './ManageEmployee.module.css';
import favicon from '../../Images/faviconn.png'

function ManageEmployee() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [role1, setRole1] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState("");
  const [department1, setDepartment1] = useState("");
  const [deptId, setDeptId] = useState("");
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [perm, setPerm] = useState([]);
  const [permId, setPermId] = useState([]);
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

    <div>


      {/* <!-- Sidebar  --> */}


      {/* <!-- Page Content  --> */}
      <div className="content-wrapper">
        <div className="main-content">

          <AdminHeaderNav />


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
                <NavLink to={'/create_new_staff'}><Button variant="success" >
                  Create New Employee
                </Button>
                </NavLink>
              </div>

            </nav>
            <div className="col-sm-8 header-title p-0">
              <div className="media">
                <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                <div className="media-body">
                  <h1 className="font-weight-bold">Manage Emplyee</h1>
                  <small>Create and update your employee...</small>
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




              <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form style={{ marginTop: 20 }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Full Name"
                        // autoFocus
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <div style={{ marginTop: 10 }} />
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Email Address"
                        // autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div style={{ marginTop: 10 }} />
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone Number"
                        // autoFocus
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                  <Button variant="danger" onClick={handleClose}>
                    Go back
                  </Button>
                  <Button variant="success" onClick={createUser}>
                    {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fs-17 font-weight-600 mb-0">All Users</h6>
                      </div>

                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-resposive">
                    <div className="d-flex justify-content-between align-items-center" style={{ padding: '0 0 20px 0', }}>
                      <div className={classes.greenbtn} style={{display:'flex',}}>
                            <div>
                              <button>Copy</button>
                              <button>Excel</button>
                              <button>PDF</button>
                              <button className={classes.diffbtn}>Column visibility</button>
                            </div>
                            <div>
                              <label className="d-flex justify-content-start align-items-center" style={{marginBottom:'0!important',}}>
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
                                  setCurrentPage(1);
                                }}
                              />
                            </div>

                          </div>
                        </div>
                      </div>


                      {isLoading ? (
                        <p>Fetching Users...</p>
                      ) : (
                        <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone Number</th>
                              <th>Role</th>
                              <th>Created At</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((item, index) => (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone_no}</td>
                                <td>{item.roles.length > 0 ? item.roles[0].name : 'No Role'}</td>
                                <td>{formatDate(item.created_at)}</td>
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
                      )}
                      <div className={classes.endded}>
                        <p>
                          Showing {startIndexx} to {endIndexx} of {totalEntries} entries
                        </p>
                        <div className={classes.nxtbtn}>
                          <button className={classes.prevbtn} onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                          </button>
                          {[...Array(totalPages)].map((_, page) => (
                            <button key={page + 1} className={classes.numbtn} onClick={() => setCurrentPage(page + 1)}>
                              {page + 1}
                            </button>
                          ))}
                          <button
                            className={classes.nxtdbtn}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      </div>

                      <Modal size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered show={show1} onHide={handleClose1} animation={false}>
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
          {/* <!--/.body content--> */}
        </div>
        {/* <!--/.main content--> */}
        <Footer />
        {/* <!--/.footer content--> */}
        <div className="overlay"></div>
      </div>
      {/* <!--/.wrapper--> */}


    </div>

  );
}

export default ManageEmployee;