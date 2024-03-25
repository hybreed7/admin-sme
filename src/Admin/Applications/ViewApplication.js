import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import Select from 'react-select';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import classes from './ViewApplication.module.css'


function ViewApplication() {

  const [particulars, setParticulars] = useState('');
  const [subCat, setSubcat] = useState([]);
  const [subCat2, setSubcat2] = useState([]);
  const [totalCharge, setTotalCharge] = useState('');
  const [selectedaAsetAccount, setSelectedAssetAccount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState([{ items: '', unitPrice: '', qty: '', totalPrice: '' }]);
  const [totalAmount, setTotalAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTime1, setSelectedTime1] = useState('');
  const [itemList, setItemList] = useState([]);
  const [selectOptions1, setSelectOptions1] = useState([]);
  const [debitAccount, setDebitAccounts] = useState([]);
  const [revenues, setRevenues] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleTimeChange1 = (event) => {
    setSelectedTime1(event.target.value);
  };


  const handleAssetChange = (event) => {
    setSelectedAssetAccount(event.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };


  const calcTotalAmount1 = () => {
    const total = formData.reduce((total, row) => total + parseFloat(row.totalPrice) || 0, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    calcTotalAmount1();
  }, [formData]);







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

  const addRow = () => {
    const newRow = {
      items: '', unitPrice: '', qty: '', totalPrice: ''
    };
    setFormData([...formData, newRow]);
  };

  const deleteRow = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
  };

  const handleItemDescriptionChange = async (selectedOption, rowIndex) => {
    const selectedItemId = selectedOption.value;
    const selectedItem = itemList.find(item => item.id === selectedItemId);
    const selectedUnitPrice = selectedItem?.price || 0;
    const stockQuantity = selectedItem?.stock?.quantity || 0;

    // Update form data with selected item and unit price
    handleFormChange(selectedOption, "items", rowIndex);
    handleFormChange(selectedUnitPrice, "unitPrice", rowIndex);
    handleFormChange(stockQuantity, "stockQuantity", rowIndex);

    // Check and update amount based on quantity and unit price
    const qty = formData[rowIndex]?.qty || 0;
    handleFormChange(parseFloat(selectedUnitPrice) * parseFloat(qty), "amount", rowIndex);
  };

  const handleFormChange = (value, fieldName, rowIndex) => {
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      updatedFormData[rowIndex] = {
        ...updatedFormData[rowIndex],
        [fieldName]: value
      };
      // Check quantity against stock quantity and update error message
      if (fieldName === "qty" && parseFloat(value) > parseFloat(updatedFormData[rowIndex]?.stockQuantity || 0)) {
        updatedFormData[rowIndex].quantityError = `Quantity left: ${updatedFormData[rowIndex]?.stockQuantity}`;
      } else {
        updatedFormData[rowIndex].quantityError = ""; // Clear error message if quantity is within limits
      }
      return updatedFormData;
    });
  };


  const calcTotalAmount = () => {
    const updatedFormData = formData.map(row => ({
      ...row,
      totalPrice: parseFloat(row.unitPrice) * parseFloat(row.qty) || 0
    }));
    setFormData(updatedFormData);
  };

  useEffect(() => {
    calcTotalAmount();
  }, [formData]);





  const fetchSubCat = async () => {
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
      const results = response.data?.data;
      setSubcat(results);

      //   console.log(results, "NIYIN");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenues = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${4}`,
        {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const revenueResult = response.data?.data;
      setRevenues(revenueResult);

      //   console.log(results, "NIYIN");
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/items/fetch-all', { headers });
      const itemss = response.data?.data;

      const options1 = itemss.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setItemList(itemss);
      setSelectOptions1(options1);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setDebitAccounts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubCat2 = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/get-account-by-category-id?category_id=${3}`,
        {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const resultss = response.data?.data;
      setSubcat2(resultss);

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
      fetchSubCat();
      fetchSubCat2();
      fetchItems();
      fetchRevenues();
    }
  }, [bearer]);



  const createBooking = async () => {

    setCreateLoading(true);
    try {
      const quantities = formData.map((row) => row.qty).filter((id) => id !== undefined);
      const unitPrices = formData.map((row) => row.unitPrice).filter((id) => id !== undefined);
      const totalPrices = formData.map((row) => row.totalPrice).filter((id) => id !== undefined);
      const stocks = formData.map((row) => row.items.value).filter((id) => id !== undefined);
      console.log(quantities, unitPrices, totalPrices, stocks);
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/booking/create',
        {
          particulars: particulars,
          event_date: selectedDate,
          start_hour: selectedTime,
          end_hour: selectedTime1,
          end_hour: selectedTime1,
          amount: totalCharge,
          asset_account: selectedaAsetAccount,
          booking_account: selectedAccount,
          description: description,
          product_id: stocks,
          quantity: quantities,
          unit_price: unitPrices,
          amounts: totalPrices,
          income_account: selectedService


        },
        { headers }
      );
      console.log(response.data.message)
      setParticulars("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedTime1("");
      setTotalCharge("");
      setSelectedAssetAccount("");
      setSelectedAccount("");
      setDescription("");
      navigate('/booking')

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


  const handleValueChange = (value, name, values) => {
    setTotalCharge(value); // Update the balance state

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
                      {/* the header */}
                    </div>

                  </div>
                </div>
              </div>

              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">
                              <small>Lara Lowson</small>
                              <p style={{ marginTop: '20px', fontWeight: '700', }}>Personal Details</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400' }}>
                                <div>
                                  <p>First Name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lara</p>
                                </div>

                                <div>
                                  <p>Last Name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Middle Name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>Email Address</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
                                </div>

                              </div>

                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400', marginTop: '20px' }}>
                                <div>
                                  <p>Phone Number</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lara</p>
                                </div>

                                <div>
                                  <p>Date of Birth</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Home Address</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>Parmanent Address</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
                                </div>

                              </div>

                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400', marginTop: '20px' }}>
                                <div>
                                  <p>Marital status</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lara</p>
                                </div>

                                <div>
                                  <p>state of origin</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Local govt</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>NIN</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
                                </div>

                              </div>

                              <p style={{ marginTop: '20px', fontWeight: '700', }}>Next of Kin details</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400' }}>
                                <div>
                                  <p>Full name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lara</p>
                                </div>

                                <div>
                                  <p>Phone Number</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Email Address</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>Relationship</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
                                </div>

                              </div>
                              <div style={{ color: '#6C757D', fontSize: '12px', fontWeight: '400' }}>
                                <p>Home Address</p>
                                <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">

                              <p style={{ marginTop: '30px', fontWeight: '700', }}>Business Details</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400', marginTop: '-10px' }}>
                                <div>
                                  <p>Business name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lara</p>
                                </div>

                                <div>
                                  <p>Business phone number</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Business email address</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>RC Number</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
                                </div>

                              </div>
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400' }}>
                                <div>
                                  <p>Date of commencement of business</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lara</p>
                                </div>

                                <div>
                                  <p>Sector of business</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Ogun state Tax ID number</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>Business address</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
                                </div>

                              </div>
                              <div style={{ color: '#6C757D', fontSize: '12px', fontWeight: '400' }}>
                                <p>Number of employees</p>
                                <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                              </div>

                            </div>

                            <div style={{ marginLeft: '30px' }}>
                              <p style={{ marginTop: '30px', fontWeight: '700' }}>Documents</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">
                              <p style={{ marginTop: '30px', fontWeight: '700', }}>Bank details</p>
                              <div style={{ width: '138px', height: '3px', backgroundColor: '#2D995F', marginTop: '-15px', marginBottom: '20px' }} />

                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#6C757D', fontSize: '12px', fontWeight: '400', marginTop: '-10px' }}>
                                <div>
                                  <p>Bank name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Fidelity</p>
                                </div>

                                <div>
                                  <p>Account number</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Lawson</p>
                                </div>
                                <div>
                                  <p>Account name</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>Morenikeji</p>
                                </div>
                                <div>
                                  <p>BVN</p>
                                  <p style={{ display: 'block', color: '#343A40', fontSize: '14px', marginTop: '-15px' }}>lawson@gmail.com</p>
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

              <div className="body-content">
                <div className="col-lg-12">
                  <div className="card">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-body">
                              <table className={classes.styledTable}>
                                <thead className={classes.tableHead}>
                                  <th>
                                    S/N
                                  </th>
                                  <th>
                                    AMOUNT
                                  </th>
                                  <th>
                                    DATE
                                  </th>
                                  <th>
                                    MARK AS PAID
                                  </th>
                                </thead>
                                <tr>
                                  <td>
                                    1
                                  </td>
                                  <td>
                                    N41700
                                  </td>
                                  <td>
                                    2nd April 2024
                                  </td>
                                  <td>

                                  </td>
                                </tr>
                              </table>
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

export default ViewApplication;