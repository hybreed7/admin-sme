import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import classes from '../../Admin/Sales-invoice-payment/SalesInvoicePayment.module.css';
import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form, Badge } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';

function SalesInvoicePayment() {
    // const [load, setLoad] = useState(false);
    // const [description, setDescription] = useState('');
    // const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
    // const [selectedCreditAccount, setSelectedCreditAccount] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [bearer, setBearer] = useState('');
    // const navigate = useNavigate();
    // const [amount, setAmount] = useState('');
    // const [amountToPay, setAmountToPay] = useState('');
    // const [totalAmount, setTotalAmount] = useState('');
    // const [outstanding, setOutstanding] = useState('');
    const [open, setOpen] = useState(false);
    const [invoice, setInvoice] = useState([]);
    const [invoice1, setInvoice1] = useState([]);
    // const [creditAcc, setCreditAcc] = useState([]);
    // const [debitAcc, setDebitAcc] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
    const [selectedCreditAccount, setSelectedCreditAccount] = useState('');
    const [selectedBookingId, setSelectedBookingId] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [amountToPay, setAmountToPay] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [outstanding, setOutstanding] = useState('');
    const [bookingId, setBookingId] = useState([]);
    const [creditAcc, setCreditAcc] = useState([]);
    const [debitAcc, setDebitAcc] = useState([]);

    const filteredData = invoice.filter(item => item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const formattedOutstanding = isNaN(parseFloat(outstanding)) ? '0.00' : parseFloat(outstanding).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const totalEntries = filteredData.length;
    const startIndexx = (currentPage - 1) * entriesPerPage + 1;
    const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
    const displayedData = filteredData.slice(startIndexx - 1, endIndexx);



    useEffect(() => {
        if (bearer) {

            fetchDebit();
            fetchCredit();
        }
    }, [bearer]);






    const handleDebitChange = (event) => {
        setSelectedDebitAccount(event.target.value);
    };
    const handleAccountChange = (event) => {
        setSelectedCreditAccount(event.target.value);
    };


    const fetchSales = async () => {
        setLoading(true);


        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/fetch-sales-invoice-payments`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const custome = response.data?.data;
            setInvoice(custome);

            //   console.log(results, "NI");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    const fetchSalesInv = async () => {
        setLoading(true);


        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/fetch-pending-sales-invoice`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const customee = response.data?.data;
            setInvoice1(customee);

            //   console.log(results, "NI");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bearer) {
            fetchSales();
            fetchDebit();
            fetchCredit();
            fetchSalesInv();
        }
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

    const goBack = () => {
        navigate(-1);
    }

    const handleSalesChange = (event) => {
        const selectedId = event.target.value;
        setSelectedInvoice(selectedId);
        //CONVERT THE selectedId to integer
        const intselectedId = parseInt(selectedId);
        const selectedBooking = invoice1.find(item => item.id == intselectedId);
        setDescription(selectedBooking?.description || '');
        setAmount(selectedBooking?.amount || '');
        setOutstanding(selectedBooking.balance || '');

    };


    const formattedAmount = isNaN(parseFloat(amount)) ? '0.00' : parseFloat(amount).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const handleValueChange = (value, name, values) => {
        setAmountToPay(value); // Update the balance state
        console.log(value, name, values);
    };

    const fetchDebit = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-cash-and-banks`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const cred2 = response.data?.data;


            setDebitAcc(cred2);

            //   console.log(cred2, "NIGERIA");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };


    const fetchCredit = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-account-by-sub-category-id?sub_category_id=${1}`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const cred1 = response.data?.data;
            setCreditAcc(cred1);

            console.log(cred1, "NI");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };


    const createPayment = async () => {
        setLoad(true);

        try {
            // const sanitizedAmountToPay = amountToPay.replace(/,/g, '');
            // const amountValue = Number(sanitizedAmountToPay);
            // console.log('After conversion:', amountValue);

            let requestData = {
                id: selectedInvoice,
                debit_gl_code: selectedDebitAccount,
                credit: selectedCreditAccount,
                amount: amountToPay || '', // Set to empty string if amountValue is falsy
            };

            // if (isNaN(amountValue)) {
            //     throw new Error('Invalid amount value');
            // }

            console.log(selectedInvoice, requestData);
            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/pay-sales-invoice',
                requestData,
                { headers }
            );

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
            fetchSalesInv();
            fetchSales();

            // Reset state values
            setSelectedInvoice('');
            setAmountToPay('');
            setSelectedDebitAccount('');
            setSelectedCreditAccount('');
            setDescription('');
            setAmount('');
            setTotalAmount('');
            setOutstanding('');

        } catch (error) {
            const errorStatus = error.response?.data?.message || error.message || 'Failed to make payment';
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: errorStatus,
            });
            console.error(errorStatus);
        } finally {
            setLoad(false);
        }
    };

    const handlePrintInvoice = (id) => {
        const selectedSales = invoice.find(item => item.id === id);


        navigate('/print_sales', { state: { selectedSales } });
    };


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

                                    <div className="col-sm-8 header-title p-0">
                                        <div className="media">
                                            <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                            <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", minWidth: '900px', }}>
                                                <div>
                                                    <h1 className="font-weight-bold">Invoice Payment Receipt</h1>
                                                    <small>Complete the respective fields ....</small>
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
                                                    <div className="card-body">
                                                        <div className="card-body">


                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Sales Invoice ID:</label>
                                                                        <div className="col-sm-9">
                                                                            <Form.Select name="account" className="form-control" required="" value={selectedInvoice} onChange={handleSalesChange}>
                                                                                <option value="">Choose invoice</option>
                                                                                {invoice1.map((item) => (
                                                                                    <option key={item.id} value={item.id}>
                                                                                        {item.invoice_number} - {item.customer?.name}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400"  >Description:</label>
                                                                        <div className="col-sm-9">
                                                                            <textarea
                                                                                className="form-control"
                                                                                required=""
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                                name="description"
                                                                                readOnly
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Amount:</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" readOnly type="text" value={formattedAmount} onChange={(e) => setAmount(e.target.value)} name="amount" style={{ textAlign: "right" }} />
                                                                        </div>
                                                                    </div>
                                                                </div>





                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Outstanding:</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" readOnly type="text" value={formattedOutstanding} onChange={(e) => setOutstanding(e.target.value)} name="amount" style={{ textAlign: "right" }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                                                        <div className="col-sm-9">
                                                                            <CurrencyInput
                                                                                //   
                                                                                name="amount-to-pay"
                                                                                decimalsLimit={2}
                                                                                className="form-control"
                                                                                value={amountToPay} // Set the value to the balance state
                                                                                onValueChange={handleValueChange}
                                                                                style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                                                            />
                                                                            {/* <input className="form-control" required="" type="text" value={amountToPay} onChange={handleChange} name="amount-to-pay" style={{textAlign: "right"}}/> */}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account:</label>
                                                                        <div className="col-sm-9">
                                                                            <Form.Select name="account" className="form-control" required="" value={selectedDebitAccount} onChange={handleDebitChange}>
                                                                                <option value="">Choose Debit Account</option>
                                                                                {creditAcc.map((item) => (
                                                                                    <option key={item.id} value={item.id}>
                                                                                        {item.gl_name}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </div>
                                                                </div>







                                                            </div>

                                                            <div style={{ marginTop: 20 }} />


                                                            <div class="modal-footer" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                                <Button variant='success' onClick={createPayment}>
                                                                    {load ? (
                                                                        <>
                                                                            <Spinner size='sm' />
                                                                            <span style={{ marginLeft: '5px' }}>Creating Sales Invoice Payment, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Create Sales Invoice Payment"
                                                                    )}
                                                                </Button>
                                                                {/* <Button>Save Changes</Button> */}
                                                                {/* <button type="submit" class="btn btn-success"><span id="loaderg" className="spinner-border spinner-border-sm me-2" role="status" style={{display:"none",}}></span>Save changes</button> */}
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


                                        {loading ? (
                                            <p>Fetching invoices...</p>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                    <thead style={{ whiteSpace: 'nowrap' }}>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>Customer</th>
                                                            <th>Invoice Number</th>
                                                            <th>Transaction Date</th>
                                                            <th>Description</th>
                                                            <th>Amount</th>
                                                            <th>Outstanding</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ whiteSpace: 'nowrap' }}>
                                                        {displayedData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.customer?.name}</td>
                                                                <td>{item.invoice?.invoice_number}</td>
                                                                <td>{item.invoice?.transaction_date}</td>
                                                                <td>{item.invoice?.description}</td>
                                                                <td style={{ textAlign: "right" }}>{parseFloat(item.invoice?.amount).toLocaleString('en-US', {
                                                                    minimumIntegerDigits: 1,
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}</td>
                                                                <td style={{ textAlign: "right" }}>{parseFloat(item.invoice?.balance).toLocaleString('en-US', {
                                                                    minimumIntegerDigits: 1,
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}</td>
                                                                <td style={{ textAlign: "left" }}><Badge bg={item.invoice?.balance === "0.00" ? 'success' : 'warning'}>{item.invoice?.balance === "0.00" ? 'Paid' : 'Pending'}</Badge></td>

                                                                <td style={{ textAlign: "left" }}>
                                                                    <div className="btn btn-success-soft btn-sm mr-1">
                                                                        <i className="far fa-eye"></i>
                                                                    </div>
                                                                    <div className="btn btn-danger-soft btn-sm">
                                                                        <i className="far fa-trash-alt"></i>
                                                                    </div>

                                                                    <div className="btn btn-sm printbtninv" onClick={() => handlePrintInvoice(item.id)}>
                                                                        <i className="fa fa-print dawg"></i>
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

export default SalesInvoicePayment;