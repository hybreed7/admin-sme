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
import classes from './Role.module.css';
import ToggleSlider from './ToggleSlider';
import favicon from '../../Images/faviconn.png'

function Role() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [toggleStates1, setToggleStates1] = useState({});
  const [perm, setPerm] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [trashClicked, setTrashClicked] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [permittedHeaders, setPermittedHeaders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  // const fetchRole = async () => {
  //   setRoleLoading(true);
  //   try {
  //     const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/role/get-roles', { headers });
  //     const results = response.data?.data;
  //     // console.log(results);
  //     setTableData(results);
  //   } catch (error) {
  //         if (error.response && error.response.status === 401) {
  //           // Redirect to login page if unauthorized
  //           navigate('/login');
  //         } else {
  //         const errorStatus = error.response?.data?.message;
  //         console.log(errorStatus);
  //         setTableData([]);
  //       }
  //   } finally {
  //     setRoleLoading(false);
  //   }
  // };

  

  // useEffect(() => {
  //   if (bearer) {
  //     fetchRole();
  //   }
  // }, [bearer]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  
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


  const handleEyeClick = async (roleId) => {
   
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/role?role_id=${roleId}`, { headers });
      const roless = response.data?.data;

      const permissionRoles = roless.permissions.map(item => item.id);
      console.log(permissionRoles, "permission roles");
      setPerm(permissionRoles);
     navigate('/edit_role', {state: {selectedPermission: permissionRoles, selectedRoles: roless} });
      setEyeClicked(true);



      const selectedRole = tableData.find((role) => role.id === roleId);

      if (selectedRole) {
        // Set the selected role's permissions as true in toggleStates1
        const updatedToggleStates1 = Object.fromEntries(
          permissions.map((permission) => [
            permission.id,
            permissionRoles.includes(permission.id),
          ])
        );

        setToggleStates1(updatedToggleStates1);

        setSelectedRoleId(roleId);
        // setTrashClicked(true);
      }
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
    }
  };

  const handleCreate = () => {
    navigate('/create_role');
  };

  const handleTrashClick = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this role.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });
  
    if (!confirmed.isConfirmed) {
      return; // User canceled, do nothing
    }
  
    // try {
    //   const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/role/delete-role?role_id=${id}`, { headers });
    //   fetchRole();
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: response.data.message,
    //   });
    //   setTrashClicked(true);
    // } catch (error) {
    //   const errorStatus = error.response?.data?.message;
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Failed',
    //     text: errorStatus,
    //   });
    //   console.log(errorStatus);
    // }
  };
  


  return (

    <div style={{ marginTop: '10rem', }}>

      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">
          <AdminHeaderNav />
            {/* <AdminHeaderNav /> */}
            <div className='newBody'>
              <div className='newWidth'>

                {/* <!--Content Header (Page header)--> */}
                <div className="content-header row align-items-center m-0">
                {/* {(isAdmin || permittedHeaders.includes('create-role')) && ( */}
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
                      <Button variant="success" onClick={handleCreate}>
                  Create New Role
                </Button>
                    </div>
                  </nav>
{/* )} */}
                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Roles & Permission</h1>
                        <small>Create and view your roles...</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Create Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Role Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Role name"
                        // autoFocus
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>

                <Modal.Body>
                  <div style={{ display: "flex", gap: 5 }}>
                    <ToggleSlider checked={checkAll} onChange={handleCheckAllToggle} />
                    <p>Check All</p>
                  </div>
                </Modal.Body>
                <hr />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {permissions.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: 'calc(30% - 40px)',
                        margin: '5px 10px',
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: 'calc(20% - 20px)',
                        padding: 10,
                        flex: '1',
                      }}
                    >
                      <div
                        style={{
                          height: 100,
                          backgroundColor: '#fff',
                          borderRadius: 8,
                          border: '1px solid rgba(0, 0, 0, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <Modal.Body style={{ textAlign: 'center' }}>
                          <p style={{ fontSize: 10.5, margin: '5px 0' }}>{item.name}</p>
                          <ToggleSlider
                            checked={toggleStates[item.id]}
                            onChange={() => handleToggleChange(item.id)}
                          />
                        </Modal.Body>
                      </div>
                    </div>
                  ))}
                </div>



                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="success" onClick={handleClose}>
                    Create Role
                  </Button>
                </Modal.Footer>
              </Modal> */}

              {/* <Modal size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered show={show1} onHide={handleClose1} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Role</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Role Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Role name"
                                // autoFocus
                                value={role1}
                                onChange={(e) => setRole1(e.target.value)}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>

                        <Modal.Body>
                          <div style={{ display: "flex", gap: 5 }}>
                            <ToggleSlider checked={checkAll} onChange={handleCheckAllToggle} />
                            <p>Check All</p>
                          </div>
                        </Modal.Body>
                        <hr />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {permissions.map((item, index) => (

                            <div
                              key={index}

                              style={{
                                width: 'calc(30% - 40px)',
                                margin: '5px 10px',
                                justifyContent: "center",
                                alignItems: "center",
                                maxWidth: 'calc(20% - 20px)',
                                padding: 10,
                                flex: '1',
                              }}
                            >
                              <div
                                style={{
                                  height: 100,
                                  backgroundColor: '#fff',
                                  borderRadius: 8,
                                  border: '1px solid rgba(0, 0, 0, 0.2)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
                                }}
                              >
                                <Modal.Body style={{ textAlign: 'center' }}>
                                  <p style={{ fontSize: 10.5, margin: '5px 0' }}>{item.name}</p>
                                  <ToggleSlider
                                    checked={toggleStates1[item.id]}
                                    onChange={() => handleToggleChange1(item.id)}
                                  />
                                </Modal.Body>
                              </div>
                            </div>
                          ))}
                        </div>



                        <Modal.Footer>
                          <Button variant="danger" onClick={handleClose1}>
                            Cancel
                          </Button>
                          <Button variant="success" onClick={handleClose1}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal> */}

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


                            {roleLoading ? (
                        <p>Fetching Roles...</p>
                      ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                            <tr>
                              <th>S/N</th>
                              <th>Role Name</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: 'nowrap' }}>
                            {displayedData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{formatDate(item.created_at)}</td>
                                <td>
                                {(isAdmin || permittedHeaders.includes('update-role')) && (
                                  <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                    <i className="far fa-eye"></i>
                                  </div>
)}
{(isAdmin || permittedHeaders.includes('delete-role')) && (
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

export default Role;