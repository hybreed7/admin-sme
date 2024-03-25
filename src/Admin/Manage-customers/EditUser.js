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
import { Button, Spinner } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';

function EditUser() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState([{ bankName: '', accountName: '', accountNumber: ''}]);
    const location = useLocation();
    const { selectedCustomer } = location.state || {};

    useEffect(() => {
      if (selectedCustomer) {
        setName(selectedCustomer.name || '');
        setAddress(selectedCustomer.address || '');
        setPhone(selectedCustomer.phone_number || '');
        setEmail(selectedCustomer.email || '');
  
        if (selectedCustomer.banks && selectedCustomer.banks.length > 0) {
          // Pre-populate formData with bank details if available
          const banksData = selectedCustomer.banks.map(bank => ({
            bankName: bank.bank_name || '',
            accountName: bank.account_name || '',
            accountNumber: bank.bank_account || '',
          }));
          setFormData(banksData);
        }
      }
    }, [selectedCustomer]);


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
          bankName: '', 
          accountName: '', 
          accountNumber: '', 
        };
        setFormData([...formData, newRow]);
    };

    const deleteRow = (index) => {
        const updatedData = formData.filter((_, i) => i !== index);
        setFormData(updatedData);
    };

    const handleFormChange = (index, field, value) => {
      const updatedFormData = [...formData];
      updatedFormData[index][field] = value;
      setFormData(updatedFormData);
    };
    
    const updateBeneficiary = async () => {

      setLoad(true);
      try {
        const bankAccounts = formData.map(item => item.accountNumber);
        const accountNames = formData.map(item => item.accountName);
        const bankNames = formData.map(item => item.bankName);

        const response = await axios.post(
          'https://api-sme.promixaccounting.com/api/v1/beneficiaryaccounts/update',
          {
            name: name,
            email: email,
            phone_number: phone,
            address: address,
            bank_account: bankAccounts,
            account_name: accountNames,
            bank_name: bankNames,
            id: selectedCustomer.id
           
          },
          { headers }
        );
        console.log(response.data.message)
        navigate('/suppliers')  
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

                                    <div className="col-sm-8 header-title p-0">
                                        <div className="media">
                                            <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
                                            <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                <div>
                                                    <h1 className="font-weight-bold">Update Beneficiary </h1>
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
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Name</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Email</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="name" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Phone Number</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="name" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Address</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="name" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            {/* <div className="col-md-6">
                                                                    <div className="form-group row">
                                                                        <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Office Address</label>
                                                                        <div className="col-sm-9">
                                                                            <input className="form-control" required="" type="text" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} name="name" />
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                 
                                  
                                  

                                  

                                  
                                                                      
                                                                

                                                                
                                                                
                                                                
                                                                
                                                                
                                                                




                                                            </div>
                                                            
                                                            <div style={{ marginTop: 20 }} />
                                                            <h5 style={{textAlign: "center"}}>Add Bank Accounts</h5>
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <div className="table-responsive">
                                                                    <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                                                        <thead style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            <tr>
                                                                                <th style={{width: "40%"}}>Bank Name</th>
                                                                                <th style={{width: "40%"}}>Account Name</th>
                                                                                <th>Account Number</th>
                                                                                <th ><Button variant="primary" onClick={() => addRow()}>
                                                                                    <i className="fas fa-plus"></i>

                                                                                </Button></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ whiteSpace: "nowrap", textAlign: "center", alignItems: "center" }}>
                                                                            {formData.map((row, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                    <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.bankName}
                                                                                            onChange={(e) => handleFormChange(index, 'bankName', e.target.value)}
                                                                                            
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.accountName}
                                                                                            onChange={(e) => handleFormChange(index, 'accountName', e.target.value)}
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            value={row.accountNumber}
                                                                                            onChange={(e) => handleFormChange(index, 'accountNumber', e.target.value)}
                                                                                            
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
                                                            

                                                            <div class="modal-footer">
                                                            <Button variant="success" onClick={updateBeneficiary}>
                    {load ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating records, Please wait...</span>
    </>
  ) : (
                "Update Beneficiary"
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

export default EditUser