import React, { useState, useEffect } from 'react';
import classes from './Admin.module.css'
import brookescompimg from '../../Images/comp-brookes.png'
import probuscompimg from '../../Images/comp-probus.png'
import decagoncompimg from '../../Images/comp-decagon.png'
import Atcompimg from '../../Images/comp-At.png'
import Afriqcompimg from '../../Images/comp-afriq.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Modal, Form, Spinner } from 'react-bootstrap'
import Newpofile from '../../Images/avatar33.png';
import Verified from '../../Images/Verified tick.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Swal from 'sweetalert2';


function AdminOnb() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [bearer, setBearer] = useState('');
  const [name, setName] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState([]);
  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

const readData = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    const value1 = await AsyncStorage.getItem('userName');
    const value2 = await AsyncStorage.getItem('userEmail');
    const value3 = await AsyncStorage.getItem('userPhone');

    if (value !== null) {
      setBearer(value);
      // setAuthenticated(true);
    }
    if (value1 !== null) {
      setName(value1);
    }
    if (value2 !== null) {
      setEmail(value2);
    }
    if (value3 !== null) {
      setPhone(value3);
    }
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};

useEffect(() => {
  readData();
}, []);


  const navAdmin = () => {
    navigate('/admin')
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

useEffect(() => {
  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://payroll.patna.ng/api/admin/company`, { headers });
      const result = response.data?.data?.companies;
      setCompany(result);

    } catch (error) {
      const errorStatus = error.response.data.message;
        console.error(errorStatus);
    } finally {
      setLoading(false);
    }
  };

  if (bearer) {
    setLoading(true);
    fetchCompany();
  }
}, [bearer]);



  return (
    <div className={classes.Onboard}>
      <div className={classes.TopHeader}>
        <div className={classes.clientDetails}>
          <div className={classes.clientInfo}>
            <h5>{name}</h5>
            <span>  
              <p>{email}</p>
              <p>{phone}</p>
            </span>
            
            <input type="file" onChange={handleChange} style={{marginTop: 10}}/>
            {/* <button><i class='bx bx-image-add'></i> Change Photo</button> */}
          </div>
          <div className={classes.clientPicsCont}>
            <div className={classes.clientPics}>
              <img src={file}  style={{ height: 120, width: 120, borderRadius: '50%' }} alt='img'/>
            </div>
            <img src={Verified}  className={classes.verified} alt='verified'/>
          </div>
        </div>
        <div className={classes.crteCmpny}>
          <NavLink to={'/create_company'}>   <button className={classes.crtebtn}>Create New Company</button></NavLink>
        </div>
      </div>
      <div className={classes.plsntrs}>
        <div>
          <p className={classes.wlcptag}>List of company</p>
          {/* <p className={classes.subwlcptag}>Select a company to continue...</p> */}
        </div>
 


      </div>
      <div className={classes.CompanyCards}>
        <div className={classes.firstcompanycard}>
        {loading && <Spinner animation="border" variant="success" />}
          {!loading && company.map((companyData, index) => (
            <div key={index}>
              <div onClick={navAdmin} className={classes.firstCC}>
                <div className={classes.brkad}>
                  <p className={classes.brptag}>{companyData.company_name}</p>
                  <img src={brookescompimg} className={classes.comimg} alt="icon" />
                </div>
              </div>
            </div>
          ))}
          {/* <div onClick={navAdmin} className={classes.firstCC}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Brookes Software</p>
              <img src={brookescompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
          <div onClick={navAdmin} className={classes.secondCC}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Probus Innovations</p>
              <img src={probuscompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
          <div onClick={navAdmin} className={classes.thirdCC}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Decagon Incorporation</p>
              <img src={decagoncompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
          <div onClick={navAdmin} className={classes.secondCC2b}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Probus Innovations</p>
              <img src={Atcompimg} className={classes.comimg} alt="icon" />
            </div>
          </div> */}
        </div>

        {/* <div onClick={navAdmin} className={classes.secondcompanycard}>
          <div className={classes.firstCC2}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>At innovations</p>
              <img src={probuscompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
          <div onClick={navAdmin} className={classes.secondCC2}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Probus Innovations</p>
              <img src={Atcompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
          <div onClick={navAdmin} className={classes.firstCC}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Brookes Software</p>
              <img src={brookescompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
          <div onClick={navAdmin} className={classes.thirdCC2}>
            <div className={classes.brkad}>
              <p className={classes.brptag}>Afriq International</p>
              <img src={Afriqcompimg} className={classes.comimg} alt="icon" />
            </div>
          </div>
        </div> */}
        </div>
    </div>
  )
}

export default AdminOnb