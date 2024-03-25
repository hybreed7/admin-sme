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
import classes from './SavingExcel.module.css';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input-field';

function SavingsExcel() {
  const navigate = useNavigate();
  const [bearer, setBearer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [postData, setPostData] = useState([]);
  const [benBank, setBenBank] = useState([]);
  const [formData, setFormData] = useState([{ sn: 1, beneficiary: '', beneficiaryAccount: '', debitGlCode: '', creditGlCode: '', amount: '', }]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectOptions1, setSelectOptions1] = useState([]);
  const [selectOptions2, setSelectOptions2] = useState([]);
  const [totalAmountCredit, setTotalAmountCredit] = useState('');
  const [totalAmountDebit, setTotalAmountDebit] = useState('');
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
      'https://api-sme.promixaccounting.com/api/v1/payment_voucher/post-payment',
      formData,
      { headers }
    );
handleClose();
const postExcel = response.data?.data;
// console.log(postExcel);
setPostData(postExcel);
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
      // const uuids = postData.map((item) => item.uuid);
      
      

  const response = await axios.post(
    'https://api-sme.promixaccounting.com/api/v1/payment_voucher/post-bulk-journal-excel',
   {
   uuid: postData[0].uuid
   },
    { headers }
  );

  setPostData([]);
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

// console.log(formData);

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
                      <Button variant="success" onClick={handleShow}>
                        Upload Excel Savings
                      </Button>

                     <a href="https://api-sme.promixaccounting.com/api/v1/payment_voucher/download-excel" download>
                    <Button variant="secondary" style={{marginLeft: 10}}>
                      Download Excel Template
                    </Button>
                  </a>
                    </div>

                  </nav>

                  <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload Savings</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Transaction Date</Form.Label>
                            <Form.Control
                              type="date"
                            //   accept=".xlsx, .xls, .csv" 
                            //   onChange={handleFileChange}
                            />
                            <div style={{marginTop:'10px'}}/>
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
                "Upload Saving"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal>

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Upload Savings Excel</h1>
                        <small>Upload your savings in excel ...</small>
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

                                <thead style={{  textAlign: "center", alignItems: "center", whiteSpace: "nowrap", }}>
                                  <tr>
                                    <th>S/N</th>
                                    <th style={{ width: '22%', }}>Transaction Date</th>
                                    <th style={{ width: '22%', }}>Beneficiary</th>
                                    <th  style={{ width: '22%' }}>Account No</th>
                                    <th  style={{ width: '22%' }}>Account Name</th>
                                    <th  style={{ width: '22%' }}>Bank Name</th>
                                    <th style={{ width: '22%', }}>Debit GL Code</th>
                                    <th style={{ width: '22%', }}>Credit GL Code</th>
                                    <th style={{ width: '30%', }}>Amount</th>
                                   
                                    {/* <th ><Button variant="primary" onClick={() => addRow()}>
                                      <i className="fas fa-plus"></i>

                                    </Button></th> */}
                                  </tr>
                                </thead>
                                <tbody style={{  textAlign: "left",  }}>
                                  {postData.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item.transaction_date}</td>
                                      <td>{item.description}</td>
                                      <td>{item.account_number}</td>
                                      <td>{item.account_name}</td>
                                      <td>{item.bank_name}</td>
                                      <td>{item.debit_GL_code}</td>
                                      <td>{item.credit_GL_code}</td>
                                      <td style={{textAlign: "right"}}>{parseFloat(item.amount).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
})}</td>
                                      
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                            </div>
                          </div>
                          <div style={{ marginTop: 20 }} />
                          
                          <div style={{justifyContent: "flex-start"}}  class="modal-footer">
                            <Button style={{borderRadius: 0}} variant='success' onClick={handlePosting}>
                              {loadd ? (
                                <>
                                  <Spinner size='sm' />
                                  <span style={{ marginLeft: '5px' }}>Saving, Please wait...</span>
                                </>
                              ) : (
                                "Save Savings"
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

export default SavingsExcel;