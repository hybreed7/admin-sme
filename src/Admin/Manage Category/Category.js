import React, { useState, useEffect } from 'react';
import classes from "./Category.module.css"
import Navigation from "../../Pages/Nav/Navigation"
import Footer from "../../Pages/Footer/Footer"
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Row, Col } from 'react-bootstrap';
import { AdminHeaderNav } from "../AdminHeaderNav";
import { InfoFooter } from "../../InfoFooter";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import favicon from '../../Images/faviconn.png'
import {  useNavigate } from 'react-router-dom';


function Category() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = ('');
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [step1, setStep1] = useState("");
  const [selectedAllowance, setSelectedAllowance] = useState(null);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [type1, setType1] = useState("");

  const [eyeClicked, setEyeClicked] = useState(false);
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
    'Authorization': `Bearer ${bearer}`,
  };

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

  const fetchCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/get-classes', { headers });
      const results = response.data?.data;
      console.log(results, "Here");
      setTableData(results);

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




  useEffect(() => {
    if (bearer) {
      fetchCategory();

    }
  }, [bearer]);

  const createGrade = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://payroll.patna.ng/api/admin/deduction/addtype',
        // { description: type },
        { headers }
      );
      // fetchStep();
      handleClose();
      setStep('');
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
    // Find the selected grade from tableData using the id
    const foundStep = tableData.find(item => item.id === id);
    setSelectedAllowance(foundStep);
    setType1(foundStep?.description || '');
    setShow1(true);
    setEyeClicked(true);
  };


  const handleTrashClick = async (id) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this deduction. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (confirmResult.isConfirmed) {
      try {
      const response = await axios.get(`https://payroll.patna.ng/api/admin/deduction/delete_type?id=${id}`, { headers });
      // fetchStep();
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
  } else {
     
    Swal.fire({
      icon: 'info',
      title: 'Cancelled',
      text: 'The deletion was cancelled.',
    });
  }
};




  const editGrade = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://payroll.patna.ng/api/admin/deduction/updateType',
        {
          id: selectedAllowance.id,
          // description: type1,
        },
        { headers }
      );

      // fetchStep();
      handleClose1();
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


  const filteredData = tableData.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalEntries = filteredData.length;
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  const displayedData = filteredData.slice(startIndexx - 1, endIndexx);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };



  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
            <div className="content-header row align-items-center m-0 invoicemargin">

              <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    justifyContent: "flex-end",
                    display: "flex",
                    marginLeft: "auto",
                    gap: 10
                  }}
                >
                  {/* <Button variant="success" onClick={handleShow}>
                    Add New Category
                  </Button> */}
                </div>

              </nav>
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                  <div className="media-body">
                    <h1 className="font-weight-bold">Account Category</h1>
                    <small>Create and update your account categories...</small>
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

                

                <Modal

                  show={show}
                  onHide={handleClose}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <div style={{marginTop: 10}} />
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="success" onClick={createGrade}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Saving changes, Please wait...</span>
    </>
  ) : (
                "Save Changes"
                      )}
                    </Button>
                  </Modal.Footer>
                </Modal>

                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fs-17 font-weight-600 mb-0">Account Category</h6>
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
                          <p>Fetching Categories...</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ whiteSpace: 'nowrap' }}>
                                <tr>
                                  <th>S/N</th>
                                  <th>Description</th>
                                  <th>Created at</th>
                                  <th>Updated at</th>
                                </tr>
                              </thead>
                              <tbody style={{ whiteSpace: 'nowrap' }}>
                                {displayedData.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.description}</td>
                                    <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
                                    <td>{formatDate(item.updated_at)}</td>
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

                        <Modal

                          show={show1}
                          onHide={handleClose1}
                          animation={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Deduction Type</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Description"
                                  value={type1}
                                  onChange={(e) => setType1(e.target.value)}
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>

                          <Modal.Footer>
                            <Button variant="danger" onClick={handleClose1}>
                              Cancel
                            </Button>
                            <Button variant="success" onClick={editGrade}>
                            {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating changes, Please wait...</span>
    </>
  ) : (
                "Save Changes"
                      )}
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





  )
}

export default Category;