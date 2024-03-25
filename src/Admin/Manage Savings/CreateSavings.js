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

function CreateSavings() {

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
  const [customers, setCustomers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [banks, setBanks] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);

  // const [selectedDate, setSelectedDate] = useState('');
  const [selectedMember, setSelectedMember] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState('')
  

  const handleMemberChange = (event) =>{
    setSelectedMember(event.target.value)
  }

  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  
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
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account/fetch-savings', { headers });
      const results = response.data?.data;

      const options1 = results.map((item) => ({
        label: item.description,
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
    if (bearer) {
        fetchSupplierss();
        fetchLoans();
        fetchBanks();
        fetchPaymentMethod();
    }
  }, [bearer]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  const handleSupplierChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
}

const handleSavingsChange = (selectedOption) => {
  setSelectedSavings(selectedOption);
}

  const handleModeChange = (selectedOption) => {
    setSelectedMode(selectedOption);
}

const handleValueChange = (value, name, values) => {
  setPrincipalAmount(value);
};






const createSavings = async () => {
  setCreateLoading(true);
  try {
  
    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/account/staff-savings',
      {
        member_id: selectedCustomer.value,
        amount: principalAmount,
        transaction_date: selectedDate,
        mode_of_savings: selectedMode.value,
        savings_type: selectedSavings.value,
        debit_account: selectedBank.value

        


      },
      { headers }
    );
    console.log(response.data.message)
    
    navigate('/savings')

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

;

const handleBankChange = (selectedOption) => {
  setSelectedBank(selectedOption);
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

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">Create New Savings </h1>
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Savings Type</label>
                                    <div className="col-sm-9">
                                      <Select
                                        value={selectedSavings}
                                        onChange={(selectedOption) => handleSavingsChange(selectedOption)}
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Amount To Save</label>
                                    <div className="col-sm-9">
                                     
                                      <CurrencyInput
                                        name="principal amount"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={principalAmount} 
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account</label>
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

                                

                              </div>

                              

                              <div style={{justifyContent: "flex-start"}} class="modal-footer">
                                <Button style={{borderRadius: 0}} variant="success" onClick={createSavings}>
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Applying, Please wait...</span>
                                    </>
                                  ) : (
                                    "Create Savings"
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

export default CreateSavings;