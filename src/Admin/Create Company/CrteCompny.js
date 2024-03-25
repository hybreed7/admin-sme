import React, {useState, useEffect} from 'react'
import classes from './CrteCompny.module.css'
import { InfoFooter } from '../../InfoFooter'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CrteCompny = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [companyManager, setCompanyManager] = useState('');
    const [loading, setLoading] = useState(false);
    const [bearer, setBearer] = useState('');

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
    
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };
    
      useEffect(() => {
        readData();
      }, []);

    const isButtonDisabled = !companyEmail || !companyName || !companyAddress || !companyPhone;

    const handleCreate = async () => {
        setLoading(true);
    
        try {
            const accessToken = bearer;
    
            const response = await axios.post(
                'https://payroll.patna.ng/api/admin/company',
                {
                    company_name: companyName,
                    company_address: companyAddress,
                    company_email: companyEmail,
                    company_phone_number: companyPhone,
                    description: companyType,
                    manager_name: companyManager,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            navigate('/admin_onboarding');
    
            Swal.fire({
                icon: 'success',
                title: 'Successfull',
                text: response.data.message,
            });
    
            setCompanyName('');
            setCompanyEmail('');
            setCompanyPhone('');
            setCompanyAddress('');
            setCompanyType('');
            setCompanyManager('');
        } catch (error) {
            const errorStatus = error.response.data.message;
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response.data.message,
            });
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>

            <div>
                <div className={classes.headed}>
                    <div>
                        <p className={classes.ptag}>Add Company</p>
                        <div className={classes.sndptg}>
                            <p className={classes.adcmptag}>Add Company</p>
                            <div className={classes.thehr}><hr className={classes.goated}></hr> <hr className={classes.goat}></hr></div>
                        </div>
                    </div>
                </div>
                <div className={classes.compform}>
                    <div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Company Name</label>
                            <input className={classes.inputcmpname} placeholder='Enter company name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} type='name' ></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Company Type</label>
                            <input className={classes.inputcmpname} placeholder='e.g School, IT, e.t.c.' value={companyType} onChange={(e) => setCompanyType(e.target.value)} type='name' ></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Name of Manager</label>
                            <input className={classes.inputcmpname} placeholder='Enter name of manager' value={companyManager} onChange={(e) => setCompanyManager(e.target.value)} type='name' ></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Email Address</label>
                            <input className={classes.inputcmpname} placeholder='Enter your email address' value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} type='email'></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Phone Number</label>
                            <input className={classes.inputcmpname} placeholder='Enter phone number' value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} type='number' ></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Address</label>
                            <input className={classes.inputcmpname} placeholder='Enter your address' value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} type='address' ></input>
                        </div>
                        <button disabled={isButtonDisabled} onClick={handleCreate} className={classes.addcmpnybtn}>
                        {loading ? (
    <>
      <Spinner />
      <span style={{ marginLeft: '10px' }}>Creating your company, please wait...</span>
    </>
  ) : (
    "Create Company"
  )}

                        </button>
                    </div>

                </div>


            </div>
            <InfoFooter />

        </div>
    )
}

export default CrteCompny