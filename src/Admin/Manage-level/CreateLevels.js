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
import { Button, Spinner, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function CreateLevels() {

  const [selectedModule, setSelectedModule] = useState('');
  const [bearer, setBearer] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const navigate = useNavigate();
  const [roleLoading, setRoleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState([{ role: '' }]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [permittedHeaders, setPermittedHeaders] = useState([]);

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

  useEffect(() => {
    const retrieveAdminStatus = async () => {
      try {
        const permitted = await AsyncStorage.getItem('permissions');
        if (permitted) {
          setPermittedHeaders(permitted);
        }
        const adminStatus = await AsyncStorage.getItem('admin');
          setIsAdmin(adminStatus === 'true');
     
        
  
        
      } catch (error) {
        console.error('Error retrieving admin status:', error);
      }
    };

    retrieveAdminStatus();
  }, []);


  const fetchRole = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api-smesupport.ogunstate.gov.ng/api/role/get-roles', { headers });
      const results = response.data?.data;
      // console.log(results);
      setTableData(results);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchModule = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-smesupport.ogunstate.gov.ng/api/module', { headers });
      const moduleData = response.data?.data;
      console.log(moduleData);
      setTableData1(moduleData);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setTableData1([]);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    if (bearer) {
      fetchRole();
      fetchModule();
    }
  }, [bearer]);



  const goBack = () => {
    navigate(-1);
  }


  const handleRoleChange = (index, event) => {
    const newFormFields = [...formFields];
    newFormFields[index].role = event.target.value;
    setFormFields(newFormFields);
  };

  const addNewField = () => {
    setFormFields([...formFields, { role: '' }]);
  };

  const removeField = (index) => {
    const newFormFields = [...formFields];
    newFormFields.splice(index, 1);
    setFormFields(newFormFields);
  };

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
};

const createApproval = async () => {
  setRoleLoading(true);
  try {
    const response = await axios.post(
      'https://api-smesupport.ogunstate.gov.ng/api/approval_level/create_app',
      {
        module: selectedModule,
        roles: formFields.map((field) => field.role),
      },
      { headers }
    );
    // Handle success response
    // console.log(response.data);
    toast.success(response.data.message);

    navigate('/approval_level');

    setSelectedModule("");
  } catch (error) {
    // Handle error response
    const errorStatus = error.response?.data?.message;
    console.log(errorStatus);
    toast.error(error.response)
  } finally {
    setRoleLoading(false);
  }
};





  return (
    <div style={{ marginTop: '12rem', }}>
      <AdminHeaderNav />
      <div className='newBody'>
        <div className='newWidth'>
          <div className="wrapper">
            {/* <!-- Sidebar  --> */}

            <ToastContainer/>
            {/* <!-- Page Content  --> */}
            <div className="content-wrapper">



              <div className="main-content">


                <div className="content-header row align-items-center m-0">

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      {/* <div className="header-icon text-success mr-3"><i className=""><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div> */}
                      <div className="media-body" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h1 className="font-weight-bold">Set New Approval Level </h1>
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Module</label>
                                    <div className="col-sm-9">
                                      <Form.Select className="form-control"
                                        as="select"
                                        value={selectedModule}
                                        onChange={handleModuleChange}
                                      >
                                        <option value="" disabled>Select Module</option>
                                        {tableData1.map((item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </Form.Select>
                                    </div>
                                  </div>
                                </div>

                                <div className="modal-footer" />

                                <div className="col-md-6">
                                {formFields.map((field, index) => (
  <div key={index} className="form-group row">
    <label className="col-sm-3 col-form-label font-weight-400">Role</label>
    <div className="col-sm-6">
      <Form.Select
        className="form-control"
        as="select"
        value={field.role}
        onChange={(e) => handleRoleChange(index, e)}
      >
        <option value="" disabled>Select Role</option>
        {tableData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
    </div>
    <div className="col-sm-3">
      <Button variant="danger" onClick={() => removeField(index)}> <i className="far fa-trash-alt"></i></Button>
    </div>
  </div>
))}

  <Button variant="primary" onClick={() =>addNewField()}><i className="fas fa-plus"></i></Button>
</div>


                          </div>



                          <div style={{ justifyContent: "flex-start" }} className="modal-footer">
                            <Button style={{ borderRadius: 0 }} variant="success" onClick={createApproval}>
                              {roleLoading ? (
                                <>
                                  <Spinner size='sm' />
                                  <span style={{ marginLeft: '5px' }}>Processing role, Please wait...</span>
                                </>
                              ) : (
                                "Create your Approval"
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
      </div >
    <InfoFooter />
    </div >
  )
}

export default CreateLevels;