import React, { useState, useEffect } from 'react';
// import Happiness from '../src/Images/happiness.svg';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import { PDFViewer, Document, Page, View, Text } from '@react-pdf-viewer';

import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './SalarayStructure.module.css'
import favicon from '../../Images/faviconn.png'

function SalaryStructure() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  const [grade, setGrade] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [annualBasic, setAnnualBasic] = useState('')



  const [step, setStep] = useState("");
  const [step1, setStep1] = useState("");

  const [selectedStep, setSelectedStep] = useState(null);







  const [department, setDepartment] = useState("");
  const [department1, setDepartment1] = useState("");
  const [deptId, setDeptId] = useState("");
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);


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


  const fetchGrades = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://payroll.patna.ng/api/admin/payroll/salary-structure', { headers });
      const results = response.data?.data?.SalaryStructure;
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
      fetchGrades();
      fetchLevel();
      fetchStep();

    }
  }, [bearer]);

  const createSalary = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://payroll.patna.ng/api/admin/payroll/salary-structure',
        {
          level: selectedLevel,
          step: selectedStep,
          annual_basic: annualBasic
        },
        { headers }
      );
      fetchGrades();
      handleClose();
      // setGrade('');
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


  const fetchLevel = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://payroll.patna.ng/api/admin/level', { headers });
      const resultx = response.data?.data?.data;
      setTableData2(resultx);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData2([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStep = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://payroll.patna.ng/api/admin/step', { headers });
      const resultsxs = response.data?.Steps?.data;
      setTableData3(resultsxs);
      // console.log(results, "STEP");
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData3([]);
    } finally {
      setIsLoading(false);
    }
  };



  const filteredData = tableData.filter(item => item.level.toLowerCase().includes(searchTerm.toLowerCase()));

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


  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleStepChange = (e) => {
    setSelectedStep(e.target.value);
  };


  return (
    <div>
      <div className="main-content">
        <AdminHeaderNav />

        <div className="content-header row align-items-center m-0">
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
              <Button variant="success" onClick={handleShow}>
                Add New Salary
              </Button>
            </div>
            <Modal

              show={show}
              // onHide={handleClose1}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Salary Structure</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <div style={{ marginTop: 10 }} />
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedLevel}
                      onChange={handleLevelChange}
                    >
                      <option value="" >Select a level</option>
                      {tableData2.map((level, index) => (
                        <option key={level.id} value={level.id}>
                          {level.description}
                        </option>
                      ))}
                    </Form.Control>
                    <div style={{ marginTop: 10 }} />
                    <Form.Label>Step</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedStep}
                      onChange={handleStepChange}
                    >
                      <option value="" >Select a step</option>
                      {tableData3.map((level, index) => (
                        <option key={index} value={level.id}>
                          {level.description}
                        </option>
                      ))}
                    </Form.Control>
                    <div style={{ marginTop: 10 }} />
                    <Form.Label>Annual Basic</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Basic Amount"
                      // autoFocus
                      value={annualBasic}
                      onChange={(e) => setAnnualBasic(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Go back
                </Button>
                <Button variant="success" onClick={createSalary}>
                  {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                </Button>
              </Modal.Footer>
            </Modal>


            {/* <ol className="breadcrumb d-inline-flex font-weight-600 fs-13 bg-white mb-0 float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Manage Staff</li>
                </ol> */}
            </nav>
            <div className="col-sm-8 header-title p-0">
                <div className="media">
                    <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                    <div className="media-body">
                        <h1 className="font-weight-bold">Manage Salary Structure</h1>
                        <small>Create and update your salary structure...</small>
                    </div>
                </div>
            </div>
        </div>

        {/* <!--/.Content Header (Page header)--> */}
        <div className="body-content">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fs-17 font-weight-600 mb-0 textInput">Manage Salary Structure</h6>
                  </div>
                  {/* <div className="text-right">
                                <button type="button" className="btn btn-info rounded-pill w-100p btn-sm mr-1" data-toggle="modal" data-target="#exampleModal1">Add New Salary</button>
                            </div> */}
                </div>
              </div>


              <div className="col-lg-12">
                <div className="card">
                  {/* <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="fs-17 font-weight-600 mb-0">All Steps</h6>
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
                        <p>Fetching Salary Structure...</p>
                      ) : (
                        <div className="table-responsive">
                          <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                            <thead style={{ whiteSpace: 'nowrap' }}>
                              <tr>
                                <th>S/N</th>
                                <th>Level</th>
                                <th>Step</th>
                                <th>Annual Basic</th>
                                <th>Created At</th>
                              </tr>
                            </thead>
                            <tbody style={{ whiteSpace: 'nowrap' }}>
                              {displayedData.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>Level {item.level}</td>
                                  <td>Step {item.step}</td>
                                  <td>
                                    {parseFloat(item.annual_basic).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>


                                  <td>{formatDate(item.created_at)}</td>

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

        {/* <!--/.body content--> */}



        <InfoFooter />
      </div>



    </div>

  )
}

export default SalaryStructure