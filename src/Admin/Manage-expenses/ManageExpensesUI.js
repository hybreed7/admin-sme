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
import classes from './ManageExpenses.module.css';
import favicon from '../../Images/faviconn.png'

function ManageExpensesUI() {
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [tableData, setTableData] = useState([]);
const [expenses, setExpenses] = useState([]);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedRows, setCheckedRows] = useState("");

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

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/fetch-all-expenses', { headers });

      // console.log(response);
      const results = response.data?.data;
      setTableData(results);
      // console.log(results, "heree");
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/total-expenses', { headers });
      const total = response.data?.data;
     
      setExpenses(total);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (bearer) {
      fetchExpenses();
      fetchTotalExpenses();

    }
  }, [bearer]);

 



  const handleEyeClick = (id) => {

    const foundUser = tableData.find(item => item.id === id);


    
    setEyeClicked(true);
  };


  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`https://payroll.patna.ng/api/admin/users/destroy?id=${id}`, { headers });
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

  const handleCheckboxChange = (index) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = !newCheckedRows[index];
    setCheckedRows(newCheckedRows);
  };

  const filteredData = tableData.filter(item => item.particulars.toLowerCase().includes(searchTerm.toLowerCase()));

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

  

  const handleCreate = () => {
    navigate('/AddExpenses');
  };

  const handlePrintInvoice = (id) => {
    const selectedExpenses = tableData.find(item => item.id === id);
  
  
    navigate('/print_expenses', { state: { selectedExpenses } });
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
                  <Button variant="success" onClick={handleCreate}>
                    Add Expenses
                  </Button>
                </div>

              </nav>
              <div className="col-sm-8 header-title p-0">
                <div className="media">
                  <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                  <div className="media-body">
                    <h1 className="font-weight-bold">Expenses</h1>
                    <small>Add Expenses and view your receipt...</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
                                <div class="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                                    <div class="card overflow-hidden">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                <p class="text-muted fs-13 mb-0">Total Expenses</p>
                                                    <h3 class="mb-2 fw-semibold" style={{textAlign: "right", marginTop: 10}}>
                                                    ₦{parseFloat(expenses).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })} </h3>
                                                    {/* <p class="text-muted fs-13 mb-0">Total Vouchers</p> */}
                                                    <p class="text-muted mb-0 mt-2 fs-12">
                                                        {/* <span class="icn-box text-success fw-semibold fs-13 me-1">
                                                            <i class="fa fa-long-arrow-up"></i>
                                                            30</span> */}
                                                    </p>
                                                </div>
                                                <div class="col col-auto top-icn dash">
                                                    <div class="counter-icon bg-primary dash ms-auto box-shadow-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-white" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
                                                            <path d="M12,8c-2.2091675,0-4,1.7908325-4,4s1.7908325,4,4,4c2.208252-0.0021973,3.9978027-1.791748,4-4C16,9.7908325,14.2091675,8,12,8z M12,15c-1.6568604,0-3-1.3431396-3-3s1.3431396-3,3-3c1.6561279,0.0018311,2.9981689,1.3438721,3,3C15,13.6568604,13.6568604,15,12,15z M21.960022,11.8046875C19.9189453,6.9902344,16.1025391,4,12,4s-7.9189453,2.9902344-9.960022,7.8046875c-0.0537109,0.1246948-0.0537109,0.2659302,0,0.390625C4.0810547,17.0097656,7.8974609,20,12,20s7.9190063-2.9902344,9.960022-7.8046875C22.0137329,12.0706177,22.0137329,11.9293823,21.960022,11.8046875z M12,19c-3.6396484,0-7.0556641-2.6767578-8.9550781-7C4.9443359,7.6767578,8.3603516,5,12,5s7.0556641,2.6767578,8.9550781,7C19.0556641,16.3232422,15.6396484,19,12,19z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
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
                {/* <div className="col-md-12 col-lg-12 col-xl-3 mb-4">
                  <div className="card">


                  </div>
                </div> */}




               

                <div className="col-lg-12">
                  <div className="card" style={{marginTop: '35px'}}>
                    
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
                          <p>Fetching Pending invoices...</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                              <thead style={{ whiteSpace: 'nowrap' }}>
                                <tr>
                                  <th>Transaction Date</th>
                                  <th>Particulars</th>
                                  <th>Description</th>
                                  <th>Receipt Number</th>
                                  <th>Amount</th>
                                  <th>Payment Mode</th>
                                  <th>Teller Number</th>
                                  <th>Received By</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{ whiteSpace: 'nowrap' }}>
                                {displayedData.map((item, index) => (
                                  <tr key={index}>
                                    {/* <td>
                                    <input
                type="checkbox"
                checked={checkedRows[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
    </td> */}
    <td>{item.transaction_date}</td>
                                    <td>{item.particulars}</td>
                                    <td>{item.description}</td>
                                    <td>{item.voucher_number}</td>
                                    <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                    <td>{item.payment_mode}</td>
                                    <td>{item.teller_number}</td>
                                    <td>{item.user?.name}</td>
                                    <td>
                                      <div>
                                      <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                        <i className="far fa-eye"></i>
                                      </div>
                                      <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                        <i className="far fa-trash-alt"></i>
                                      </div>
                                      <div className="btn btn-sm printbtninv" onClick={() => handlePrintInvoice(item.id)}>
                                           <i className="fa fa-print dawg"></i>
                                          </div>
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
  <div className={classes.endded} >
    <Button variant='primary'>Lodge</Button>
    </div>
    <div className="col-md-11" style={{width:'100%', padding:"0"}}>
                                                                <div className="form-group row justify-content-end">
                                                                    {/* <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Amount:</label> */}
                                                                    <div className="col-sm-4" style={{padding:'0', maxWidth:'30.5%',}}>
                                                                        <input style={{ textAlign: "right",}} className="form-control" required="" type="text" value={totalAmount} name="total" readOnly />
                                                                    </div>
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

export default ManageExpensesUI;