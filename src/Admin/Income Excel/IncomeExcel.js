import React, { useState, useEffect } from 'react';
import classes from "./IncomeExcel.module.css"
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


function IncomeExcel() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pensionData, setPensionData] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [step1, setStep1] = useState("");
  const [selectedAllowance, setSelectedAllowance] = useState(null);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const [type, setType] = useState("");
  const [type1, setType1] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeduction, setSelectedDeduction] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [file, setFile] = useState();

  const [selectedFile, setSelectedFile] = useState(null);


  

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);

  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);

  };

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  


  const handleSelectedDeduction = (e) => {
    setSelectedDeduction(e.target.value);

  };

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
    try {
      const response = await axios.get(`https://payroll.patna.ng/api/admin/step/delete?id=${id}`, { headers });
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



  const uploadExcel = async () => {
  setLoad(true);
    try {
      const formData = new FormData();
    formData.append('file', selectedFile);

    console.log(selectedFile);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${bearer}`,
    };

    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/income/post-bulk-upload',
      formData,
      { headers }
    );

   

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
    });

    console.log(response.data.message);
  } catch (error) {
    const errorStatus = error.response?.data?.message || 'An error occurred';

    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorStatus,
    });

    console.error(error);
  } finally {
      setLoad(false);
    }
  };


  const filteredData = tableData.filter(item => item.staff?.firstname.toLowerCase().includes(searchTerm.toLowerCase()));

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
                    gap: 10
                  }}
                >
                  <a href="https://patna.ng/income/download-upload/xlsx" download>
                    <Button variant="success">
                      Download Excel Template
                    </Button>
                  </a>

                </div>

              </nav>
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                  <div className="media-body">
                    <h1 className="font-weight-bold">Income Excel Upload</h1>
                    <small>Upload your income...</small>
                  </div>
                </div>
              </div>
            </div>

            {/* <!--/.Content Header (Page header)--> */}
            <div className="body-content">
              
              <div className="row">
               
                <div className="col-lg-12">
                  <div className="card">
                   
                    <div className="card-body">
                      <div className="table-resposive">
                      <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>     
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <div className="col-sm-9">
                              <input accept=".xlsx, .xls, .csv" type="file" onChange={handleFileChange} style={{marginTop: 10}}/>
                            </div>
                          </div>
                        </div>
                        <Modal.Footer>
                          <Button variant="success" onClick={uploadExcel}>
                            {load ? (<><Spinner  size='sm' />
                            <span style={{ marginLeft: '5px' }}>Uploading data, Please wait...</span>
                            </>) : ("Upload Data")}
                          </Button>
                        </Modal.Footer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--/.body content--> */}
          </div>
          </div>
          </div>
          {/* <!--/.main content--> */}
          <InfoFooter />
          {/* <!--/.footer content--> */}
          <div className="overlay"></div>
        </div>
        {/* <!--/.wrapper--> */}


      </div>
    </div>

  )
}

export default IncomeExcel;