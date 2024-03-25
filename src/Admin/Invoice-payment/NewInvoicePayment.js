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
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'

function NewInvoice() {

    const [receive, setReceive] = useState('');
    const [subCat, setSubcat] = useState([]);
    const [paymentMeth, setPaymentMeth] = useState([]);
    const [teller, setTeller] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [currency, setCurrency] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedDebit, setSelectedDebit] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ sn: 1, accountName: '', accountCode: '', amount: '' }]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [paymentId, setPaymentId] = useState("");
    const [totalAmount, setTotalAmount] = useState('');
    const [debitAccount, setDebitAccount] = useState('');




    const handlePaymentChange = async (event) => {
        const selectedValue = event.target.value;
        setSelectedPayment(selectedValue);
    
        // Fetch account details based on the selected payment method
        if (selectedValue) {
            await fetchAccountName(selectedValue);
    
            // Update the accountCode field in formData based on the selected payment
            const defaultAccount = paymentMeth.length > 0 ? paymentMeth[0] : { gl_code: '' };
            const updatedFormData = formData.map(row => ({ ...row, accountCode: defaultAccount.gl_code }));
            setFormData(updatedFormData);
        }
    };
    
    

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };
    const handleDebitChange = (event) => {
        setSelectedDebit(event.target.value);
    };

    const fetchSubCat = async () => {
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

   
    const fetchAccountName = async (selectedPayment) => {
        setLoading(true);
    
        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-account-by-payment-mode?type=${selectedPayment}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearer}`,
                    },
                }
            );
    
            const paid = response.data?.data;
            console.log(paid, 'paid');
            setPaymentMeth(paid);
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };
    
    
      
      useEffect(() => {
        if (bearer && selectedPayment) {
          fetchAccountName(selectedPayment);
        }
      }, [bearer, selectedPayment]);
            

      const calculateTotalAmount = () => {
        const total = formData.reduce((acc, item) => acc + parseFloat(item.amount.replace(/\D/g, '') || 0), 0);
      
        // No need to use Number(total.toFixed(2)) here, as toLocaleString handles the formatting
        const formattedTotal = total.toLocaleString('en-US', {
          minimumIntegerDigits: 1,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      
        setTotalAmount(formattedTotal);
      };


    useEffect(() => {

        calculateTotalAmount();
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
            sn: formData.length + 1,
            accountName: paymentMeth.length > 0 ? paymentMeth[0].gl_name : '',
            accountCode: paymentMeth.length > 0 ? paymentMeth[0].gl_code : '',
            amount: '',
        };
        setFormData([...formData, newRow]);
        setSelectedPayment('');
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
    
        // Update the accountName field
        if (field === 'accountName') {
            updatedFormData[index][field] = formattedValue;
    
            // Find the selected account in the paymentMeth array
            const selectedAccount = paymentMeth.find(item => item.id === value);
            
            // Update the accountCode field based on the selected account
            updatedFormData[index]['accountCode'] = selectedAccount ? selectedAccount.gl_code : '';
        } else {
            updatedFormData[index][field] = formattedValue;
        }
    
        setFormData(updatedFormData);
    };
    
    const createIncome = async () => {
        setIsLoading(true);
    
        try {
            const accountNames = formData.map((row) => row.accountName).filter((name) => name !== undefined);
            
            const amounts = formData.map((row) => row.amount.replace(/,/g, ''));
            // console.log(amounts, "MEEE")
            const amount1 = totalAmount.replace(/,/g, '');
    
            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/income/create',
                {
                    account_id : accountNames,
    gl_code : selectedDebit,
    description : description,
    payment_mode : selectedPayment,
    breakdown_amount : amounts,
    total_amount : amount1,
    teller_no : teller,
    particulars : receive
                },
                { headers }
            );
    
            console.log(response.data.message, "heeee");
            setReceive("");
            setSelectedDebit("");
            setSelectedPayment("");
            setFormData("");
            setReceive("");
            setTeller("");
            setDescription("");
            navigate('/invoice_payment');
    
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
    
            
        } catch (error) {
            const errorStatus = error.response.data?.message;
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
            const resultss = response.data?.data;
            setPaymentMethod(resultss);

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
            fetchPaymentMethod();
            
        }
    }, [bearer]);


    const fetchSelectedCurrency = async () => {
        setLoading(true);


        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/fetch-all-currencies`,
                {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearer}`
                    }
                }
            );
            const curr = response.data?.data;
            setCurrency(curr);

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
            fetchSelectedCurrency();
        }
    }, [bearer]);

    console.log(selectedDebit);

    const fetchDebitAccount = async () => {
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
            const debitted = response.data?.data;
            setDebitAccount(debitted);

            // console.log(debitted, "NI");
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bearer) {
            fetchDebitAccount();
        }
    }, [bearer]);


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
                                                    <h1 className="font-weight-bold">Create New Income </h1>
                                                    <small>Complete the respective fields....</small>
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
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Received From</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={receive} onChange={(e) => setReceive(e.target.value)} name="receive" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Payment Mode</label>
                                                                        <div className="col-sm-9">
                                                                            <select name="customer" className="form-control" required="" value={selectedPayment} onChange={handlePaymentChange}>
                                                                                <option value="">Choose Payment Mode</option>
                                                                                {paymentMethod.map((item) => (
                                                                                <option key={item.value} value={item.value}>
                                                                                    {item.name}
                                                                                </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Currency</label>
                                                                        <div className="col-sm-9">
                                                                            <select name="customer" className="form-control" required="" value={selectedCurrency} onChange={handleCurrencyChange}>
                                                                                <option value="">Choose Currency</option>
                                                                                {currency.map((item) => (
                                                                                                <option key={item.id} value={item.id}>
                                                                                                    {item.currency}
                                                                                                </option>
                                                                                            ))}

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Debit Account</label>
                                                                        <div className="col-sm-9">
                                                                            <select name="customer" className="form-control" required="" value={selectedDebit} onChange={handleDebitChange}>
                                                                                <option value="">Choose Account</option>
                                                                                {subCat.map((item) => (
                                                                                                <option key={item.id} value={item.id}>
                                                                                                    {item.gl_name}
                                                                                                </option>
                                                                                            ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Teller / Cheque No</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={teller} onChange={(e) => setTeller(e.target.value)} name="receive" />
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







                                                            </div>

                                                            <div style={{ marginTop: 20 }} />
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th style={{ width: '50%', }}>Account Name</th>
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
                                                                                    <select
    name="customer"
    className="form-control"
    required=""
    value={row.accountName}
    onChange={(e) => handleFormChange(index, 'accountName', e.target.value)}
>
    <option value="">Choose Account Name</option>
    {paymentMeth.map((item) => (
        <option key={item.id} value={item.id}>
            {item.gl_name}
        </option>
    ))}
</select>


                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.accountCode}
                                                                                            readOnly
                                                                                            onChange={(e) => handleFormChange(index, 'accountCode', e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.amount}
                                                                                            onChange={(e) => handleFormChange(index, 'amount', e.target.value)}
                                                                                            style={{ textAlign: "right" }}
                                                                                        />
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
                                                            <div className="col-md-11" style={{ width: '100%', padding: "0" }}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Amount:</label>
                                                                    <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                        <input style={{ textAlign: "right", }} className="form-control" required="" type="text" value={totalAmount} name="total" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="modal-footer">
                                                                <Button variant='success' onClick={createIncome}>
                                                                    {isLoading ? (
                                                                        <>
                                                                            <Spinner size='sm' />
                                                                            <span style={{ marginLeft: '5px' }}>Creating Income, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Create Income"
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

export default NewInvoice