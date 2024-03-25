import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "../style.css";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { InfoFooter } from '../../InfoFooter';
import favicon from '../../Images/faviconn.png'
import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './JournalEntries.module.css';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';

function JournalEntries() {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', DR_CR: '', amount: '', description: '', date: '' }]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [totalAmountCredit, setTotalAmountCredit] = useState('');
  const [totalAmountDebit, setTotalAmountDebit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);

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

  const calculateTotalAmount = () => {
    const total = formData.reduce((acc, item) => {
        return item.DR_CR === '1' ? acc + parseFloat(item.amount || 0) : acc;
    }, 0);

    const formattedTotal1 = total.toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    setTotalAmountDebit(formattedTotal1);
};

  const calculateTotalAmountCredit = () => {
    const total = formData.reduce((acc, item) => {
        return item.DR_CR === '2' ? acc + parseFloat(item.amount || 0) : acc;
    }, 0);

    const formattedTotal = total.toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    setTotalAmountCredit(formattedTotal);
};

 

  useEffect(() => {
    calculateTotalAmount();
    calculateTotalAmountCredit();
  }, [formData]);

  const handleAccountChange = (selectedOption, rowIndex) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[rowIndex] = selectedOption;
      return updatedOptions;
    });

    const selectedChart = tableData.find((chart) => chart.id === selectedOption.value);

    if (selectedChart) {
      const updatedFormData = [...formData];
      updatedFormData[rowIndex].accountName = selectedChart.id;
      updatedFormData[rowIndex].accountCode = selectedChart.gl_code;
      setFormData(updatedFormData);
    }
  };



  const deleteRow = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
  };

  const handleFormChange = (index, field, value) => {
    let formattedValue = value;

    // Format the amount field
    if (field === 'amount' && value !== '') {
      formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
    }

    const updatedFormData = [...formData];
    updatedFormData[index][field] = formattedValue;
    setFormData(updatedFormData);
  };



  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const fetchCharts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account', { headers });
      const results = response.data?.data;

      const options = results.map((chart) => ({
        label: chart.gl_name,
        value: chart.id,
      }));

      setTableData(results);
      setSelectOptions(options);
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
      fetchCharts();

    }
  }, [bearer]);




  const addRow = () => {
    const newRow = {
      sn: formData.length + 1,
      accountName: '',
      DR_CR: '',
      amount: '',
      description: '',
      date: '',
    };

    setFormData([...formData, newRow]);
  };

 
  

  const createJournal = async () => {
    setLoad(true);

    try {
      const accountNames = formData.map((row) => row.accountName).filter((name) => name !== undefined);
      const directions = formData.map((row) => row.DR_CR).filter((name) => name !== undefined);
      const dates = formData.map((row) => row.date).filter((name) => name !== undefined);
      const descriptions = formData.map((row) => row.description).filter((name) => name !== undefined);
      const amounts = formData.map((row) => row.amount).filter((name) => name !== undefined);
      const creditAmount = totalAmountCredit.replace(/,/g, '').replace(/\.00$/, '');
      const debitAmount = totalAmountDebit.replace(/,/g, '').replace(/\.00$/, '');



      // console.log(accountNames, creditAmount, debitAmount, descriptions, amounts, directions, "information")
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/journal/post-entries',
        {
          account_id: accountNames,
          all_credit: creditAmount,
          all_debit: debitAmount,
          description: descriptions,
          amount: amounts,
          direction: directions,
          transaction_date: dates
        },
        { headers }
      );
      // console.log(accountNames, creditAmount, debitAmount, descriptions, amounts, directions, "AFTER")
      // console.log(response.data.message, "heeee");

      setFormData([]);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });


    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const handleValueChange1 = (value, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
        ...updatedFormData[index],
        amount: value,
    };
    setFormData(updatedFormData);
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


                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Journal Entries</h1>
                        <small>Create and update your journals...</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!--/.Content Header (Page header)--> */}
                <div className="body-content">

                  <div className="row">






                    <div className="col-lg-12">
                      <div className="card">

                        <div className="card-body" >

                          <div style={{ marginTop: 20 }} />
                          <div className="row">
                            {/* <div className="col-md-6"> */}
                            <div className="table-responsive">

                              <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                  <tr>
                                    <th>#</th>
                                    <th style={{ width: '15%', }}>Transaction Date</th>
                                    <th style={{ width: '28%', }}>Account Name</th>
                                    <th>Description</th>
                                    <th style={{ width: '15%', }}>DR/CR</th>
                                    <th style={{ width: '15%', }}>Amount</th>
                                   
                                    <th ><Button variant="primary" onClick={() => addRow()}>
                                      <i className="fas fa-plus"></i>

                                    </Button></th>
                                  </tr>
                                </thead>
                                <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                  {formData.map((row, index) => (
                                    <tr key={index}>
                                      <td>{row.sn}</td>
                                      <td>
                                        <input
                                          value={row.date}
                                          onChange={(e) => handleFormChange(index, 'date', e.target.value)}
                                          className="form-control"
                                          type="date"
                                        />
                                      </td>
                                      <td style={{ position: 'absolute', width: '26%', textAlign: 'left', }}>
                                        <Select
                                          value={selectedOptions[index]}
                                          onChange={(selectedOption) => handleAccountChange(selectedOption, index)}
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

                                      </td>
                                      <td>
                                        <textarea
                                          type="text"
                                          className="form-control"
                                          value={row.description}
                                          onChange={(e) => handleFormChange(index, 'description', e.target.value)}
                                        />
                                      </td>
                                      <td>
                                        <Form.Select
                                          value={row.DR_CR}
                                          onChange={(e) => handleFormChange(index, 'DR_CR', e.target.value)}
                                          className="form-control"
                                        >
                                          <option value="">Select</option>
                                          <option value="1">DR</option>
                                          <option value="2">CR</option>
                                        </Form.Select>
                                      </td>
                                      <td>
                                      <CurrencyInput
    name={`rowAmount ${index}`} // Provide a unique name for each CurrencyInput
    decimalsLimit={2}
    value={row.amount}
    className="form-control"
    onValueChange={(value) => handleValueChange1(value, index)}
    style={{ textAlign: "right", border: "none"}}
/>
                                        {/* <input
                                          type="text"
                                          className="form-control"
                                          value={row.amount}
                                          onChange={(e) => handleFormChange(index, 'amount', e.target.value)}
                                          style={{ textAlign: "right" }}
                                        /> */}
                                      </td>
                                      
                                      
                                      <td style={{textAlign: "left"}}>
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
                          <div className="col-md-11 newAmounts">
                            <div className="form-group  " style={{ marginLeft: 600 }}>
                              <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" style={{ minWidth: '50%', textAlign: 'left', }}>Total Debit:</label>
                              <div className="col-sm-4 newAmountInput" style={{ minWidth: '60%', textAlign: 'left', }}>
                                <input style={{ textAlign: "right", }} className="form-control" required="" type="text" value={totalAmountDebit} name="total" readOnly />
                              </div>
                            </div>
                            <div className="form-group  justify-content-end">
                              <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" style={{ minWidth: '50%', textAlign: 'left', }}>Total Credit:</label><br />
                              <div className="col-sm-4 newAmountInput" style={{ minWidth: '50%', textAlign: 'left',}}>
                                <input style={{ textAlign: "right", }} className="form-control" required="" type="text" value={totalAmountCredit} name="total" readOnly />
                              </div>
                            </div>
                          </div>
                          <div class="">
                            <Button variant='success' onClick={createJournal}>
                              {load ? (
                                <>
                                  <Spinner size='sm' />
                                  <span style={{ marginLeft: '5px' }}>Saving, Please wait...</span>
                                </>
                              ) : (
                                "Save"
                              )}
                            </Button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--/.body content--> */}
              </div>
            </div>
          </div>
          {/* <!--/.main content--> */}
          <InfoFooter />
          {/* <!--/.footer content--> */}
          <div className="overlay"></div>
        </div>
        {/* <!--/.wrapper--> */}


      </div>
    </div>

  );
}

export default JournalEntries;