import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import classes from '../../Admin/Receivables/AdvancePayment.module.css';
import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import { Modal, Form } from 'react-bootstrap';


function Cashbook() {
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [bookingId, setBookingId] = useState([]);
      const [selectedBank, setSelectedBank] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [tableData, setTableData] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [inputss, setInputss] = useState([]);
    const [totalDebit, setTotalDebit] = useState('');
  const [totalCredit, setTotalCredit] = useState('');




    const filteredData = accounts.filter(item => item.details.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    
  
    const handleDateChange1 = (event) => {
      setSelectedEndDate(event.target.value);
    };
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

   
  
    
    const fetchBankss = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/get-account-by-sub-category-id?sub_category_id=${1}`, { headers });
        const results = response.data?.data;
       
        setTableData(results);
        // console.log(results);
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

    // console.log(selectedBank);

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


    useEffect(() => {
      if (accounts) {
        const debitTotal = accounts.reduce((total, item) => total + parseFloat(item.debit), 0);
        const creditTotal = accounts.reduce((total, item) => total + parseFloat(item.credit), 0);
    
        // Format the numbers with commas and two decimal places
        const formattedDebitTotal = debitTotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        const formattedCreditTotal = creditTotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
    
        setTotalDebit(formattedDebitTotal);
        setTotalCredit(formattedCreditTotal);
      }
    }, [accounts]);
  

    const fetchAccounts = async () => {
      setLoad(true);
  
      try {
          const response = await axios.get(
              'https://api-sme.promixaccounting.com/api/v1/reports/general-ledger-filter',
              {
                  params: {
                      gl_code: selectedBank,
                      start_date: selectedDate,
                      end_date: selectedEndDate
                  },
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
  
          const resultsss = response.data?.data?.journal;
          setAccounts(resultsss);

          const resultssx = response.data?.data?.input;
          setInputss(resultssx);
  
          // console.log( response.data?.data, 'NI');
      } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
      } finally {
          setLoad(false);
      }
  };

    useEffect(() => {
        if (bearer) {
          fetchBankss();
            
        }
    }, [bearer]);


   

    const handleBank = (event) => {
      setSelectedBank(event.target.value);
      const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  setSelectedDate(firstDayOfMonth.toISOString().split('T')[0]);
  
  setSelectedEndDate(currentDate.toISOString().split('T')[0]);
  
  fetchAccounts();
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

  

    function formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
      return formattedDate;
    }
  
    function padZero(num) {
      return num < 10 ? `0${num}` : num;
    }



    return (
        <div style={{ marginTop: '8rem', }}>
            <AdminHeaderNav />
            <div className='newBody'>
                <div className='newWidth'>
                    <div className="wrapper">
                        {/* <!-- Sidebar  --> */}


                        {/* <!-- Page Content  --> */}
                        <div className="content-wrapper">



                            <div className="main-content">


                                <div className="content-header row align-items-center m-0">

                                    <div className="col-sm-8 header-title p-0" >
                                        <div className="media">
                                            <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                            <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", minWidth: '900px', }}>
                                                <div>
                                                    <h1 className="font-weight-bold">Cashbook </h1>
                                                    <small>Check your cashbook ....</small>
                                                </div>
                                                {/* <div style={{ marginBottom: 30 }}>
                                                    <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                                                </div> */}
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




                                                <div className="card-body" style={{padding:'1.5rem 10.5rem 1.5rem 12.5rem',}}>
                                                  <div className="row">
                            <div className="col-md-12">
                                                                      <div className="form-group row">
                                                                          <label for="example-text-input" className="col-sm-12 col-form-label font-weight-400 text-align-center">Bank Account:</label>
                                                                          <div className="col-sm-12">
                                                                            <Form.Select name="account" className="form-control" required="" value={selectedBank} onChange={handleBank}>
                                                                              {/* <Form.Select className="form-control" */}
                                                                                  <option value="">Choose Bank</option>
                                                                                  {tableData.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                  {item.gl_name}
                                                                                </option>
                                                                              ))}
                                                                            </Form.Select>
                                                                          </div>
                                                                      </div>
                                                                  </div>

    <div className="row" style={{marginTop: 30}}>
    <div className="col-md-6">
      <div className="form-group row">
        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">
          Start Date:
        </label>
        <div className="col-sm-9">
          <input className="form-control" required="" type="date" onChange={handleDateChange} name="start" value={selectedDate} />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="form-group row">
        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">
          End Date:
        </label>
        <div className="col-sm-9">
          <input className="form-control" required="" type="date" onChange={handleDateChange1} name="end" value={selectedEndDate} />
        </div>
      </div>
    </div>
  </div>
  <div className="row justify-content-center" style={{marginTop: 30}}>
    <div className="col-md-4 text-center" > 
      <div className="form-group row">
        <Button variant='success' onClick={fetchAccounts}>
          {load ? (
            <>
              <Spinner size='sm'/>
              <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
            </>
          ) : (
            "Process"
          )}
        </Button>
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


                           

                            <div className="card">
                              <div className="card-body">
                            <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fs-17 font-weight-600 mb-0"></h6>
                        </div>

                      </div>
                    </div>
                        <div className="table-resposive">
                        <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                            <div className={classes.greenbtn} style={{ display: 'flex', }}>
                            <div>
                              {accounts.length > 0 && (
                <button onClick={() => navigate('/process_cash_book', { state: { accounts, inputss } })} style={{ height: 30, width: 150, borderRadius: 5 }}>PRINT REPORT</button>
            )}
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


                          {load ? (
                            <p>Fetching data...</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: 'nowrap' }}>
                                  <tr>
                                    <th>Post Date</th>
                                    <th>Value Date</th>
                                    <th>Particular</th>
                                    <th>Detail</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    
                                  </tr>
                                </thead>
                                <tbody style={{ whiteSpace: 'nowrap' }}>
                                  {displayedData.map((item, index) => (
                                    <tr key={index}>
                                      <td>{formatDate(item.created_at)}</td>
                                      <td>{item.transaction_date}</td>
                                      <td>{item.account?.gl_name}</td>
                                      <td>{item.details}</td>
                                      <td style={{textAlign: "right"}}>{parseFloat(item.debit).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                     <td style={{textAlign: "right"}}>{parseFloat(item.credit).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                    
                                    </tr>
                                  ))}
                                  {accounts.length > 0 && (
  <>
    <td colSpan={3}>Total</td>
    <td style={{textAlign: 'right', fontWeight: "bold"}}>{totalDebit}</td>
    <td style={{textAlign: 'right', fontWeight: "bold"}}>{totalCredit}</td>
    
  </>
)}
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
            </div>

            <InfoFooter />
        </div>
    )
}

export default Cashbook