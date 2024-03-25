import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import Select from 'react-select';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import classes from './savings_withdrawal.module.css';

function SavingsWithdrawal() {

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedSavings, setSelectedSavings] = useState('');
  const [principalAmount, setPrincipalAmount] = useState('');
  const [loanInterest, setLoanInterest] = useState(0.00);
  const [interest, setInterest] = useState(0.00);
  const [totalRepayment, setTotalRepayment] = useState(0.00);
  const [monthlyDeduction, setMonthlyDeduction] = useState('');
  const [balance, setBalance] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [banks, setBanks] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [customerSavings, setCustomerSavings] = useState([]);
  const [chequeNo, setChequeNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [amountToPay, setAmountToPay] = useState('');
  // const [selectedDate, setSelectedDate] = useState('');
  const [selectedMember, setSelectedMember] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState('')
  // const [selectedDate, setSelectedDate] = useState('');
    // const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedLoanType, setSelectedLoanType] = useState('');
    const [Outstanding, setOutstanding] = useState(0);
    // const [amountToPay, setAmountToPay] = useState('');
    // const [banks, setBanks] = useState([]);
    const [loanData, setLoanData] = useState([]);
    const [customerLoan, setCustomerLoan] = useState([]);
    // const [customers, setCustomers] = useState([]);
    const [entriesPerPage, setEntriesPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [amountPaid, setAmountPaid] = useState(0);
    const [totalPrincipal, setTotalPrincipal] = useState(0);
    // const [loading, setLoading] = useState(false);
    const [repaymentLoading, setRepaymentLoading] = useState(false);
    const [load, setLoad] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [bearer, setBearer] = useState('');
    // const navigate = useNavigate();
    // const [selectedBank, setSelectedBank] = useState('');
    const [loan, setLoan] = useState([]);
    const [amount1, setAmount1] = useState("");
    const [transactionDate1, setTransactionDate1] = useState("");
    const [selectedBankbank1, setSelectedBankbank1] = useState("");
    const [selectedCustomer1, setSelectedCustomer1] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [tableData, setTableData] = useState([]);


  const handleMemberChange = (event) => {
    setSelectedMember(event.target.value)
  }

  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  const fetchSavingsWithdrawal = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/customer/fetch-savings-withdrawal', { headers });
        const results = response.data?.data;
        // console.log(results)
        setTableData(results);
        //   setSelectOptions(options);
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
useEffect(() => {
    if (bearer) {

        fetchSavingsWithdrawal();
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

  const fetchSupplierss = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/customer', { headers });
      const results = response.data?.data;

      const options = results.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setCustomers(results);
      //   console.log(results,"here")
      setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLoans = async (selectedCustomer) => {
    setIsLoading(true);
    // console.log(selectedCustomer)
    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/customer/savings?customer_id=${selectedCustomer}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      //   const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account/fetch-savings', { headers });
      const results = response.data?.data;
      setCustomerSavings(results);
      // console.log(results)
      const options1 = results.map((item) => ({
        label: item.prefix,
        value: item.id,
      }));
      setLoans(options1);
      // setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${1}`, { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.gl_name,
        value: item.id,
      }));
      setBanks(options1);
      // setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentMethod = async () => {
    setLoading(true);


    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/income/get-payment-method`,
        {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const resultsss = response.data?.data;
      const paymentMethh = resultsss.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setPaymentMethod(paymentMethh);

      //   console.log(resultss, "NI");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (bearer && selectedCustomer) {
      fetchLoans(selectedCustomer);
    }
  }, [bearer, selectedCustomer]);

  useEffect(() => {
    if (bearer) {
      fetchSupplierss();
      // fetchLoans(selectedCustomer);
      fetchBanks();
      fetchPaymentMethod();
    }
  }, [bearer]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption.value);
    setBalance('');
    setSelectedSavings('');
  }

  const handleSavingsChange = (selectedOption) => {
    setSelectedSavings(selectedOption.value);
    const selectedSavingsData = customerSavings.find((savings) => savings.id === selectedOption.value);
    setBalance(selectedSavingsData.balance);

  };

  const handleModeChange = (selectedOption) => {
    setSelectedMode(selectedOption);
  }

  






  const createSavings = async () => {
    setCreateLoading(true);
    try {
      console.log(selectedCustomer, amountToPay, selectedDate, selectedSavings, selectedBank, chequeNo)
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/customer/savings-withdrawal',
        {
          customer_id: selectedCustomer,
          amount: amountToPay,
          transaction_date: selectedDate,
          account_id: selectedSavings,
          bank: selectedBank,
          cheque_number: chequeNo

        },
        { headers }
      );
      // console.log(response.data.message)

      navigate('/savings')

      // return
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      // console.log(response.data);

    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(error);
    } finally {
      setCreateLoading(false);
    }
  };

  ;

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption.value);
  }

  const handleValueChange = (value, name, values) => {
    setAmountToPay(value); // Update the balance state
};


//filter function
const filteredData = tableData.filter(item => item.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">Create New Savings Withdrawal</h1>
                          <small>Complete the respective fields ....</small>
                        </div>
                        <div style={{ marginBottom: 30 }}>
                          <Button variant='success' onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Button>
                        </div>
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Transaction Date</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Customer / Employee / Member</label>
                                    <div className="col-sm-9">
                                      <Select
                                        // value={selectedCustomer}
                                        // onChange={(selectedOption) => handleSupplierChange(selectedOption)}
                                        onChange={handleSupplierChange}
                                        options={selectOptions}
                                        menuPortalTarget={document.body}
                                        styles={{
                                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Savings Type</label>
                                    <div className="col-sm-9">
                                      <Select
                                        // value={selectedSavings}
                                        // onChange={(selectedOption) => handleSavingsChange(selectedOption)}
                                        onChange={handleSavingsChange}
                                        options={loans}
                                        // menuPortalTarget={document.body}
                                        styles={{
                                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Balance</label>
                                    <div className="col-sm-9" >
                                      <CurrencyInput
                                        style={{ width: '350px', height: '38px', textAlign: 'right', padding: '10px' }}
                                        value={balance}
                                        // onChange={(selectedOption) => handleBankChange(selectedOption)}

                                        menuPortalTarget={document.body}
                                        disabled
                                        styles={{
                                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: '200px',
                                            overflowY: 'auto',


                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Mode of Savings</label>
                                    <div className="col-sm-9">
                                      <Select
                                        value={selectedMode}
                                        onChange={(selectedOption) => handleModeChange(selectedOption)}
                                        options={paymentMethod}
                                        menuPortalTarget={document.body}
                                        styles={{
                                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Bank</label>
                                    <div className="col-sm-9">
                                      <Select
                                        onChange={handleBankChange}
                                        options={banks}
                                        menuPortalTarget={document.body}
                                        styles={{
                                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                          menu: (provided) => ({
                                            ...provided,
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                          }),
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row" >
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Amount To Withdraw</label>
                                    <div className="col-sm-9">

                                      <CurrencyInput
                                        name="principal amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={amountToPay}
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />


                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Cheque No</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" 
                                       name="cheque-no"
                                       
                                       value={chequeNo} // Set the value to the balance state
                                       onChange={(e) => setChequeNo(e.target.value)}
                                       
                                      
                                      />
                                    </div>
                                  </div>
                                </div>


                              </div>



                              <div style={{ justifyContent: "flex-start" }} class="modal-footer">
                                <Button style={{ borderRadius: 0 }} variant="success" onClick={createSavings}>
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Applying, Please wait...</span>
                                    </>
                                  ) : (
                                    "Create Savings Withdrawal"
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
            <p>Fetching savings...</p>
        ) : (
            <div className="table-responsive">
                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                    <thead style={{ whiteSpace: 'nowrap' }}>
                        <tr>
                            {/* <th>S/N</th> */}
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Withdrawal Type</th>
                            <th>Amount withdrawn</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody style={{ whiteSpace: 'nowrap' }}>
                        {displayedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.transaction_date}</td>
                                <td>{item?.customer?.name}</td>
                                <td>{item?.savings_account?.saving_type?.description}</td>
                                <td style={{ textAlign: "right" }}>{parseFloat(item.amount).toLocaleString('en-US', {
                                    minimumIntegerDigits: 1,
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>

                                {/* <td> */}
                                {/* <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                <i className="far fa-eye"></i>
                            </div> */}
                                {/* <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                <i className="far fa-trash-alt"></i>
                            </div> */}
                                {/* </td> */}
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

export default SavingsWithdrawal;