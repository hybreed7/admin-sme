import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
// import classes from './ManageUser.module.css';
import classes from  './PrintCheque1.module.css'
import favicon from '../../Images/faviconn.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';



export default function PrintCheque1() {
  const [banks, setBanks] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [chequeLoading, setChequeLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [bearer, setBearer] = useState('');
  const [description, setDescription] = useState('');
  const [beneficiary1, setBeneficiary1] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [totalNetPayInWords, setTotalNetPayInWords] = useState('');
  const location = useLocation();
  const selectedData = location.state;

  
  
  useEffect(() => {
    if (selectedData) {
      setDescription(selectedData?.description);
      setBeneficiary(selectedData.beneficiary?.name);
      setBeneficiary1(selectedData.beneficiary);
      setTotalAmount(selectedData?.total_amount);
     

      const totalInWords = convertToWords(parseFloat(selectedData?.total_amount));
      setTotalNetPayInWords(totalInWords);
    }
}, [selectedData]);


const convertToWords = (number) => {
  // Check if number is not a valid number
  if (isNaN(number) || number === '' || number === null) {
    return 'Invalid number';
  }

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = [
    '',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const suffixes = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  const numToWords = (num) => {
    if (num === 0) return '';
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
    if (num < 1000)
      return units[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numToWords(num % 100) : '');
    for (let i = 1; i <= 4; i++) {
      if (num < Math.pow(1000, i + 1)) {
        return numToWords(Math.floor(num / Math.pow(1000, i))) + ' ' + suffixes[i] +
          (num % Math.pow(1000, i) !== 0 ? ' ' + numToWords(num % Math.pow(1000, i)) : '');
      }
    }
    return 'Number too large to convert';
  };

  const [integerPart, decimalPart] = number.toFixed(2).split('.');
  const integerWords = parseInt(integerPart, 10) !== 0 ? numToWords(parseInt(integerPart, 10)) + ' Naira' : '';
  const decimalWords = parseInt(decimalPart, 10) !== 0 ? ' ' + numToWords(parseInt(decimalPart, 10)) + ' Kobo' : '';

  const result = (integerWords + (integerWords && decimalWords ? ',' : '') + decimalWords).trim();

  return result;
};




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

  const handleBank = (event) => {
    setSelectedBank(event.target.value);
  };

  const fetchBankss = async () => {
    setBankLoading(true);
    try {
      const response = await axios.get(`https://api-sme.promixaccounting.com/api/v1/get-account-by-sub-category-id?sub_category_id=${1}`, { headers });
      const bank = response.data?.data;
     
      setBanks(bank);
      // console.log(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setBanks([]);
    } finally {
      setBankLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchBankss();
    }
  }, [bearer]);

  
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
        setChequeLoading(true);
        // console.log(selectedBank, selectedData.id);
        try {
          const selectedDataId = [selectedData.id];
          const response = await axios.post(`https://api-sme.promixaccounting.com/api/v1/payment_voucher/make-voucher-payment`, 
          {
            id: selectedDataId,
            bank: selectedBank,
            gateway: "cheque"
          },
          { headers });
          
          // const instructionData1 = response.data?.data;
          // setResponseData(instructionData1);
          window.print();
        } catch (error) {
          const errorStatus = error.response?.data?.message;
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: errorStatus,
            
          })
          console.log(errorStatus);
        } finally {
          setChequeLoading(false);
        }
      }
    });
  };
  

  const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

const dayString = day.toString().padStart(2, '0');
const monthString = month.toString().padStart(2, '0');
const yearString = year.toString();

const day1 = dayString.slice(0, 1);
const day2 = dayString.slice(1);

const month1 = monthString.slice(0, 1);
const month2 = monthString.slice(1);

const year1 = yearString.slice(0, 1);
const year2 = yearString.slice(1, 2);
const year3 = yearString.slice(2, 3);
const year4 = yearString.slice(3);
// Now you can use day1, day2, month1, month2, year1, year2 in your JSX


  
  return (  
    <div className={classes.topMargin}>
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
            <div className="content-wrapper">
            <div className="main-content">

                <AdminHeaderNav />
                <div className='newBody'>
                <div className='newWidth' >

                    
                    {/* <div className="body-content"> */}
                    
                    {/* <div className="row"> */}
                    <div className="content-header row align-items-center m-0">

                  {/* <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                    <div
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        justifyContent: "flex-end",
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      <Button variant="success" >
                        Add New User
                      </Button>
                    </div>

                  </nav> */}
                  <div className={classes.printCheque}>
                    <div className="col-sm-8 header-title p-0" style={{marginBottom:'10px'}}>
                        <div className="media">
                        {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} style={{width:'30px', height:'30px'}} alt="favicon" /></i></div> */}
                        <div className="media-body">
                            <h1 className="font-weight-bold">Print Cheque</h1>
                            {/* <small>Create and update your user  s...</small> */}
                        </div>
                        </div>
                    </div>
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
                      <Button variant="success" onClick={handleCheque}>
                      {chequeLoading ? (
                        <>
                          <Spinner size='sm' />
                          <span style={{ marginLeft: '5px' }}>Generating Cheque, Please wait...</span>
                        </>
                      ) : (
                        "Print Cheque"
                      )}
                      </Button>
                    </div>

                  </nav>
                  </div>
                </div>
                <div className="row">
                  <div className={classes.printRemove}>
                    <div className="col-md-12">
                      <div className="form-group row">
                          <label for="example-text-input" className="col-sm-12 col-form-label font-weight-400 text-align-center">Bank Account:</label>
                          <div className="col-sm-12">
                            <Form.Select name="account" className="form-control" required="" value={selectedBank} onChange={handleBank}>
                              
                                  <option value="">Select your Bank</option>
                                  {banks.map((item) => (
                                  <option key={item.id} value={item.id}>
                                  {item.gl_name}
                                  </option>
                                  ))}
                            </Form.Select>
                          </div>
                      </div>
                    </div>
                  </div>
                        {/* <div className="col-lg-12"> */}
                        <div className={classes.card}>
                            {/* <div > */}
                            
                            <div className={classes.Cheque}>
                                <div className={classes.chequeHeader}>
                                    <div style={{marginBottom:'1cm'}} className={classes.printHide}>
                                        <h6 style={{fontSize:'10.72px', margin:'0', visibility:'hidden'}}>302, HERBERT MACAULAY WAY. SABO YABA, LAGOS</h6>
                                    </div>
                                    <div className={classes.printHide} style={{marginLeft:'2cm'}}>
                                        <h2>ABC Bank</h2>
                                        <p style={{visibility:"hidden"}}>The bank of African</p>
                                    </div>
                                    <div className={classes.dateSection} >
                                        <div className={`${classes.refNO} ${classes.printRemove}`}>
                                            <h5>48983408377</h5>   
                                            <h6> u9ur909ru9e9qu05459</h6> 
                                        </div>
                                        <span >
                                            <div className={classes.dateInput}>
                                                <p className={`${classes.label} ${classes.printHide}`}>Day</p>
                                                <div className={classes.inputContainer}>
                                                <p className={classes.input}>{day1}</p>
<p className={classes.input}>{day2}</p>
                                                </div>
                                            </div>
                                            <p className={`${classes.dash} ${classes.printHide}`}>-</p>
                                            <div className={classes.dateInput}>
                                                <p className={`${classes.label} ${classes.printHide}`}>Month</p>
                                                <div className={classes.inputContainer}>
                                                <p className={classes.input}>{month1}</p>
<p className={classes.input}>{month2}</p>
                                                </div>
                                            </div>
                                            <p className={`${classes.dash} ${classes.printHide}`}>-</p>
                                            <div className={classes.dateInput}>
                                                <p className={`${classes.label} ${classes.printHide}`}>Year</p>
                                                <div className={classes.inputContainer}>
                                                    <p className={classes.input}>{year1}</p>
                                                    <p className={classes.input}>{year2}</p>
                                                    <p className={classes.input}>{year3}</p>
                                                    <p className={classes.input}>{year4}</p>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.paydetails}>
                                    <div className={classes.details}>
                                        <p className={`${classes.label} ${classes.printHide}`}>Pay to</p>
                                        <div className={classes.paymentTo}>{beneficiary1 === null ? description.toUpperCase() : beneficiary.toUpperCase()}</div>
                                    </div>
                                    <div className={classes.details}>
                                        <p className={`${classes.label} ${classes.printHide}`}>The sum of</p>
                                        <div className={classes.amount} >{totalNetPayInWords}</div>
                                    </div>
                                    
                                </div>
                                <div className={classes.nairaInput}>
                                    <p for="" style={{fontSize:'20px'}} className={classes.printHide}>₦</p>
                                    <div className={classes.amtInFig}> {parseFloat(totalAmount).toLocaleString('en-US', {
          minimumIntegerDigits: 1,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</div>
                                </div>
                            </div>

                            {/* </div> */}
                        </div>
                        {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}
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
    // </div>
  )
}
