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

function CreateBooking() {

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
          product_id:stocks,
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
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">Create New Booking </h1>
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Particulars</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" value={particulars} onChange={(e) => setParticulars(e.target.value)} name="particulars" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Date
                                      of Event</label>
                                    <div className="col-sm-9">
                                      {/* <input className="form-control" required="" type="date" onChange={handleDateChange} name="date" value={selectedDate} /> */}
                                      <input
                                        className="form-control"
                                        required=""
                                        type="date"
                                        onChange={handleDateChange}
                                        name="date"
                                        value={selectedDate}
                                        // min={new Date().toISOString().split('T')[0]} // Set min attribute to the current date
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Description:</label>
                                    <div className="col-sm-9">
                                      <textarea
                                        className="form-control"
                                        required=""
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        name="description"
                                      />
                                    </div>

                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event Start Time</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="time" onChange={handleTimeChange} name="time" value={selectedTime} />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Event End Time</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="time" onChange={handleTimeChange1} name="time" value={selectedTime1} />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" >Total Charge</label>
                                    <div className="col-sm-9">
                                      {/* <div className="form-control" > */}
                                      <CurrencyInput

                                        name="Total charge"
                                        decimalsLimit={2}
                                        className="form-control"
                                        value={totalCharge} // Set the value to the balance state
                                        onValueChange={handleValueChange}
                                        style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
                                      />
                                      {/* </div> */}

                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Service Charged</label>
                                    <div className="col-sm-9">
                                    <Form.Select name="customer" className="form-control" required="" value={selectedService} onChange={handleServiceChange}>
                                        <option value="">Select Account</option>
                                        {revenues.map((item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.gl_name}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </div>
                                  </div>
                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Choose Debit Account</label>
                                                                        <div className="col-sm-9">
                                                                            <Form.Select name="customer" className="form-control" required="" value={selectedaAsetAccount} onChange={handleAssetChange}>
                                                                                <option value="">Choose Debit Account</option>
                                                                                {subCat.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                  {item.gl_name}
                                                                                </option>
                                                                              ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                {/* <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Choose Debit Account</label>
                                    <div className="col-sm-9">
                                      <select name="customer" className="form-control" required="" value={selectedaAsetAccount} onChange={handleAssetChange}>
                                        <option value="">Choose Debit Account</option>
                                        {subCat.map((item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.gl_name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div> */}

                                <div className="col-md-6">
                                  <div className="form-group row">
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Choose Credit Account</label>
                                    <div className="col-sm-9">
                                    <Form.Select name="customer" className="form-control" required="" value={selectedAccount} onChange={handleAccountChange}>
                                        <option value="">Choose Credit Account</option>
                                        {subCat2.map((item) => (
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
                              <h5 style={{ textAlign: "center" }}>Add Expense(s)</h5>
                              <div className="row">
                                {/* <div className="col-md-6"> */}
                                <div className="table-responsive">
                                  <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                    <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                      <tr>
                                        <th style={{ width: '50%', }}>Item</th>
                                        <th>Unit Price(N)</th>
                                        <th>Quantity</th>
                                        <th>Total Price(N)</th>
                                        <th ><Button variant="primary" onClick={() => addRow()}>
                                          <i className="fas fa-plus"></i>

                                        </Button></th>
                                      </tr>
                                    </thead>
                                    <tbody style={{ whiteSpace: "nowrap",  }}>
                                                                            {formData.map((row, index) => (
                                                                                <tr key={index}>
                                                                                    <td style={{ width: '400px' }}>
                                                                                        <Select
                                                                                            value={row.items} // Assuming row.itemsDescription contains the selected option
                                                                                            onChange={(selectedOption) => handleItemDescriptionChange(selectedOption, index)}
                                                                                            options={selectOptions1}
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

                                                                                    </td>
                                                                                    <td style={{ width: '7rem' }}>
                                                                                        <CurrencyInput
                                                                                            name={`rowUnitPrice ${index}`} // Provide a unique name for each CurrencyInput
                                                                                            decimalsLimit={2}
                                                                                            value={row.unitPrice}
                                                                                            className="form-control"
                                                                                            disabled
                                                                                            style={{ textAlign: "right", border: "none", width: '10rem' }}
                                                                                        />
                                                                                    </td>
                                                                                    <td style={{ width: '5rem' }}>
                                                                                        <input
                                                                                            
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.qty}
                                                                                            onChange={(e) => handleFormChange(e.target.value, "qty", index)}
                                                                                        />
                                                                                        {row.quantityError && <span style={{ color: 'red' }}>{row.quantityError}</span>}
                                                                                    </td>
                                                                                    <td style={{ width: '7rem' }}>
                                                                                    <CurrencyInput
                                                                                            name={`rowLineTotal ${index}`} // Provide a unique name for each CurrencyInput
                                                                                            decimalsLimit={2}
                                                                                            value={row.totalPrice}
                                                                                            className="form-control"
                                                                                            disabled
                                                                                            style={{ textAlign: "right", border: "none", width: '10rem' }}
                                                                                        />
                                                                                    </td>
                                                                                    <td style={{ textAlign: "center" }}>
                                                                                        <Button variant="danger" onClick={() => deleteRow(index)}>
                                                                                            <i className="far fa-trash-alt"></i>
                                                                                        </Button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                  </table>

                                </div>
                              </div>
                              <div style={{ marginTop: 20 }} />
                              <div className="col-md-11" style={{ width: '100%', padding: "0" }}>
                                <div className="form-group row justify-content-end">
                                  <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Amount:</label>
                                  <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                  <CurrencyInput
                                                                                            name='total-amount' // Provide a unique name for each CurrencyInput
                                                                                            decimalsLimit={2}
                                                                                            value={totalAmount}
                                                                                            className="form-control"
                                                                                            disabled
                                                                                            style={{ textAlign: "right", border: "none", width: '10rem' }}
                                                                                        />
                                    {/* <input style={{ textAlign: "right", }} className="form-control" required="" type="text" value={totalAmount} name="total" readOnly /> */}
                                  </div>
                                </div>
                              </div>

                              <div style={{justifyContent: "flex-start"}} class="modal-footer">
                                <Button style={{borderRadius: 0}} variant="success" onClick={createBooking}>
                                  {createLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Creating your booking, Please wait...</span>
                                    </>
                                  ) : (
                                    "Create your Bookings"
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

export default CreateBooking