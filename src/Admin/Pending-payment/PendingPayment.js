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
import classes from './PendingPayment.module.css';
import favicon from '../../Images/faviconn.png'
import Chart from 'chart.js/auto';


function PendingPayment() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => {

  };

  const handleNavCheque = () => {
    if (selectedRows.length !== 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: selectedRows.length === 0 ? 'Please select a row to generate a cheque!' : 'Please select only one row to generate a cheque!',
      });
      return;
    }
    const selectedRow = selectedRows[0]; // Get the selected row object
    const { id, description, total_amount, beneficiary } = selectedRow; // Destructure the selected row object
    const selectedData = { id, description, total_amount, beneficiary }; // Create a new object with the required properties
    // console.log(selectedData, "pending payment");

    navigate('/print_cheque1', { state: selectedData }); // Pass selectedData directly
  }




  const handleShow1 = () => {
    if (selectedRows.length > 0) {
      setShow1(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one row to proceed!',
      });
    }
  };



  const handleBank = (event) => {
    setSelectedBank(event.target.value);
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

  const fetchBankss = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/get-account-by-sub-category-id?sub_category_id=${1}`, { headers });
      const bank = response.data?.data;

      setBanks(bank);
      // console.log(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
        navigate('/login');
      } else {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setBanks([]);
    }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (row) => {
    const selectedIndex = selectedRows.findIndex(item => item.id === row.id);
    let updatedSelectedRows = [];
  
    if (selectedIndex === -1) {
      updatedSelectedRows = [...selectedRows, row];
    } else {
      updatedSelectedRows = selectedRows.filter(item => item.id !== row.id);
    }
  
    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.length === tableData.length);
    // console.log(updatedSelectedRows);
  };
  
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedRows(isChecked ? [...tableData] : []);
    // console.log(isChecked ? [...tableData] : []);
  };
  

 

  const handleCheque = async () => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will generate a cheque for your payment. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await axios.post(`https://api-sme.promixaccounting.com/api/v1/payment_voucher/make-voucher-payment`,
            {
              id: selectedRows,
              bank: selectedBank,
              gateway: "cheque"
            },
            { headers });

          const instructionData1 = response.data?.data;
          setResponseData(instructionData1);
          navigate('/print_cheque1', { state: { responseData1: instructionData1 } });
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);

        } finally {
          setLoading(false);
        }
      }
    });
  };


 



  useEffect(() => {
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My Dataset',
          data: [10, 20, 30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false // Hides the legend
          },
          afterDraw: function (chart) {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            // Position of labels
            var fontSize = (height / 150).toFixed(2);
            ctx.font = fontSize + "em Verdana";
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            // Loop through each data in the dataset and draw the label to the right side
            chart.data.datasets.forEach(function (dataset, i) {
              var meta = chart.getDatasetMeta(i);
              if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                  // Draw the label
                  var data = dataset.data[index];
                  if (data !== 0) {
                    var posX = element.tooltipPosition().x + (width * 0.02);
                    var posY = element.tooltipPosition().y;
                    ctx.fillStyle = dataset.backgroundColor[index];
                    ctx.fillText(dataset.labels[index] + ": " + data, posX, posY);
                  }
                });
              }
            });
          }
        }
      }
    });

    // Cleanup
    return () => myPieChart.destroy();
  }, []);


  const isSelected = (id) => {
    return selectedRows.includes(id);
  };

  const fetchPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/payment_voucher/pending_payment_list', { headers });
      const results = response.data?.data?.payments;
      setTableData(results);
      // console.log(results);
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
      fetchPayment();
      fetchBankss();

    }
  }, [bearer]);


  const handleGeneratePaymentInstruction = () => {
    const rowsToPass = selectedRows.length > 0 ? selectedRows : tableData;
    
    navigate('/payment_order', { state: { rows: rowsToPass, selectedBank } });
  };
  
// console.log(selectedBank);








  const filteredData = tableData.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase()));

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





  const handlePrintInvoice = (id) => {
    const selectedVoucher = tableData.find(item => item.id === id);


    navigate('/print_voucher', { state: { selectedVoucher } });
  };

  const handleViewVoucher = (id) => {
    const selectedVoucher = tableData.find(item => item.id === id);


    navigate('/view_pending', { state: { selectedVoucher } });
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

                {/* <!--Content Header (Page header)bu--> */}
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

                      <Button variant="success" className={classes.gnrtepayrl} onClick={handleNavCheque}>
                        Pay by Cheque
                      </Button>
                      <Button variant="secondary" className={classes.gnrtepaymnt} onClick={handleShow1}>
                        Generate Payment Instruction
                      </Button>
                      {/* <a href="https://payroll.patna.ng/admin/download-database" download>
                    <Button variant="secondary" className={classes.gnrtedb} >
                      Download DB
                    </Button>
                  </a> */}
                    </div>


                    <Modal

                      show={show}
                      onHide={handleClose}
                      animation={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Pay by Cheque</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Select a bank</Form.Label>
                            <Form.Select name="account" className="form-control" required="" >
  <option value="">Choose Bank</option>
  
</Form.Select>




                          </Form.Group>
                        </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="success" onClick={handleCheque}>
                          {loading ? (
                            <>
                              <Spinner size='sm' />
                              <span style={{ marginLeft: '5px' }}>Generating Cheque, Please wait...</span>
                            </>
                          ) : (
                            "Generate Cheque"
                          )}
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal

                      show={show1}
                      onHide={handleClose1}
                      animation={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Generate Payment Instruction</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Select a bank</Form.Label>
                            <Form.Select name="account" className="form-control" required="" value={selectedBank} onChange={handleBank}>
                              <option value="">Choose Bank</option>
                              {banks.map((item) => (
                                <option key={item.id} value={JSON.stringify(item)}>
                                  {item.gl_name}
                                </option>
                              ))}
                            </Form.Select>
                            <div style={{ marginTop: 10 }} />
                          </Form.Group>
                        </Form>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose1}>
                          Cancel
                        </Button>
                        <Button variant="success" onClick={handleGeneratePaymentInstruction}>
                          {load ? (
                            <>
                              <Spinner size='sm' />
                              <span style={{ marginLeft: '5px' }}>Generating Payment Instruction, Please wait...</span>
                            </>
                          ) : (
                            "Generate Payment Instruction"
                          )}
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
                        <h1 className="font-weight-bold">My Pending Payment Voucher</h1>
                        <small>View your pending payment voucher...</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                    <div className="card overflow-hidden" style={{ height: 150, }}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <p className="text-muted fs-13 mb-0">Total Paid</p>
                            <h3 className="mb-2 fw-semibold" style={{ textAlign: "right", marginTop: 10 }}>₦</h3>
                            <p className="text-muted mb-0 mt-2 fs-12"></p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                    <div className="card overflow-hidden" style={{ height: 150, }}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <p className="text-muted fs-13 mb-0">Total Outstanding</p>
                            <h3 className="mb-2 fw-semibold" style={{ textAlign: "right", marginTop: 10 }}>₦</h3>
                            <p className="text-muted mb-0 mt-2 fs-12"></p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                    <div className="card overflow-hidden" style={{ height: 150, }}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col" style={{ height: 130, width: 130 }}>

                            <canvas id="myPieChart" ></canvas>
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
                      <div className="card">
                        {/* <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fs-17 font-weight-600 mb-0">My Bookings</h6>
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
                              <p>Fetching vouchers...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                    <tr>
                                      <th>
                                        <input
                                          type="checkbox"
                                          checked={selectAll}
                                          onChange={handleSelectAllChange}
                                        />
                                      </th>
                                      <th>S/N</th>
                                      <th>Beneficiary</th>
                                      <th>PV Number</th>
                                      <th>Date</th>
                                      {/* <th>Status</th>
      <th>Approval Status</th> */}
                                      <th>Total Amount</th>
                                      <th>Contract Amount</th>
                                      <th>Total Tax Amount</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                      <tr key={index}>
                                        <td>
                                          <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(item)}
                                            checked={isSelected(item)}
                                          />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.beneficiary === null ? item.description : item.beneficiary?.name}</td>
                                        <td>{item.pvnumber}</td>
                                        <td>{item.date}</td>
                                        {/* <td>{item.payment_status === "0" ? "Pending" : "Paid"}</td>
        <td>{item.approval_status === "0" ? "Pending" : item.approval_status === "1" ? "Approved" : item.approval_status === "2" ? "Disapproved" : "null"}</td> */}
                                        <td style={{ textAlign: "right" }}>{parseFloat(item.total_amount).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                        <td style={{ textAlign: "right" }}>{parseFloat(item.contract_amount).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                        <td style={{ textAlign: "right" }}>{parseFloat(item.total_tax_amount).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}</td>
                                        <td>
                                          <div onClick={() => handleViewVoucher(item.id)} className="btn btn-success-soft btn-sm mr-1">
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

export default PendingPayment;