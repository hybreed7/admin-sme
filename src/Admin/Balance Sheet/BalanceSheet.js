import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import classes from './BalanceSheet.module.css';
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


function BalanceSheet() {
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
    




    const filteredData = accounts.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

   
  
    const handleDateChange1 = (event) => {
      setSelectedEndDate(event.target.value);
    };
  
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

   
  
    
    

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


  
  

    const fetchAccounts = async () => {
      setLoad(true);
  
      try {
          const response = await axios.get(
              'https://api-sme.promixaccounting.com/api/v1/reports/balance-sheet',
              {
                  params: {},
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${bearer}`
                  }
              }
          );
  
          const resultsss = response.data?.data;
          setAccounts(resultsss);

  
          // console.log(resultssx, 'NI');
        } catch (error) {
          // if (error.response && error.response.status === 401) {
            
          //   navigate('/login');
          // } else {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
        // }
      } finally {
          setLoad(false);
      }
  };

   


   
  useEffect(() => {
    fetchAccounts();
}, [bearer]);

    

   

    
  

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

  

    const totalAmount = displayedData.reduce((total, item) => total + parseFloat(item.amount), 0);



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
                                                    <h1 className="font-weight-bold">Balance Sheet</h1>
                                                    <small></small>
                                                </div>
                                                {/* <div style={{ marginBottom: 30 }}>
                                                    <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                                                </div> */}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="card">
                              <div className="card-body">
                        <div className="table-resposive">
                        <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                            <div className={classes.greenbtn} style={{ display: 'flex', }}>
                            <div>
                              {accounts.length > 0 && (
                <button onClick={() => navigate('/balance_sheet_print', { state: { accounts} })} style={{ height: 30, width: 150, borderRadius: 5 }}>PRINT REPORT</button>
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
  <thead style={{ whiteSpace: 'nowrap', textAlign: "center" }}>
    <tr>
      <th>Description</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody style={{ whiteSpace: 'nowrap' }}>
    {displayedData.map((item, index) => (
      <React.Fragment key={index}>
        <tr>
        <th colSpan={4}>{item.description.toUpperCase()}</th>
        </tr>
        {item.categories?.map((category, catIndex) => (
          <React.Fragment key={catIndex}>
            <tr>
              <th colSpan={4} >{category.description}</th>
            </tr>
            {category.postings.map((posting, postIndex) => (
              <tr key={postIndex}>
                <td>{posting.name}</td>
                <td style={{textAlign: "right"}}>
                  {parseFloat(posting.amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
              </tr>
            ))}
             <tr>
                <td colSpan={1} style={{fontWeight: 'bold'}}>Total </td>
                <td style={{textAlign: "right", fontWeight: 'bold'}}>
                  {parseFloat(category.total).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
              </tr>
              <tr><td colSpan={4}>&nbsp;</td></tr>
          </React.Fragment>
        ))}
      </React.Fragment>
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
            </div>

            <InfoFooter />
        </div>
    )
}

export default BalanceSheet;