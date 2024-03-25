import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner, Form, Select } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import { InfoFooter } from '../../InfoFooter';

function CreateRequisition() {

    const [particulars, setParticulars] = useState('');
    const [subCat, setSubcat] = useState([]);
    const [subCat2, setSubcat2] = useState([]);
    const [totalCharge, setTotalCharge] = useState('');
    const [selectedaAsetAccount, setSelectedAssetAccount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ itemsDescription: '', qty: '',  }]);
    const [totalAmount, setTotalAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedTime1, setSelectedTime1] = useState('');
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);
    const [itemDesc, setItemDesc] = useState([]);
    // const [quantity, setQuantity] = useState ('');

    const [narration, setNarration] = useState('');
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [department, setDepartment] = useState('');
 

    





    //fetch records
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/departments', { headers });
      const dept = response.data?.data;
      setTableData(dept);
    //   console.log(dept);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchItems = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/items/fetch-all', { headers });
      const ite = response.data?.data;
      setTableData1(ite);
    //   console.log(ite);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData1([]);
    } finally {
      setIsLoading(false);
    }
  };


    // const handleStockNameChange = (event) =>{
    //     setStockName(event.target.value);
    // }

    // const handleDateChange = (event) => {
    //     setSelectedDate(event.target.value);
    // };
    // const handleTimeChange = (event) => {
    //     setSelectedTime(event.target.value);
    // };
    // const handleTimeChange1 = (event) => {
    //     setSelectedTime1(event.target.value);
    // };


    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    // const handleAccountChange = (event) => {
    //     setSelectedAccount(event.target.value);
    // };






    

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
            itemsDescription: '',
            qty: '',
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
        
    };

    const handleFormChange = (value, fieldName, rowIndex) => {
        setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[rowIndex] = {
                ...updatedFormData[rowIndex],
                [fieldName]: value,
            };
            return updatedFormData;
        });

    };


   



   

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
            fetchDepartments();
            fetchItems()
        }
    }, [bearer]);



    const createRequisition = async () => {

        setCreateLoading(true);
        try {
            const quantities = formData.map((row) => row.qty).filter((id) => id !== undefined);
    const stocks = formData.map((row) => row.itemsDescription).filter((id) => id !== undefined);
    
            
            const response = await axios.post(
                'https://api-sme.promixaccounting.com/api/v1/stocks/submit-request',
                {
                    narration: narration,
                    total_quantity: totalQuantity,
                    department_id: department,
                    stock_name: stocks,
                    quantity: quantities,   
                },
                { headers }
            );
            console.log(response.data.message)
            setNarration("");
            setTotalQuantity("");
            setDepartment("");
            setFormData([]);
            navigate('/requisition');

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

    const calculateTotalQuantity = () => {
        const total = formData.reduce((total, row) => total + parseFloat(row.qty) || 0, 0);
        setTotalQuantity(total);
        // console.log(totalQuantity);
    };
    
    useEffect(() => {
        calculateTotalQuantity();
      }, [formData]);
    

    


    const handleItemDescriptionChange = (selectedValue, rowIndex) => {
      
        handleFormChange(selectedValue, "itemsDescription", rowIndex);
    };

  
    return (
        <div style={{ marginTop: '8rem', }}>
            <AdminHeaderNav />
            <div className='newBody'>
                <div className='newWidth'>
                    <div className="wrapper">
                        
                        <div className="content-wrapper">
                            <div className="main-content">
                                <div className="content-header row align-items-center m-0">

                                    <div className="col-sm-8 header-title p-0">
                                        <div className="media">
                                            <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                            <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                <div>
                                                    <h1 className="font-weight-bold">Create Requisition </h1>
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
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Department:</label>
                                                                        <div className="col-sm-9">
                                                                            <Form.Select name="customer" className="form-control" required="" value={department} onChange={handleDepartmentChange}>
                                                                                <option value="">Choose Department</option>
                                                                                {tableData.map((item) => (
                                                                                    <option key={item.id} value={item.id}>
                                                                                        {item.name}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Select>
                                                                        </div>
                                                                        <div style={{marginTop:'10px'}}/>
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Narration:</label>
                                                                        <div className="col-sm-9">
                                                                            <textarea rows="2" cols="50" className="form-control" value={narration} onChange={(e) => setNarration(e.target.value)}
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
                                                                                <th>Items Description</th>
                                                                                <th style={{width:'40%',}}>Quantity</th>
                                                                                <th ><Button variant="primary" onClick={() => addRow()}>
                                                                                    <i className="fas fa-plus"></i>

                                                                                </Button></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            {formData.map((row, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <Form.Select
                                                                                        style={{width:'100%',}}
                                                                                        className="form-control"
                                                                                        onChange={(e) => handleItemDescriptionChange(e.target.value, index)}
                                                                                      
                                                                                        >
                                                                                        <option value="" >Choose Description</option>
                                                                                        {tableData1.map((item) => (
                                                                                            <option key={item.id} value={item.id}>
                                                                                            {item.name}
                                                                                            </option>
                                                                                        ))}
                                                                                        </Form.Select>

                                                                                    </td>
                                                                                    <td>
                                                                                    <input
                    style={{ textAlign: "right" }}
                    type="text"
                    className="form-control"
                    value={row.qty}
                    onChange={(e) => handleFormChange(e.target.value, "qty", index)}
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
                                                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Total Quantity:</label>
                                                                    <div className="col-sm-4" style={{ padding: '0', maxWidth: '18.5%', }}>
                                                                        <input style={{textAlign: "right",}} className="form-control" type="number" value={totalQuantity} onChange={(e)=> setTotalQuantity(e.target.value)} disabled/>
                                                                        {/* <input style={{ textAlign: "right", }} className="form-control" required="" type="number" value={totalQuantity} onChange={(e)=> setTotalQuantity(e.target.value) }  name="total" readOnly /> */}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            

                                                            <div class="modal-footer">
                                                                <Button variant="success" onClick={createRequisition}>
                                                                    {createLoading ? (
                                                                        <>
                                                                            <Spinner size='sm' />
                                                                            <span style={{ marginLeft: '5px' }}>Creating your requisition, Please wait...</span>
                                                                        </>
                                                                    ) : (
                                                                        "Create your Requisition"
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

export default CreateRequisition