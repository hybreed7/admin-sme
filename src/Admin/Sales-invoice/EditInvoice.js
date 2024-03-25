import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button, Spinner, Form} from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import data from '../../Pages/AccordionComponent/AccordionData';
import CurrencyInput from 'react-currency-input-field';


function EditInvoice() {

    const [debitGl, setDebitGl] = useState('');
    const [selectedGlCode, setSelectedGlCode] = useState('');
    const [glMethod, setGlMethod] = useState([]);
    const [sICode, setSICode] = useState('');
    const [invoiceData, setInvoiceData] = useState('');
    const [selectedAccountName, setSelectedAccountName] = useState('');
    const [accountName, setAccountName] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    
    const [invoice, setInvoice] = useState('');
    const [description, setDescription] = useState('');
    const [debitCode, setDebitCode] = useState('');
    const [debitAmount, setDebitAmount] = useState('');
    const [selectedDebitAccount, setSelectedDebitAccount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', amount: '' }]);
    const [totalAmount, setTotalAmount] = useState('');
    const location = useLocation();
    const { selectedInvoice } = location.state || {};
    

    // useEffect(() => {
    //     if (selectedInvoice) {
    //       setSelectedCustomer(selectedInvoice.amount || '');
    //       console.log(selectedCustomer);
    
         
    //     }
    //   }, [selectedInvoice]);
  

    const handleGlChange = (event) =>{
        setDebitGl(event.target.value);
    }
    const handleAccountChange = (index, event) => {
        const selectedAccount = event.target.value;
        const intselectedId = parseInt(selectedAccount);
        const selectedGlCode = accountName.find((item) => item.id === intselectedId)?.gl_code || '';

        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            accountName: selectedAccount,
            accountCode: selectedGlCode,
        };

        setFormData(updatedFormData);
    };

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };
    const handleDebitChange = (event) => {
        selectedDebitAccount(event.target.value);
    };


    const calculateTotalAmount = () => {
        const total = formData.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
        const formattedTotal = total.toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setTotalAmount(formattedTotal);
    };
    


    useEffect(() => {
        calculateTotalAmount();
    }, [formData]);

    
    // console.log(formData);

    const createSalesInvoice = async () => {
        setIsLoading(true);
    
        try {
            const accountNames = formData.map((row) => row.accountName).filter((name) => name !== undefined);
            const amounts = formData.map((row) => row.amount).filter((name) => name !== undefined);
            // const amount1 = parseFloat(debitAmount.replace(/,/g, '')); 
    
         
            // if (debitAmount !== amount1) {
            //     throw new Error("Debit amount is not equal to the total amount");
            // }
    console.log(accountNames, amounts, debitAmount);



            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/post-sales-invoice',
                {
                    account_name: accountNames,
                    account_amount: amounts,
                    description: description,
                    invoice_number: sICode,
                    customer_id: selectedCustomer,
                    debit_gl_code: debitGl,
                    amount: debitAmount,
                },
                { headers }
            );
    
            // console.log(response.data?.message, "heeee");
            setSICode("");
            setSelectedCustomer("");
            setDebitCode("");
            setSelectedAccountName("");
            setDebitAmount("");
            setDescription("");
            navigate('/invoice');
    
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data?.message,
            });
    
        } catch (error) {
            const errorStatus = error.response ? error.response.data.message : "An error occurred";
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: errorStatus,
            });
    
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    

    const fetchGlMethod = async () => {
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
          const resultss = response.data?.data;
          setGlMethod(resultss);
    
        //   console.log(resultss, "NI");
        } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
        } finally {
          setLoading(false);
        }
      };

    const fetchCustomers = async () => {
        setLoading(true);
    
    
        try {
          const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/customer`,
            {
             
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
          const custome = response.data?.data;
          setCustomerList(custome);
    
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
            fetchGlMethod();
            fetchCustomers();
        }
      }, [bearer]);
      
    const fetchInvoiceCode = async () => {
        setLoading(true);
    
    
        try {
          const response = await axios.get(
            'https://api-sme.promixaccounting.com/api/v1/generate-sales-invoice-code',
            {
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
          const resultss = response.data?.data;
        //   console.log(resultss);
          setSICode(resultss);
            // console.log(invoiceData)
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
            fetchInvoiceCode();
        }
      }, [bearer]);

      const fetchAcctName = async () => {
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
          const resultss = response.data?.data;
          setAccountName(resultss);
    
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
            fetchAcctName();
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

    const addRow = () => {
        const newRow = {
            sn: formData.length + 1,
            accountName: '',
            accountCode: '',
            amount: '',
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    const handleFormChange = (index, field, value) => {
        const updatedFormData = [...formData];
        const numericValue = value.replace(/\D/g, '');
        const numericAmount = numericValue !== '' ? parseFloat(numericValue) : '';
        const formattedValue = numericAmount !== '' ? numericAmount.toLocaleString() : '';

        updatedFormData[index][field] = formattedValue;
        setFormData(updatedFormData);
    };



    const handleValueChange = (value, name, values) => {
        setDebitAmount(value); // Update the balance state
        console.log(value, name, values);
      };

      const handleValueChange1 = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            amount: value,
        };
        setFormData(updatedFormData);
        calculateTotalAmount(); // Recalculate total amount after each change
    };
    
      


    return (
        <div style={{marginTop:'8rem',}}>
            <AdminHeaderNav />
            <div className='newBody'>
                <div className='newWidth'>
                    <div className="wrapper">
                        {/* <!-- Sidebar  --> */}


                        {/* <!-- Page Content  --> */}
                        <div className="content-wrapper">



                            <div className="main-content">
                                

                                <div className="content-header row align-items-center m-0">

                                    <div className="col-sm-12 header-title p-0">
                                        <div className="media">
                                            <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                            <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                <div>
                                                    <h1 className="font-weight-bold">View Sales Invoice </h1>
                                                    <small>Complete the respective fields ....</small>
                                                </div>
                                                <div style={{ marginBottom: 30, }}>
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
                                            <div className="col-lg-12" >
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="card-body">


                                                            <div className="row" style={{width: '100%',}}>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" style={{paddingRight: '2px',}}>Invoice To:</label>
                                                                        <div className="col-sm-9">
                                                                        <input className="form-control" required="" type="email" value={selectedInvoice?.customer?.name}  name="customer" disabled style={{width: '500px',}} />
                                                                            {/* <Form.Select name="customer" className="form-control" required="" value={selectedInvoice.customer?.name} disabled  style={{width: '400px',}}>
                                                                                <option value="">Choose Customer</option>
                                                                                {customerList.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                                ))}
                                                                            </Form.Select> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-4 col-form-label font-weight-400" style={{paddingRight: '2px', }}>Sales Invoice Code:</label>
                                                                        <div className="col-sm-6">
                                                                            <input className="form-control" required="" type="text" readOnly value={selectedInvoice.invoice_number}  name="invoice" style={{width: '500px', paddingRight: '-25rem'}} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" style={{paddingRight: '2px',}}>Description:</label>
                                                                        <div className="col-sm-9">
                                                                            <textarea
                                                                                className="form-control"
                                                                                required=""
                                                                                value={selectedInvoice.description}
                                                                                disabled
                                                                                name="description" style={{width: '400px',}}
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-4 col-form-label font-weight-400" style={{paddingRight: '2px',}}>Debit GL Account:</label>
                                                                        <div className="col-sm-6">

                                                                            <Form.Select name="DebitGl" className="form-control" required="" value={debitGl} onChange={handleGlChange}>
                                                                                <option value="">Choose Debit Gl Account</option>
                                                                                {glMethod.map((item) => (
                                                                                <option key={item.id} value={item.id}>
                                                                                    {item.gl_name}
                                                                                </option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6" style={{paddingLeft: '-3px',}}>
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" style={{paddingRight: '2px',}}>GL Code:</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="email" value={debitCode} onChange={(e) => setDebitCode(e.target.value)} name="code" style={{width: '500px',}} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6" style={{padding: '0px !important',}}>
                                                                    <div className="form-group row" style={{paddingLeft: '48px',}}>
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400" style={{paddingRight: '2px',}}>Amount:</label>
                                                                        <div className="col-sm-7">
                                                                            <div className="form-control" >
                                                                     <CurrencyInput
//   id="exampleForm.ControlInput1"
  name="debit amount"
  decimalsLimit={2}
  value={selectedInvoice.amount} // Set the value to the balance state
      disabled
      style={{ textAlign: "right", border: "none"}}
/>
</div>
                                                                            {/* <input className="form-control" required="" type="email" value={debitAmount} onChange={handleChange} name="amount" style={{width: '800px', textAlign: "right"}}/> */}
                                                                        </div>
                                                                    </div>
                                                                </div>




                                                            </div>

                                                            <div style={{ marginTop: 20 }} />
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th style={{width:'50%',}}>Account Name</th>
                                                                                <th>Account Code</th>
                                                                                <th>Amount</th>
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
                        <Form.Select
                            name="DebitGl"
                            className="form-control"
                            required=""
                            value={row.accountName}
                            onChange={(e) => handleAccountChange(index, e)}
                        >
                            <option value="">Choose Debit Gl Account</option>
                            {accountName.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.gl_name}
                                </option>
                            ))}
                        </Form.Select>
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={row.accountCode}
                            readOnly
                        />
                    </td>
                    <td>
                        
                        <CurrencyInput
    name={`debit amount ${index}`} // Provide a unique name for each CurrencyInput
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
                    <td>
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
                                                            <div className="col-md-11" style={{width:'100%', padding:"0"}}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Amount:</label>
                                                                    <div className="col-sm-4" style={{padding:'0', maxWidth:'18.5%',}}>
                                                                        <input style={{ textAlign: "right",}} className="form-control" required="" type="text" value={totalAmount} name="total" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="modal-footer">
                                                                <Button variant='success' onClick={createSalesInvoice}>
                                                                    {isLoading ? (
                                                                        <>
                                                                            <Spinner size='sm'/>
                                                                            <span style={{ marginLeft: '5px' }}>Creating your sales invoice, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Create Sales Invoice"
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

export default EditInvoice;