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

function CreateLoanAdvance() {

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedLoan, setSelectedLoan] = useState('');
  const [principalAmount, setPrincipalAmount] = useState('');
  const [loanInterest, setLoanInterest] = useState(0.00);
  const [interest, setInterest] = useState(0.00);
  const [totalRepayment, setTotalRepayment] = useState(0.00);
  const [monthlyDeduction, setMonthlyDeduction] = useState('');
  const [cheque, setCheque] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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
      setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account/fetch-loans', { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.description,
        value: item.id,
        interest: item.interest
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
      setBanks([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (bearer) {
        fetchSupplierss();
        fetchLoans();
        fetchBanks();
    }
  }, [bearer]);


  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
}

const handleLoanTypeChange = (selectedOption) => {
  setSelectedLoan(selectedOption);
  const selectedLoanInterest = selectedOption.interest;
  setLoanInterest(selectedLoanInterest === null ? "0.00" : selectedLoanInterest);
}

  const handleBankChange = (selectedOption) => {
    setSelectedBank(selectedOption);
}

const handleValueChange = (value, name, values) => {
  setPrincipalAmount(value);
};

const handleValueChange1 = (value, name, values) => {
  setLoanInterest(value);
};

const handleValueChange2 = (value, name, values) => {
  setInterest(value);
};

const handleValueChange3 = (value, name, values) => {
  setTotalRepayment(value);
};

const handleValueChange4 = (value, name, values) => {
  setMonthlyDeduction(value);
};

useEffect(() => {
  const calculateInterestRate = () => {
    const calculatedInterestRate = (parseFloat(loanInterest) / 100) * parseFloat(principalAmount);
    const formattedInterestRate = isNaN(calculatedInterestRate) ? "0.00" : calculatedInterestRate.toFixed(2);
    
    setInterest(formattedInterestRate);
  };

  calculateInterestRate();
}, [loanInterest, principalAmount]);


useEffect(() => {
  const calculateTotalRepayment = () => {
    const calculatedTotalRepayment = parseFloat(principalAmount) + parseFloat(interest);
    const formattedTotalRepayment = isNaN(calculatedTotalRepayment) ? "0.00" : calculatedTotalRepayment.toFixed(2);
    
    setTotalRepayment(formattedTotalRepayment);
  };

  calculateTotalRepayment();
}, [interest, principalAmount]);

useEffect(() => {
  const calculateReturn = () => {
    const calculatedReturn = parseFloat(totalRepayment) / parseFloat(duration);
    const formattedReturn = isNaN(calculatedReturn) ? "0.00" : calculatedReturn.toFixed(2);

    setMonthlyDeduction(formattedReturn);
  };

  calculateReturn();
}, [totalRepayment, duration]);



const createLoan = async () => {
  setCreateLoading(true);
  try {
    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/account/staff-loan',
      {
        member_name: selectedCustomer.value,
        loan_name: selectedLoan.value,
        bank: selectedBank.value,
        principal_amount: principalAmount,
        interest_amount: interest,
        total_repayment: totalRepayment,
        monthly_deduction: monthlyDeduction,
        loan_interest: loanInterest,
        duration: duration,
        transaction_date: selectedDate,
        cheque_number: cheque


      },
      { headers }
    );
    console.log(response.data.message)
    
    navigate('/loans_advances')

    // return
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
    });
    console.log(response.data);

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
                          <h1 className="font-weight-bold">Create New Loan </h1>
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
                                        value={selectedCustomer}
                                        onChange={(selectedOption) => handleSupplierChange(selectedOption)}
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Loan Type</label>
                                    <div className="col-sm-9">
                                      <Select
                                        value={selectedLoan}
                                        onChange={(selectedOption) => handleLoanTypeChange(selectedOption)}
                                        options={loans}
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Principal Amount</label>
                                    <div className="col-sm-9">
                                      {/* <div className="form-control" > */}
                                      <CurrencyInput

                                        name="principal amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={principalAmount} 
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                      {/* </div> */}

                                    </div>
                                  </div>
                                </div>


                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Loan Interest</label>
                                    <div className="col-sm-9">
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={loanInterest} 
                                        disabled
                                        onValueChange={handleValueChange1}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Interest</label>
                                    <div className="col-sm-9">
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={interest} 
                                        onValueChange={handleValueChange2}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Total Repayment</label>
                                    <div className="col-sm-9">
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={totalRepayment} 
                                        onValueChange={handleValueChange3}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Duration (Months)</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" onChange={(e) => setDuration(e.target.value)} name="duration" value={duration} />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Monthly Deduction</label>
                                    <div className="col-sm-9">
                                      
                                      <CurrencyInput

                                        name="loan interest"
                                        disabled
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={monthlyDeduction} 
                                        onValueChange={handleValueChange4}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                     

                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Select Bank</label>
                                    <div className="col-sm-9">
                                      <Select
                                        value={selectedBank}
                                        onChange={(selectedOption) => handleBankChange(selectedOption)}
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
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Cheque No.</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" onChange={(e) => setCheque(e.target.value)} name="cheque no" value={cheque} />
                                    </div>
                                  </div>
                                </div>
                                
                              </div>

                              <div style={{justifyContent: "flex-start"}} class="modal-footer">
                                <Button style={{borderRadius: 0}} variant="success" onClick={createLoan}>
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Applying, Please wait...</span>
                                    </>
                                  ) : (
                                    "Disburse New Loan"
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

            </div>
          </div>
        </div>
      </div>
      <InfoFooter />
    </div>
  )
}

export default CreateLoanAdvance;