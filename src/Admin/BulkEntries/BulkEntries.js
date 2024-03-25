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
import favicon from '../../Images/faviconn.png'
import { AdminHeaderNav } from '../AdminHeaderNav';
import classes from './BulkEntries.module.css';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';

function BulkEntries() {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [benBank, setBenBank] = useState([]);
  const [formData, setFormData] = useState([{ sn: 1, beneficiary: '', beneficiaryAccount: '', debitGlCode: '', creditGlCode: '', amount: '', }]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectOptions1, setSelectOptions1] = useState([]);
  const [selectOptions2, setSelectOptions2] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadd, setLoadd] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);

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

  

const uploadExcel = async () => {
  setUploadLoading(true);
    try {
      const formData = new FormData();
    formData.append('file', selectedFile[0]);
   
    // console.log(selectedFile);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${bearer}`,
    };

    const response = await axios.post(
      'https://api-sme.promixaccounting.com/api/v1/payment_voucher/post-journal',
      formData,
      { headers }
    );
handleClose();
navigate('/pending_payment_voucher');
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: response.data.message,
    });

    console.log(response.data.message);
  } catch (error) {
    const errorStatus = error.response.data.message;

    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: errorStatus,
    });

    console.error(error);
  } finally {
    setUploadLoading(false);
    }
  };


  const handlePosting = async () => {
    setLoadd(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
      };
      const beneficiaries = formData.map((row) => row.beneficiary.value).filter((id) => id !== undefined);
      const beneficiaryAccounts = formData.map((row) => row.beneficiaryAccount.value).filter((id) => id !== undefined);
    const debits = formData.map((row) => row.debitGlCode.value).filter((id) => id !== undefined);
    const credits = formData.map((row) => row.creditGlCode.value).filter((id) => id !== undefined);
      const amounts = formData.map((row) => row.amount).filter((name) => name !== undefined);
      
console.log(beneficiaries, debits, credits, amounts, "problem");
  const response = await axios.post(
    'https://api-sme.promixaccounting.com/api/v1/payment_voucher/post-bulk-journal',
   {
    beneficiary_id: beneficiaries,
    beneficiary_account_id: beneficiaryAccounts,
    debit_gl: debits,
    credit_gl: credits,
    credit: amounts
   },
    { headers }
  );

  
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
      // navigate('/pending_payment_voucher');
  
      console.error(error);
    } finally {
      setLoadd(false);
    }
  };
  const fetchBenAcct = async (selectedBeneficiary) => {
    setLoading(true);

    try {
        const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/beneficiaryaccounts/getaccount?beneficiary_id=${selectedBeneficiary}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
            }
        );

        const paid = response.data?.data || [];
        const benAcc = paid.map((item) => ({
          label: item.bank_name,
          value: item.id,
        }));
        // console.log(paid, 'paid');
        setBenBank(benAcc);
    } catch (error) {
        const errorStatus = error.response.data.message;
        console.error(errorStatus);
    } finally {
        setLoading(false);
    }
};
  
  
const handleFormChange = (selectedOption, fieldName, rowIndex) => {
  if (fieldName === 'beneficiary') {
    fetchBenAcct(selectedOption.value);
  }

  setFormData(prevFormData => {
    const updatedFormData = [...prevFormData];
    updatedFormData[rowIndex] = {
      ...updatedFormData[rowIndex],
      [fieldName]: selectedOption
    };
    return updatedFormData;
  });
};


  const deleteRow = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
  };

 



  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const fetchBeneficiaries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/beneficiary', { headers });
      const results = response.data?.data;

      const options = results.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      setTableData(results);
      setSelectOptions(options);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDebit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account', { headers });
      const debitAcct = response.data?.data;

      const options1 = debitAcct.map((item) => ({
        label: item.gl_name,
        value: item.id,
      }));

      setTableData1(debitAcct);
      setSelectOptions1(options1);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData1([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAsset = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${1}`,
        {
         
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearer}`
          }
        }
      );
      const assetsAcc = response.data?.data;
      const options2 = assetsAcc.map((item) => ({
        label: item.gl_name,
        value: item.id,
      }));

      setTableData2(assetsAcc);
      setSelectOptions2(options2);

  
    } catch (error) {
      const errorStatus = error.response.data.message;
      console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

 


  useEffect(() => {
    if (bearer) {
      fetchBeneficiaries();
      fetchDebit();
      fetchAsset();

    }
  }, [bearer]);




  const addRow = () => {
    const newRow = {
      sn: formData.length + 1,
      beneficiary: '', 
      beneficiaryAccount: '',
      debitGlCode: '', 
      creditGlCode: '', 
      amount: '',
    };
  
    setFormData(prevFormData => [...prevFormData, newRow]);
  };

   const handleValueChange1 = (value, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
        ...updatedFormData[index],
        amount: value,
    };
    setFormData(updatedFormData);
};

const handleFileChange = (event) => {
  const files = event.target.files;
  const fileList = Array.from(files);
  setSelectedFile(fileList);
  
};

const calculateTotalAmount = () => {
  const total = formData.reduce((total, row) => total + parseFloat(row.amount) || 0, 0);
  setTotalAmount(total);
  // console.log(totalQuantity);
};

useEffect(() => {
  calculateTotalAmount();
}, [formData]);

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
                      <Button variant="success" onClick={handleShow}>
                        Upload Excel Payment
                      </Button>

                     <a href="https://api-sme.promixaccounting.com/api/v1/payment_voucher/download-excel" download>
                    <Button variant="secondary" style={{marginLeft: 10}}>
                      Download Excel Template
                    </Button>
                  </a>
                    </div>

                  </nav> */}

                  <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload Payment</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Upload Excel File</Form.Label>
                            <Form.Control
                              type="file"
                              accept=".xlsx, .xls, .csv" 
                              onChange={handleFileChange}
                            />
                           
                          </Form.Group>
                        </Form>
                      </Modal.Body>






                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={uploadExcel}>
                    {uploadLoading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Uploading, Please wait...</span>
    </>
  ) : (
                "Upload Payment"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Upload Payments</h1>
                        <small>Create and upload your payments...</small>
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

                                <thead style={{  textAlign: "center", alignItems: "center" }}>
                                  <tr>
                                    <th>#</th>
                                    <th style={{ width: '22%', }}>Beneficiary</th>
                                    <th  style={{ width: '22%' }}>Beneficiary Account</th>
                                    <th style={{ width: '22%', }}>Debit GL Code</th>
                                    <th style={{ width: '22%', }}>Credit GL Code</th>
                                    <th style={{ width: '30%', }}>Amount</th>
                                   
                                    <th ><Button variant="primary" onClick={() => addRow()}>
                                      <i className="fas fa-plus"></i>

                                    </Button></th>
                                  </tr>
                                </thead>
                                <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                  {formData.map((row, index) => (
                                    <tr key={index}>
                                      <td>{row.sn}</td>
                                      <td style={{textAlign: 'left' }}>
  <Select
   options={selectOptions} 
   onChange={(selectedOption) => handleFormChange(selectedOption, 'beneficiary', index)}
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
                                      <td style={{ width: "30px", textAlign: 'left' }}>
  <Select
   options={benBank} 
   onChange={(selectedOption) => handleFormChange(selectedOption, 'beneficiaryAccount', index)}
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
                                      <Select
   options={selectOptions1} 
   onChange={(selectedOption) => handleFormChange(selectedOption, 'debitGlCode', index)}
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
                                      <Select
   options={selectOptions2} 
   onChange={(selectedOption) => handleFormChange(selectedOption, 'creditGlCode', index)}
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
                          <div className="col-md-11" style={{ width: '100%', padding: "0" }}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Amount:</label>
                                                                    <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                    <CurrencyInput

name="total-amount"
decimalsLimit={2}
className="form-control"
value={totalAmount} 
disabled
style={{ textAlign: "right", border: "1px solid #e4e4e4", backgroundColor: "none" }}
/>
                                                                        {/* <input style={{textAlign: "right",}} className="form-control" type="number" value={totalAmount}  disabled/> */}
                                                                        {/* <input style={{ textAlign: "right", }} className="form-control" required="" type="number" value={totalQuantity} onChange={(e)=> setTotalQuantity(e.target.value) }  name="total" readOnly /> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                          
                          <div style={{justifyContent: "flex-start"}}  class="modal-footer">
                            <Button style={{borderRadius: 0}} variant='success' onClick={handlePosting}>
                              {loadd ? (
                                <>
                                  <Spinner size='sm' />
                                  <span style={{ marginLeft: '5px' }}>Saving, Please wait...</span>
                                </>
                              ) : (
                                "Save Payments"
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

export default BulkEntries;