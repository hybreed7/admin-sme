import React, { useState, useEffect } from 'react';
import "../../Admin/assets/plugins/bootstrap/css/bootstrap.min.css";
import "../../Admin/assets/plugins/metisMenu/metisMenu.min.css";
import "../../Admin/assets/plugins/fontawesome/css/all.min.css";
import "../../Admin/assets/plugins/typicons/src/typicons.min.css";
import "../../Admin/assets/plugins/themify-icons/themify-icons.min.css";
import "../../Admin/assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../../Admin/AdminHeaderNav';
import Select from 'react-select';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../../src/InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form } from 'react-bootstrap';
import favicon from '../../../src/Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';

function PurchaseDelivery() {
    const [isLoading, setIsLoading] = useState(false);
    const [bankLoading, setBankLoading] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const navigate = useNavigate();
    const [debitAccount, setDebitAccounts] = useState([]);
    const [suppliedQuantity, setSuppliedQuantity] = useState("");
    const [totalSupplied, setTotalSupplied] = useState("");
    const [ben, setBen] = useState([]);
    const [orders, setMyOrders] = useState([]);
    const [benBank, setBenBank] = useState([]);
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [load, setLoad] = useState(false);
    const [formData, setFormData] = useState(orders.map(() => ({ suppliedQuantity: "", suppliedPrice: "", suppliedAmount: ""  })));

    const fetchSupplierss = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/beneficiary', { headers });
            const beneficiariess = response.data?.data;

            const options1 = beneficiariess.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setBen(options1);

        } catch (error) {
            if (error.response && error.response.status === 401) {
              
              navigate('/login');
            } else {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setBen([]);
          }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBanks = async () => {
        setBankLoading(true);
    
        try {
          const response = await axios.get(
            `https://api-sme.promixaccounting.com/api/v1/get-account-by-category-id?category_id=${1}`,
            {
    
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
              }
            }
          );
          const allBanks = response.data?.data;
          const allFetchedBanks = allBanks.map((item) => ({
            label: item.gl_name,
            value: item.id,
        }));
        setBanks(allFetchedBanks);
    
          //   console.log(results, "NI");
        } catch (error) {
          const errorStatus = error.response.data.message;
          console.error(errorStatus);
        } finally {
            setBankLoading(false);
        }
      };
   

    const fetchBenAcct = async (selectedBeneficiary) => {
        setLoading(true);
        // console.log(selectedBeneficiary)
        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/customer-pendingorder?customer_id=${selectedBeneficiary}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearer}`,
                    },
                }
            );
            // console.log(response)
            const paid = response.data?.data || [];
            // console.log(paid, 'paid');
            const banks = paid.map((item) => ({
                label: item.order_id,
                value: item.order_id,
            }));
            setBenBank(banks);
        } catch (error) {
            const errorStatus = error.response.data.message;
            // console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };
    const handleClick = async () => {
        setFilterLoading(true);
        try {
            const response = await axios.get(
                `https://api-sme.promixaccounting.com/api/v1/order-details?customer_id=${selectedBeneficiary}&order_id=${selectedOrder}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${bearer}`,
                    },
                }
            );
            console.log(response)
            const orders = response.data?.data || [];
            // console.log(paid, 'paid');

            setMyOrders(orders);
        } catch (error) {
            const errorStatus = error.response.data.message;
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: errorStatus,
            });
            // console.error(errorStatus);
        } finally {
            setFilterLoading(false);
        }
    };

    const handleBeneficiaryChange = (selectedOption) => {
        setSelectedBeneficiary(selectedOption.value);
        setSelectedOrder("");

    };
    const handleOrderChange = (selectedOption) => {
        setSelectedOrder(selectedOption.value);
    };
    const handleBankChange = (selectedOption) => {
        setSelectedBank(selectedOption.value);
    };



    useEffect(() => {
        if (bearer && selectedBeneficiary) {
            fetchBenAcct(selectedBeneficiary);
        }
    }, [bearer, selectedBeneficiary]);


    

    useEffect(() => {
        if (bearer) {
           
            fetchSupplierss();
            fetchBanks();


        }
    }, [bearer]);





    const createPurchaseDelivery = async () => {

        setCreateLoading(true);
        try {
            const quantities = formData.map((row) => row.suppliedQuantity).filter((id) => id !== undefined);
            const prices = formData.map((row) => row.suppliedPrice).filter((id) => id !== undefined);
            const amounts = formData.map((row) => row.suppliedAmount).filter((id) => id !== undefined);
            const purchases = orders.map((item) => item.id).filter((id) => id !== undefined);


            // console.log(quantities, prices, amounts, selectedBeneficiary, purchases);
        
            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/stock-delivery',
                {
                    customer_id: selectedBeneficiary,
                    purchase_order_id: purchases,
                    quantity_supplied: quantities,
                    supplied_price: prices,
                    supplied_amount: amounts,
                    // bank: selectedBank
                   
                },
                { headers }
            );
            navigate('/ManagePurchase_Delivery');

     

            // return
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
            // console.log(response.data);

        } catch (error) {
            const errorStatus = error.response.data.message;
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: errorStatus,
            });
            // console.log(error);
        } finally {
            setCreateLoading(false);
        }
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

    
    const handleValueChange = (value, name, index) => {
        const updatedFormData = [...formData];
        if (!updatedFormData[index]) {
            updatedFormData[index] = {};
        }
        updatedFormData[index][name] = value;
    
        // Calculate the new amount
        const suppliedQuantity = parseFloat(updatedFormData[index].suppliedQuantity || 0);
        const suppliedPrice = parseFloat(updatedFormData[index].suppliedPrice || 0);
        const suppliedAmount = suppliedQuantity * suppliedPrice;
    
        // Fetch the current row's amount from orders and add it to suppliedAmount
        const currentAmount = parseFloat(orders[index]?.amount || 0);
        const totalAmount = currentAmount + suppliedAmount;
    
        // Update the state with the new suppliedAmount
        const newFormData = updatedFormData.map((item, idx) => {
            if (idx === index) {
                return { ...item, suppliedAmount: suppliedAmount };
            }
            return item;
        });
    
        setFormData(newFormData);
    };
    

    
    
    const calcTotalAmount1 = () => {
        const total = formData.reduce((total, row) => total + parseFloat(row.suppliedAmount) || 0, 0);
        setTotalSupplied(total);
        // console.log(totalQuantity);
    };

    useEffect(() => {
        calcTotalAmount1();
    }, [formData]);
    
    




    

    



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
                                                    <h1 className="font-weight-bold">Create New Purchase delivery </h1>
                                                    <small>Fill the respective fields to create your purchase delivery...</small>
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

                                                                <div className="col-md-12" style={{ display: 'flex', }}>
                                                                    <div className="form-group row" style={{ marginRight: '3rem', }}>
                                                                        <label for="example-text-input" className="col-sm-5 col-form-label font-weight-400">Suppliers </label>
                                                                        <div className="col-sm-12">
                                                                            <Select
                                                                                options={ben}
                                                                                onChange={handleBeneficiaryChange}
                                                                                placeholder="select supplier"
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
                                                                    <div className="form-group row" style={{ marginRight: '3rem', }}>
                                                                        <label for="example-text-input" className="col-sm-9 col-form-label font-weight-400">Order ID Number </label>
                                                                        <div className="col-sm-12">
                                                                            <Select

                                                                                options={benBank}
                                                                                placeholder="select order ID"
                                                                                onChange={handleOrderChange}
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
                                                                   
                                                                    <div class="modal-footer">
                                                                        <Button onClick={handleClick} variant="success" >
                                                                            {filterLoading ? (
                                                                                <>
                                                                                    <Spinner size='sm' />
                                                                                    <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                                                                </>
                                                                            ) : (
                                                                                "Filter Order"
                                                                            )}
                                                                        </Button>
                                                                        
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <div style={{ marginTop: 20 }} />
                                                            {/* <h5 style={{ textAlign: "center" }}>Other Expense(s)</h5> */}
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                
                                                                                <th>Items Description</th>
                                                                                <th>Price</th>
                                                                                <th>Quantity</th>
                                                                                <th>Amount</th>
                                                                                <th>Supplied Quantity</th>
                                                                                <th>Supplied Price</th>
                                                                                <th>Supplied Amount</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            {orders.map((rowData, index) => (
                                                                                <tr key={index}>
                                                                                    <td>{rowData?.stock?.name}</td>
                                                                                    <td>{rowData.price}</td>
                                                                                    <td>{rowData.quantity}</td>
                                                                                    
                                                                                    <td>
                                                                                    <CurrencyInput
                                                                                        name='amount' 
                                                                                        decimalsLimit={2}
                                                                                        value={rowData.amount}
                                                                                        className="form-control"
                                                                                        disabled
                                                                                        style={{ textAlign: "right", border: "none", width: '8rem' }}
                                                                                    />
                                                                                    </td>
                                                                                    <td style={{width: "20%"}}>
            <input
                className="form-control"
                required=""
                type="text"
                onChange={(e) => handleValueChange(e.target.value, "suppliedQuantity", index)}
                name="supplied-quantity"
                value={formData[index]?.suppliedQuantity || ""}
            />
        </td>
        <td>
            <CurrencyInput
                name="supplied price"
                decimalsLimit={2}
                value={formData[index]?.suppliedPrice || ""}
                className="form-control"
                onValueChange={(value) => handleValueChange(value, "suppliedPrice", index)}
                style={{ textAlign: "right", border: "none", width: '8rem' }}
            />
        </td>
        <td>
            <CurrencyInput
                name="supplied amount"
                decimalsLimit={2}
                value={formData[index]?.suppliedAmount || ""}
                className="form-control"
                disabled
                // onValueChange={(value) => handleValueChange(value, "suppliedAmount", index)}
                style={{ textAlign: "right", border: "none", width: '8rem' }}
            />
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
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Supplied Amount:</label>
                                                                    <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                    <CurrencyInput
                name="supplied total"
                decimalsLimit={2}
                value={totalSupplied}
                className="form-control"
                disabled
                style={{ textAlign: "right", border: "none", width: '8rem' }}
            />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div class="modal-footer" /> */}

                                                            
{/* {orders.length > 0 && (
                                                            <div className="form-group row" style={{ marginRight: '3rem',}}>
                                                                        <label for="example-text-input" className="col-sm-12 col-form-label font-weight-400">Select Bank: </label>
                                                                        <div className="col-sm-6">
                                                                            <Select

                                                                                options={banks}
                                                                                placeholder="select bank"
                                                                                onChange={handleBankChange}
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
)} */}
                                                            <div class="modal-footer" style={{ justifyContent: 'flex-start' }}>
                                                                <Button variant="success" style={{ borderRadius: 0 }} onClick={createPurchaseDelivery}>
                                                                    {createLoading ? (
                                                                        <>
                                                                            <Spinner size='sm' />
                                                                            <span style={{ marginLeft: '5px', }}>Processing, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Create Purchase Delivery"
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

export default PurchaseDelivery