import React, {useState, useEffect} from 'react'
import { AdminHeaderNav } from '../AdminHeaderNav'
import chart1 from '../../smeImgs/chart1.svg';
import chart2 from '../../smeImgs/chart2.svg';
import chart3 from '../../smeImgs/chart3.svg';
import SubIcon1 from '../../smeImgs/SubIcon1.svg';
import SubIcon2 from '../../smeImgs/SubIcon2.svg';
import SubIcon3 from '../../smeImgs/SubIcon3.svg';
import SubIcon4 from '../../smeImgs/SubIcon4.svg';
import classes from '../../Admin/AdminHome/AdminHome.module.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Chart } from "react-google-charts";
import { Form } from 'react-bootstrap';

export default function AdminHome() {
    const [user, setUser] = useState('');
    const [bearer, setBearer] = useState('');

    const readData = async () => {
        try {
          const detail = await AsyncStorage.getItem('tobi');
          const details = await AsyncStorage.getItem('userToken');
    
          if (detail !== null) {
            setUser(detail);
          }
    
    
          if (details !== null) {
            setBearer(details);
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };
    
      useEffect(() => {
        readData();
      }, []);

  return (
    <div style={{ marginTop: '10rem', }}>
        <AdminHeaderNav/>
        <div className={classes.adminbody}>
        <div className="media-body">
                        <h1 className={classes.label}> Welcome, {user} </h1>
                        {/* <small>From now on you will start your activities.</small> */}
                      </div> 
            <div className={classes.homecontents}>
                <div className={classes.gridBoxs}>
                    <img src={chart1} alt='chart'/>
                </div>
                <div className={`${classes.gridBoxs} ${classes.gridSubgrid}`}>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon1} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Registrations</small>
                        <h1>25,057</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon2} alt='Icon'className={classes.img}/>
                        </div>
                        <small>Total number of Completed Registrations</small>
                        <h1>25,057</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon3} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Applications</small>
                        <h1>25,057</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon4} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Approved Applications</small>
                        <h1>25,057</h1>
                    </div>
                </div>
                <div className={classes.gridBoxs}>
                    <img src={chart2} alt='chart'/>
                </div>
                <div className={classes.gridBoxs} style={{padding:'26px'}}>
                    <div className={classes.head}>
                        <h5>Applications Summary</h5>
                        <Form.Select
                        style={{width: "25%"}}
        className="form-control"
        as="select"
        // value={selectedRole1}
        // onChange={handleRoleChange1}
      >
        <option value="this_month">This month</option>
        <option value="this_week">This week</option>
        <option value="this_week">Today</option>
        
        
      </Form.Select>
                        {/* <button >This month <i class='bx bx-chevron-down'></i></button> */}
                    </div>
                    <div className={classes.flexChart}>
                        <div className={classes.content}>
                            <div className={classes.contDetails}>
                                <small>Total number of Loan Applications</small>
                                <h2>564</h2>
                            </div>
                            <div className={classes.contDetails}>
                                <small>Total amount of expected loan repayment</small>
                                <h2>12,067,950</h2>
                            </div>
                            <div className={classes.contDetails}>
                                <small>Total amount of loan repayment made</small>
                                <h2>7,360,050</h2>
                            </div>
                        </div>
                        <div className={classes.flexChart}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}
