import React, { useState, useEffect } from 'react';
import "../../Admin/assets/plugins/bootstrap/css/bootstrap.min.css";
import "../../Admin/assets/plugins/metisMenu/metisMenu.min.css";
import "../../Admin/assets/plugins/fontawesome/css/all.min.css";
import "../../Admin/assets/plugins/typicons/src/typicons.min.css";
import "../../Admin/assets/plugins/themify-icons/themify-icons.min.css";
import "../../Admin/assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../../../src/Admin/style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { InfoFooter } from '../../InfoFooter';
import { AdminHeaderNav } from '../../Admin/AdminHeaderNav';
import classes from './ManagepurchaseDelivery.module.css';
import favicon from '../../../src/Images/faviconn.png';


function ManagePurchaseDelivery() {
    const [bearer, setBearer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

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

    const fetchBooking = async () => {
        setIsLoading(true);
       
        try {
           
            const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/delivered-purchase-order', { headers });
            const results = response.data?.data?.orders;
           
            setTableData(results);
        } catch (error) {
            if (error.response && error.response.status === 401) {
              
              navigate('/login');
            } else {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
          }
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        if (bearer) {
            fetchBooking();

        }
    }, [bearer]);

  
    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
        return formattedDate;
    }

    function padZero(num) {
        return num < 10 ? `0${num}` : num;
    }


 
    
    const filteredData = tableData.filter(item => item.supplier_id.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
        navigate('/Purchase_Delivery');
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
                                                Add New Purchase Delivery
                                            </Button>
                                        </div>

                                    </nav>
                                    <div className="col-sm-8 header-title p-0">
                                        <div className="media">
                                            <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                                            <div className="media-body">
                                                <h1 className="font-weight-bold">Manage Purchase Delivery</h1>
                                                <small>Create and view your Prchase Deliveries...</small>
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
                                                            <p>Fetching orders...</p>
                                                        ) : (
                                                            <div className="table-responsive">
                                                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                    <thead style={{ whiteSpace: 'nowrap' }}>
                                                                        <tr>
                                                                            <th>S/N</th>
                                                                            <th>Order ID</th>
                                                                            <th>Supplier</th>
                                                                            <th> Supplied Quantity</th>
                                                                            <th> Supplied Price</th>
                                                                            <th> Supplied Amount</th>
                                                                            <th>Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody style={{ whiteSpace: 'nowrap' }}>
                                                                        {displayedData.map((item, index) => (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{item.order_id}</td>
                                                                                <td>{item.supplier?.name}</td>
                                                                                <td>{item.quantity_supplied}</td>
                                                                                <td style={{ textAlign: "right" }}>{parseFloat(item.supplied_price).toLocaleString('en-US', {
                                                                                    minimumIntegerDigits: 1,
                                                                                    minimumFractionDigits: 2,
                                                                                    maximumFractionDigits: 2
                                                                                })}</td>
                                                                                <td style={{ textAlign: "right" }}>{parseFloat(item.supplied_amount).toLocaleString('en-US', {
                                                                                    minimumIntegerDigits: 1,
                                                                                    minimumFractionDigits: 2,
                                                                                    maximumFractionDigits: 2
                                                                                })}</td>
                                                                                <td>{formatDate(item.date)}</td>
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

export default ManagePurchaseDelivery;