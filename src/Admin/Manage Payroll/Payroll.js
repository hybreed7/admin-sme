import React, { useState, useEffect } from 'react';
// import Happiness from '../src/Images/happiness.svg';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
// import "../assets/p"
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner, NavItem } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import classes from './Payroll.module.css'
import favicon from '../../Images/faviconn.png'
import { useNavigate } from 'react-router';
import Payslip from '../Payslip/Payslip';


function Payroll() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [allowanceData, setAllowanceData] = useState([]);
  const [staffIdAllowances, setStaffAllowances] = useState([]);
  const [deductionData, setDeductionData] = useState([]);
  const [staffAllowance, setStaffAllowance] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [paymentInstruction, setPaymentInstruction] = useState([]);
  const [grade, setGrade] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [annualBasic, setAnnualBasic] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [gender, setGender] = useState('');
  const [grade1, setGrade1] = useState('');
  const [steps, setSteps] = useState('');
  const [level1, setLevel1] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [grossEarnings, setGrossEarnings] = useState('');
  const [grossEarning, setGrossEarning] = useState('');
  const [totalGrossDeduction, setTotalGrossDeduction] = useState('');
  const [totalGrossEarning, setTotalGrossEarning] = useState('');
  const [grossDeductions, setGrossDeductions] = useState('');
  const [grossDeduction, setGrossDeduction] = useState('');
  const [netPay, setNetPay] = useState('');
  const [showPayslip, setShowPayslip] = useState(false);
  const [payslipMonthYear, setPayslipMonthYear] = useState('');
  const [payslipProps, setPayslipProps] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(false);



  const [step, setStep] = useState("");
  const [step1, setStep1] = useState("");

  const [selectedStep, setSelectedStep] = useState(null);
  const navigate = useNavigate()






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




  useEffect(() => {
    if (bearer) {
      fetchPayroll();

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


  const fetchPayroll = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://payroll.patna.ng/api/admin/payroll', { headers });
      const responseData = response.data?.data;
      const responses = response.data?.data?.payrolls;
      const responsess = response.data?.data?.allowances;
      const responsesss = response.data?.data?.deductions;
      const responsessss = response.data?.data?.staffAllowances;
      const responsesssss = response.data?.data?.months;
      const responsessssss = response.data?.data?.years;
      const responsesssssss = response.data?.data?.banks;


      // const allowanceFields = Object.keys(responses).filter(field => field.endsWith('allowance') && !field.endsWith('total_allowance'));

      // Log the filtered fields (you can modify this part based on your needs)


      setTableData2(responseData);
      setPayrollData(responses);
      setAllowanceData(responsess);
      setDeductionData(responsesss);
      setStaffAllowance(responsessss);
      setMonthData(responsesssss);
      setYearData(responsessssss);
      setBankData(responsesssssss);



    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData2([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePayroll = async () => {
    setLoading(true);


    try {
      const response = await axios.post(
        'https://payroll.patna.ng/api/admin/payroll/generate_monthly_payroll',
        {
          month: selectedMonth,
          year: selectedYear,
        },
        { headers }
      );
      fetchPayroll();
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Successfull',
        text: response.data.message,
      });
      // console.log(response.data); 

    } catch (error) {
      const errorStatus = error.response;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response,
      });
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePaymentInstruction = async () => {
    setLoading(true);
  
    try {
    
      const accessToken = bearer;
  
      const response = await axios.get(
        'https://payroll.patna.ng/api/admin/payroll/payment_instruction',
        {
          params: {
            month: selectedMonth,
            year: selectedYear,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`, 
             },
        }
      );
  setPaymentInstruction(response.data?.data?.payrolls)
  console.log(response.data?.data?.payrolls);
      fetchPayroll();
      handleClose1();
      navigate('/payment_instruction', { state: { paymentInstruction: response.data?.data?.payrolls, selectedBank, selectedMonth, selectedYear } });
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Successful',
      //   text: response.data.message,
      // });
    } catch (error) {
      const errorStatus = error.response;
  
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus.data.message,
      });
  
      console.error(errorStatus.data.message);
    } finally {
      setLoading(false);
    }
  };
  



  const filteredData = payrollData.filter(item => item.staff_name.toLowerCase().includes(searchTerm.toLowerCase()));


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


  const filteredAllowances = payrollData.map((item) => {
    if (typeof item === 'object' && item !== null) {
      const filteredItem = {};
      Object.keys(item).forEach((key) => {
        const lowercaseKey = key.toLowerCase();

        if (lowercaseKey.endsWith('allowance') && lowercaseKey !== 'total_allowance') {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    }

    return item;
  });

  const tableHeaders = Object.keys(filteredAllowances[0] || {});

  const filteredDeductions = payrollData.map((item) => {
    if (typeof item === 'object' && item !== null) {
      const filteredItems = {};
      Object.keys(item).forEach((key) => {
        const lowercaseKey = key.toLowerCase();

        if (lowercaseKey.endsWith('deduction') && lowercaseKey !== 'total_deduction') {
          filteredItems[key] = item[key];
        }
      });
      return filteredItems;
    }

    return item;
  });

  const tableHeader = Object.keys(filteredDeductions[0] || {});

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);

  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);

  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);

  };

  const handlePayslip = (selectedItemId) => {

    const selectedItem = displayedData.find((item) => item.id === selectedItemId);

    if (selectedItem) {

      // console.log('Selected Item:', selectedItem);
      // Update state with selected item data
      setEmployeeName(selectedItem.staff_name);
      setEmployeeNumber(selectedItem.staff_number);
      setGender(selectedItem.staff?.gender);
      setGrade1(selectedItem.staff?.grade);
      setSteps(selectedItem.staff?.step);
      setLevel1(selectedItem.staff?.level);
      setBankName(selectedItem.account_bank);
      setAccountNumber(selectedItem.account_number);
      // console.log(selectedItem.staff_name, "latestt");


      const payslipMonth = selectedItem.month;
      const payslipYear = selectedItem.year;
      setPayslipMonthYear(`${payslipMonth} - ${payslipYear}`);


      const monthlyBasic = selectedItem.monthly_basic || 0;
      const filteredAllowances = Object.entries(selectedItem)
        .filter(([key, value]) => key.endsWith('allowance') && key !== 'total_allowance' && value > 0)
        .map(([key, value]) => ({ name: key, value }));

      const filteredDeductions = Object.entries(selectedItem)
        .filter(([key, value]) => key.endsWith('deduction') && key !== 'total_deduction' && value > 0)
        .map(([key, value]) => ({ name: key, value }));

      setGrossEarnings([
        { name: 'Monthly Basic', value: monthlyBasic },
        ...filteredAllowances,
      ]);

      setGrossDeductions(filteredDeductions);

      const totalGrossEarning = monthlyBasic + filteredAllowances.reduce((sum, allowance) => sum + allowance.value, 0);
      const totalGrossDeduction = filteredDeductions.reduce((sum, deduction) => sum + deduction.value, 0);
      const netPay = totalGrossEarning - totalGrossDeduction;

      setTotalGrossEarning(totalGrossEarning);
      setTotalGrossDeduction(totalGrossDeduction);
      setNetPay(netPay);


      const payslipProps = {
        payslipMonthYear,
        employeeName,
        employeeNumber,
        gender,
        grade1,
        steps,
        level1,
        bankName,
        accountNumber,
        grossEarnings,
        grossDeductions,
        totalGrossEarning,
        totalGrossDeduction,
        netPay,
      };

      setPayslipProps(payslipProps);



      setShowPayslip(true);
      navigate('/payslip', { state: selectedItem });

    }
  };


  const paySlip = (selectedItemId) => {
    handlePayslip(selectedItemId);
  };





  return (
    <div className="fixed">

      <div className="wrapper">
        <div className="content-wrapper">
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

                  <Button variant="success" className={classes.gnrtepayrl} onClick={handleShow}>
                    Generate Payroll
                  </Button>
                  <Button variant="primary" className={classes.gnrtepaymnt} onClick={handleShow1}>
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
                  // onHide={handleClose1}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Generate Payroll</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div style={{ marginTop: 10 }} />
                        <Form.Label>Select a month</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedMonth}
                          onChange={handleMonthChange}
                        >
                          <option value="" disabled>Select a month</option>
                          {monthData.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </Form.Control>
                        <div style={{ marginTop: 10 }} />
                        <Form.Label>Select a Year</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          <option value="" disabled>Select a year</option>
                          {yearData.map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Control>

                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="success" onClick={handleGeneratePayroll}>
                      {loading ? (
                        <>
                          <Spinner size='sm' />
                          <span style={{ marginLeft: '5px' }}>Generating Payroll, Please wait...</span>
                        </>
                      ) : (
                        "Generate Payroll"
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
                    <Modal.Title>Generate Payment Structure</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div style={{ marginTop: 10 }} />
                        <Form.Label>Select a bank</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedBank}
                          onChange={handleBankChange}
                        >
                          <option value="" >Select a bank</option>
                          {bankData.map((bank) => (
                            <option key={bank.id} value={bank.name}>
                              {bank.name}
                            </option>
                          ))}
                        </Form.Control>
                        <div style={{ marginTop: 10 }} />
                        <Form.Label>Select a month</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedMonth}
                          onChange={handleMonthChange}
                        >
                          <option value="" >Select a month</option>
                          {monthData.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </Form.Control>
                        <div style={{ marginTop: 10 }} />
                        <Form.Label>Select a Year</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          <option value="" >Select a year</option>
                          {yearData.map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Control>

                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose1}>
                      Cancel
                    </Button>
                    <Button onClick={handleGeneratePaymentInstruction} variant="success" >
                      {loading ? (
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
                    <h1 className="font-weight-bold">Manage Payroll</h1>
                    <small>Create and update your payroll...</small>
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






                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fs-17 font-weight-600 mb-0">Payrolls</h6>
                        </div>

                      </div>
                    </div>
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
                          <p>Fetching Payroll...</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
                              <thead style={{ whiteSpace: 'nowrap' }}>
                                <tr>
                                  <th>S/N</th>
                                  <th>Staff Number</th>
                                  <th>Staff Name</th>
                                  <th>Year</th>
                                  <th>Month</th>
                                  <th>Monthly Basic</th>

                                  {tableHeaders.map((header) => (
                                    <th key={header}>
                                      {header.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                                    </th>
                                  ))}

                                  {tableHeader.map((header) => (
                                    <th key={header}>
                                      {header.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                                    </th>
                                  ))}



                                  <th>Gross Pay</th>
                                  <th>Net Pay</th>
                                  <th>Created At</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{ whiteSpace: 'nowrap' }}>
                                {displayedData.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.staff_number}</td>
                                    <td>{item.staff_name}</td>
                                    <td>{item.year}</td>
                                    <td>{item.month}</td>
                                    <td>{parseFloat(item.monthly_basic).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                    {tableHeaders.map((header) => {
                                      const formattedValue = parseFloat(item[header]).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      });

                                      return <td key={header}>{formattedValue}</td>;
                                    })}
                                    {tableHeader.map((header) => {
                                      const formattedValue = parseFloat(item[header]).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      });

                                      return <td key={header}>{formattedValue}</td>;
                                    })}

                                    <td>{parseFloat(item.gross_pay).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                    <td>{parseFloat(item.net_pay).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
                                    <td>{formatDate(item.created_at)}</td>
                                    <td>
                                      <Button variant="primary" onClick={() => paySlip(item.id)}>Pay Slip</Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {/* {showPayslip && <Payslip {...payslipProps} />} */}
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
          <InfoFooter />
          {/* <!--/.footer content--> */}
          <div className="overlay"></div>
        </div>
        {/* <!--/.wrapper--> */}


      </div>
    </div>

  )
}

export default Payroll