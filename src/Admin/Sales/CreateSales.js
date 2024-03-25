import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
import Select from 'react-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';


function CreateSales() {
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ items: '', unitPrice: '', qty: '', lineTotal: '' }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [debitAccount, setDebitAccounts] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectOptions1, setSelectOptions1] = useState([]);


    const fetchSupplierss = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/beneficiary', { headers });
            const results = response.data?.data;
            const options = results.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setDebitAccounts(results);
            setSelectOptions(options);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setDebitAccounts([]);
        } finally {
            setIsLoading(false);
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


    useEffect(() => {
        if (bearer) {
            fetchSupplierss();
            fetchItems();

        }
    }, [bearer]);


    //fetch records



    const handleSupplierChange = (selectedOption) => {
        setSelectedSupplier(selectedOption);
    }


    const calcTotalAmount1 = () => {
        const total = formData.reduce((total, row) => total + parseFloat(row.lineTotal) || 0, 0);
        setTotalAmount(total);
    };

    useEffect(() => {
        calcTotalAmount1();
    }, [formData]);



    const createSales = async () => {

        setCreateLoading(true);
        try {
            const quantities = formData.map((row) => row.qty).filter((id) => id !== undefined);
            const unitPrices = formData.map((row) => row.unitPrice).filter((id) => id !== undefined);
            const lineTotals = formData.map((row) => row.lineTotal).filter((id) => id !== undefined);
            const stocks = formData.map((row) => row.items.value).filter((id) => id !== undefined);

            

            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/sales/create',
                {
                  total_amount: totalAmount,
                  item_id: stocks,
                  price: unitPrices,
                    quantity: quantities, 
                    amount: lineTotals

                },
                { headers }
            );
            console.log(response.data.message);
            navigate('/sales');

            setFormData([]);

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
          items: '', 
          unitPrice: '', 
          qty: '', 
          lineTotal: '' 
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };




    const handleItemDescriptionChange = (selectedOption, rowIndex) => {
      const selectedItemId = selectedOption.value;
      const selectedItem = itemList.find(item => item.id === selectedItemId);
      const selectedUnitPrice = selectedItem?.price || 0;
      handleFormChange(selectedOption, "items", rowIndex);
      handleFormChange(selectedUnitPrice, "unitPrice", rowIndex);
  };
  









    const handleValueChange = (value, index) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            unitPrice: value,
        };
        setFormData(updatedFormData);
    };


    const handleFormChange = (value, fieldName, rowIndex) => {
        setFormData(prevFormData => {
            const updatedFormData = [...prevFormData];
            updatedFormData[rowIndex] = {
                ...updatedFormData[rowIndex],
                [fieldName]: value
            };
            updatedFormData[rowIndex].amount = parseFloat(updatedFormData[rowIndex].unitPrice) * parseFloat(updatedFormData[rowIndex].qty) || 0;
            return updatedFormData;
        });
    };
    
    
    const calcTotalAmount = () => {
        const updatedFormData = formData.map(row => ({
            ...row,
            lineTotal: parseFloat(row.unitPrice) * parseFloat(row.qty) || 0
        }));
        setFormData(updatedFormData);
    };

    useEffect(() => {
        calcTotalAmount(); 
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
                                                    <h1 className="font-weight-bold">Add New Sales </h1>
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


                                                            

                                                            <div style={{ marginTop: 20 }} />
                                                            {/* <h5 style={{ textAlign: "center" }}>Other Expense(s)</h5> */}
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                {/* <th style={{ width: '10%', }}>S/N</th> */}
                                                                                <th>Items</th>
                                                                                <th>Unit Price</th>
                                                                                <th>Quantity</th>
                                                                                <th >Line Total</th>
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
                                                                                    </td>
                                                                                    <td style={{ width: '7rem' }}>
                                                                                    <CurrencyInput
                                                                                            name={`rowLineTotal ${index}`} // Provide a unique name for each CurrencyInput
                                                                                            decimalsLimit={2}
                                                                                            value={row.lineTotal}
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
                                                                        <input style={{ textAlign: "right", }} className="form-control" required="" type="text" value={totalAmount} name="total" readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="modal-footer" style={{justifyContent: 'flex-start',}}>
                                                                <Button variant="success" onClick={createSales} style={{ borderRadius: 0 }}>
                                                                    {createLoading ? (
                                                                        <>
                                                                            <Spinner size='sm' />
                                                                            <span style={{ marginLeft: '5px' }}>Processing, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Add New Sales"
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

export default CreateSales