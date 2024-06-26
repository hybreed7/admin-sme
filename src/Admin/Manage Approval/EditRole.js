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
import { Button, Spinner, Form } from 'react-bootstrap';
import favicon from '../../Images/faviconn.png'
import CurrencyInput from 'react-currency-input-field';
import ToggleSlider from './ToggleSlider';

function EditRole() {

 
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [toggleStates, setToggleStates] = useState({});
  const [toggleStates1, setToggleStates1] = useState({});
  const [perm, setPerm] = useState([]);
  const [permId, setPermId] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [role1, setRole1] = useState("");
  const [eyeClicked, setEyeClicked] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const location = useLocation();
  const { selectedPermission, selectedRoles } = location.state || {};
  const [role, setRole] = useState(selectedRoles.name);
// console.log(selectedPermission, selectedRoles);

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


  const fetchPermission = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/role/permissions', { headers });
      const data = response.data?.data;
      const permissionId = data.map(item => item.id);
      setPermId(permissionId);
    
      // Move the logic for setting initial toggle states here
      const initialToggleStates = Object.fromEntries(
        data.map((permission) => [
          permission.id,
          selectedPermission?.includes(permission.id),
        ])
      );
      // console.log(initialToggleStates, "neww");
      setPermissions(data);
      setToggleStates(initialToggleStates);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.error(errorStatus);
      setPermissions([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // console.log(toggleStates, "ffff");
  useEffect(() => {
    if (bearer) {
      fetchPermission();
    }
  }, [bearer]);

  

  const handleToggleChange = (itemId) => {
    setToggleStates(prevToggleStates => ({
      ...prevToggleStates,
      [itemId]: !prevToggleStates[itemId],
    }));
  };

  const handleCheckAllToggle = () => {
    const checkAllValue = !checkAll;
    setCheckAll(checkAllValue);

    // Set all toggle states to the determined value
    const updatedToggleStates = Object.fromEntries(permId.map(id => [id, checkAllValue]));
    setToggleStates(updatedToggleStates);
  };

  const handleToggleChange1 = (itemId) => {
    setToggleStates1((prevToggleStates) => ({
      ...prevToggleStates,
      [itemId]: !prevToggleStates[itemId],
    }));
  };


 
 

  const goBack = () => {
    navigate(-1);
  }

  

  const createRole = async () => {
    setRoleLoading(true);
    const selectedToggle = Object.entries(toggleStates)
      .filter(([_, value]) => value)
      .map(([key, _]) => parseInt(key));

      // console.log(role, selectedToggle, selectedRoles.id, "here");
    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/role/update',
        {
          name: role,
          permission: selectedToggle,
          role_id: selectedRoles.id,
        },
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        }}
      );
  
      navigate('/role');
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
    } catch (error) {
      const errorStatus = error.response?.data?.message || 'An error occurred';
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.error(error);
    } finally {
      setRoleLoading(false);
    }
  };
  

  





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
                          <h1 className="font-weight-bold">Create New Role </h1>
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
                                    <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Role Name</label>
                                    <div className="col-sm-9">
                                      <input className="form-control" required="" type="text" value={role}  onChange={(e) => setRole(e.target.value)} placeholder="Enter Role name" name="role" />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='modal-footer' style={{ marginTop: 20 }} />
                              <div style={{ display: "flex", gap: 5 }}>
                    <ToggleSlider checked={checkAll} onChange={handleCheckAllToggle} />
                    <p>Check All</p>
                  </div>

                  <div className='modal-footer' style={{ marginTop: 20 }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: "center", justifyContent: "center" }}>
                  {isLoading ? (
        <>
        <Spinner size='sm' animation="border" role="status" />
          
        </>
  ) : (
    <>
      {permissions.map((item, index) => (
        <div
          key={index}
          style={{
            width: '150px',
            height: '150px',
            margin: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
            boxSizing: 'border-box', // Include padding and border in the width
            marginBottom: 20
          }}
        >
          <p style={{ fontSize: 13.5, margin: '5px 0', textAlign: "center" }}>{item.name}</p>
          <ToggleSlider
            checked={toggleStates[item.id]}
            onChange={() => handleToggleChange(item.id)}
          />
        </div>
      ))}
    </>
  )}
</div>



                              <div style={{justifyContent: "flex-start"}} className="modal-footer">
                                <Button style={{borderRadius: 0}} variant="success" onClick={createRole}>
                                  {roleLoading ? (
                                    <>
                                      <Spinner size='sm' />
                                      <span style={{ marginLeft: '5px' }}>Updating your role, Please wait...</span>
                                    </>
                                  ) : (
                                    "Update your Role"
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

export default EditRole;