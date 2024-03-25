import React, { useState, useEffect, useRef  } from 'react';
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
import { Button, Spinner, Accordion, Badge } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import TableToPrint from './TableToPrint';
import { useReactToPrint } from 'react-to-print';

function EditUserss() {

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
    const customerLedgers = selectedCustomer.ledgers;

    useEffect(() => {
      if (selectedCustomer) {
        setName(selectedCustomer.name || '');
        setAddress(selectedCustomer.address || '');
        setPhone(selectedCustomer.phone || '');
        setEmail(selectedCustomer.email || '');
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

   
    function formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
      return formattedDate;
    }
  
    function padZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
   
   



 

     
    
    


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
                                                    <h1 className="font-weight-bold">View Customer/Employee/Member </h1>
                                                    <small> ....</small>
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
                                            <h5 style={{marginLeft: 20}}>Personal Details</h5>
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
                                                         
                                                            </div>
                                                            
                                                            <div style={{ marginTop: 30 }} />
                                                            {/* <h5 >Personal Ledger</h5> */}
                                                            <div className="row">
                                                                {/* <div className="col-md-6"> */}
                                                                <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>View Personal Ledger</Accordion.Header>
          <Accordion.Body>
            <div className="print-ledger" style={{ marginBottom: 10 }}>
              <Button variant='success' onClick={handlePrint}>Print Ledger</Button>
            </div>
            <TableToPrint ref={componentRef} customerLedgers={customerLedgers} formatDate={formatDate} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

                                                            </div>
                                                            

                                                            <div style={{justifyContent: "flex-start"}} class="modal-footer">
                                                            <Button style={{borderRadius: 0}} variant="success" onClick={updateBeneficiary}>
                    {load ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating records, Please wait...</span>
    </>
  ) : (
                "Update Customer/Employee/Member"
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

export default EditUserss;