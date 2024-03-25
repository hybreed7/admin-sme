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
import Select from 'react-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, DropdownItemText, Spinner, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';

function CreatePaymentVoucher() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [updateDate, setUpdateDate] = useState('');
    const [creditAccount, setCreditAccount] = useState([]);
    const [selectedCreditAccount, setSelectedCreditAccount] = useState("");
    const [selectedBank, setSelectedBank] = useState("");
    const [ben, setBen] = useState([]);
    const [benBank, setBenBank] = useState([]);
    const [debitAccount, setDebitAccounts] = useState([]);
    const [tax, setTax] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [bearer, setBearer] = useState('');
    const [contractAmount, setContractAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const navigate = useNavigate();
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [selectedDebiAccount, setSelectedDebitAccount] = useState(null);
    const [formData, setFormData] = useState([{ sn: 1, tax: '', percentage: '', amount: '' }]);

    const handleFileChange = (event) => {
        const file = event.target.files;
        setSelectedFiles(file);
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

    const addRow = () => {
        const newRow = {
            sn: formData.length + 1,
            tax: '',
            percentage: '',
            amount: '',
        };
        setFormData([...formData, newRow]);
        // setSelectedPayment('');
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    useEffect(() => {
        readData();
        // autoSetBeneficiaries();
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    };

    const goBack = () => {
        navigate(-1);
    }

   

    const handleValueChange = (value, name, values) => {
        setContractAmount(value); // Update the balance state
       
      };

    const handleValueChange2 = (value, name, values) => {
        setTotalAmount(value); // Update the balance state
       
      };
    
    //create beneficiary
    const handlePayment = async () => {
        console.log(date, totalAmount, totalTax, selectedCreditAccount,selectedBeneficiary, description, contractAmount, selectedCreditAccount)
        setLoad(true);
        try {
            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/payment_voucher/create-new',
                {
                    date: date,
                    total_amount: totalAmount,
                    total_tax_amount: totalTax,
                    gl_account: selectedCreditAccount,
                    beneficiary_account: selectedBeneficiary,
                    description: description,
                    contract_amount: contractAmount,
                    account: selectedCreditAccount
                },
                { headers }
            );
            console.log(response)
        navigate('/payment_voucher')
            //   handleClose();
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
            setLoad(false);
        }
    };

 
   
    const fetchBeneficiaries = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/beneficiary', { headers });


            const results = response.data?.data;
            setBen(results);
            // console.log(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setBen([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTax = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/taxes', { headers });


            const taxes = response.data?.data;
            setTax(taxes);
            // console.log(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setBen([]);
        } finally {
            setIsLoading(false);
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
            // console.log(paid, 'paid');
            setBenBank(paid);
        } catch (error) {
            const errorStatus = error.response.data.message;
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    const handleBeneficiaryChange = (selectedOption) => {
        setSelectedBeneficiary(selectedOption.value);
        setSelectedBank(null);
        setBenBank([]);
    };

    const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption.value);
    };

    const handleCredit = (selectedOption) => {
        setSelectedCreditAccount(selectedOption.value);
    };

    const handleDebit = (selectedOption) => {
        setSelectedDebitAccount(selectedOption.value);
    };
    
    
      
      useEffect(() => {
        if (bearer && selectedBeneficiary) {
            fetchBenAcct(selectedBeneficiary);
        }
      }, [bearer, selectedBeneficiary]);

    const options = ben.map(beneficiary => ({
        label: beneficiary.name,
        value: beneficiary.id,
    }));


    const bankOptions = benBank.map(bank => ({
        label: bank.bank_name,
        value: bank.id,
    }));

    const fetchdebitAccounts = async () => {
        setIsLoading(true);
        try {
            const responses = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-account-by-class-id?class_id=${5}`,
                {
                 
                  headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                  }
                }
              );

            const resultx = responses.data?.data;
            // console.log(resultx,"here");
            setDebitAccounts(resultx);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            // console.log(errorStatus);
            setDebitAccounts([]);
        } finally {
            setIsLoading(false);
        }
    };

    

    const debitOptions = debitAccount.map(account => ({
        label: account.gl_name,
        value: account.id,
    }));

 

    const creditOptions = creditAccount.map(account => ({
        label: account.gl_name,
        value: account.id,
    }));



    const fetchCreditAccount = async () => {
        setIsLoading(true);
        try {
            const responses = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/get-account-by-category-id?category_id=${3}`,
                {
                 
                  headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearer}`
                  }
                }
              );

            const resultxx = responses.data?.data;
            // console.log(resultx,"here");
            setCreditAccount(resultxx);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            // console.log(errorStatus);
            setCreditAccount([]);
        } finally {
            setIsLoading(false);
        }
    };

    



    useEffect(() => {
        if (bearer) {
            fetchCreditAccount();
            fetchBeneficiaries();
            fetchTax();
            fetchdebitAccounts();
        }
    }, [bearer]);

    const [applyTax, setApplyTax] = useState(false);

    const handleToggle = () => {
        setApplyTax(!applyTax);
    };
    
    const handleAccountChange = (index, event) => {
        const selectedTaxAccount = event.target.value;
        const intselectedId = parseInt(selectedTaxAccount);
        const percentage = tax.find((item) => item.id === intselectedId)?.percentage || '';
    
        
        const contractAmountValue = contractAmount || 0;
    
       
        const calculatedAmount = (contractAmountValue * percentage) / 100;
    
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            tax: selectedTaxAccount,
            percentage: percentage,
            amount: calculatedAmount.toFixed(2), // Adjust the precision as needed
        };
    
        setFormData(updatedFormData);
    };
    
    const calculateTotalAmount = () => {
        const total = formData.reduce((accumulator, row) => accumulator + parseFloat(row.amount || 0), 0);
        return total.toFixed(2);
    };
    
    const calculateTotal = () => {
        const totalResult = (parseFloat(contractAmount || 0) - parseFloat(totalTax)).toFixed(2);
        return totalResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    

    const handleValueChange1 = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            amount: value,
        };
        setFormData(updatedFormData);

    };

    useEffect(() => {
        const totalTaxValue = calculateTotalAmount();
        setTotalTax(totalTaxValue);
    
        const totalAmountValue = calculateTotal();
        setTotalAmount(totalAmountValue);
    
    }, [formData, contractAmount, totalTax]);
    

    
    return (
        <div style={{ marginTop: '8rem', }}>
            <AdminHeaderNav />
            <div className="wrapper">
                <div className='newBody'>
                    <div className='newWidth'>
                        <div className="main-content">


                            <div className="content-header row align-items-center m-0">

                                <div className="col-sm-8 header-title p-0">
                                    <div className="media">
                                        <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                        <div className="media-body">
                                            <h1 className="font-weight-bold">Create new payment voucher </h1>
                                            <small>Fill the respective fields to create your voucher....</small>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row row-sm" style={{ marginTop: '2rem' }} >
                            <div className="col-lg-12">
                                <div className="card">
                                    {/* <div className="card-header border-bottom d-flex">
                                        <h4>Beneficiary Payment</h4>
                                      
                                    </div> */}

                                    <div className="card-body">
                                        <form  >
                                            <input type="hidden" ></input>                                <div className="row mb-4">

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Date</label>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="date"
                                                            value={date}
                                                            onChange={(e) => setDate(e.target.value)} style={{ height: 'calc(1.8em + 1.89rem + 2px)' }}></input>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Debit Account (DR)</label>
                                                        <Select
                                                            options={debitOptions}
                                                            // isLoading={isLoading}
                                                            onChange={handleDebit}
                                                            // value={selectedDebiAccount}
                                                            placeholder="Select debit account"
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Credit Account (CR)</label>
                                                        <Select
                                                             options={debitOptions}
                                                             // isLoading={isLoading}
                                                             onChange={handleCredit}
                                                            //  value={selectedCreditAccount}
                                                             placeholder="Select credit account"
                                                        />
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="row mb-4">

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Beneficiary</label>
                                                        <Select
                                                            options={options}
                                                            // isLoading={isLoading}
                                                            onChange={handleBeneficiaryChange}
                                                            placeholder="Select a beneficiary"
                                                           
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group" id="beneficiary_acc_div">
                                                        <label>Beneficiary Account</label>
                                                        <Select
                                                            options={bankOptions}
                                                            placeholder="Select beneficiary account"
                                                            onChange={handleBankChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-4">

                                                    <div className="form-group">
                                                        <label>Description</label>
                                                        <input value={description} onChange={(e) => setDescription(e.target.value)}  type="text" name="description" className="form-control" required=""></input>


                                                    </div>
                                                </div>

                                                <div className="col-md-4">

                                                    <div className="form-group">
                                                        <label>Mode</label>
                                                        <Form.Select name="mode" className="form-control" id="">
                                                            <option value="">Select Mode</option>
                                                            <option value="A">A</option>
                                                            <option value="B">B</option>
                                                            <option value="C">C</option>
                                                        </Form.Select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">

                                                    <div className="form-group">
                                                        <label>Supporting Document</label>
                                                        <input onChange={handleFileChange} type="file" accept=".pdf, .jpg, .jpeg, .png" name="document" className="form-control" required=""></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-md-4" id="budgetDiv" style={{ display: 'none' }}>
                                                    <div className="form-group">
                                                        <label id="budgetLabel"></label>
                                                        <input className="form-control" readonly="" name="" style={{ textAlign: "right" }} id="budgetAmount"></input>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Contract Amount</label>
                                                        <CurrencyInput
    name="contract-amount" // Provide a unique name for each CurrencyInput
    decimalsLimit={2}
    value={contractAmount}
    className="form-control"
    onValueChange={(value) => handleValueChange(value)}
    style={{ textAlign: "right", border: "1px solid #e4e4e4"}}

/>
                                                        {/* <input value={contractAmount} onChange={(e) => setContractAmount(e.target.value)}  className="form-control contractAmount" type="number" step="0.01" name="contract_amount" style={{ textalign: "right" }} id="placers" required=""></input> <span id="showMoney"></span> */}

                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label>Total Amount</label>
                                                        <CurrencyInput
    name="contract-amount" // Provide a unique name for each CurrencyInput
    decimalsLimit={2}
    value={totalAmount}
    className="form-control"
    onValueChange={(value) => handleValueChange2(value)}
    style={{ textAlign: "right", border: "1px solid #e4e4e4"}}
readOnly
/>
                                                        {/* <input value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className="form-control" readonly="" name="total_amount" style={{ textAlign: "right" }} id="totalAmount"></input> */}
                                                    </div>
                                                </div>

                                            </div>




                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="form-check form-switch form-switch-md mb-3" dir="ltr" onChange={handleToggle} >
                                                        <input type="checkbox" className="form-check-input" id="customSwitchsizemd"></input>
                                                        <label className="form-check-label" for="customSwitchsizemd">Apply Tax</label>
                                                    </div>
                                                </div>


                                            </div>

                                            {applyTax &&
                                                <div className="row" id="taxDIV">
                                                    <h4>Select taxes</h4>
                                                    <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th style={{width:'50%',}}>Tax</th>
                                                                                <th>Percentage</th>
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
                                                                                            className="form-control"
                                                                                            value={row.tax}
                                                                                            onChange={(e) => handleAccountChange(index, e)}
                                                                                        >
                                                                                            <option value="">Select Tax</option>
                                                                                            {tax.map((item) => (
                                                                                                <option key={item.id} value={item.id}>
                                                                                                    {item.description}
                                                                                                </option>
                                                                                            ))}
                                                                                           
                                                                                        </Form.Select>
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.percentage}
                                                                                            readOnly
                                                                                          
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
    readOnly
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
                                                                <div style={{ marginTop: 20 }} />
                                                            <div className="col-md-11" style={{width:'100%', padding:"0"}}>
                                                                <div className="form-group row justify-content-end">
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Tax Amount:</label>
                                                                    <div className="col-sm-4" style={{padding:'0', maxWidth:'18.5%',}}>
                                                                        <input style={{ textAlign: "right",}} className="form-control" required="" type="text" value={totalTax} onChange={(e) => setTotalTax(e.target.value)} name="total-tax" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>                                                </div>
                                            }

                                            <div class="modal-footer">
                                                <Button variant='success' onClick={handlePayment} >
                                                    {load ? (
                                                        <>
                                                            <Spinner size='sm'/>
                                                            <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                                        </>
                                                    ) : (
                                                        "Create Payment Voucher"
                                                    )}
                                                </Button>

                                            </div>

                                        </form>
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

export default CreatePaymentVoucher