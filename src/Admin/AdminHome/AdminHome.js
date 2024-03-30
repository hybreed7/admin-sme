import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { AdminHeaderNav } from '../AdminHeaderNav'
import { NavLink, useNavigate } from 'react-router-dom';
import chart1 from '../../smeImgs/chart1.svg';
import chart2 from '../../smeImgs/chart2.svg';
import chart3 from '../../smeImgs/chart3.svg';
import SubIcon1 from '../../smeImgs/SubIcon1.svg';
import SubIcon2 from '../../smeImgs/SubIcon2.svg';
import SubIcon3 from '../../smeImgs/SubIcon3.svg';
import SubIcon4 from '../../smeImgs/SubIcon4.svg';
import classes from '../../Admin/AdminHome/AdminHome.module.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Form } from 'react-bootstrap';
import { Chart } from "react-google-charts";

export default function AdminHome() {
    const navigate = useNavigate()
    const [user, setUser] = useState('');
    const [bearer, setBearer] = useState('');
    const [datasLoading, setDatasLoading] = useState(false)
    // const [applications, setApplications] = useState([]);
    const [registrationData, setRegistrationData] = useState([]);
    const [applications, setApplications] = useState('');

    const fetchApplications = async () => {
        setDatasLoading(true);
        try {
          const response = await axios.get('https://api-smesupport.ogunstate.gov.ng/api/application-count', { headers });
          if (response.status === 200) {
            const fetchedApplication = response.data?.data;
            // Extract the values from the fetched data
            const totalApplicants = fetchedApplication.find(item => item.total_applicants)?.total_applicants || 0;
            const totalApplications = fetchedApplication.find(item => item.total_applications)?.total_applications || 0;
            const totalCompletedRegistrations = fetchedApplication.find(item => item.total_completed_registrations)?.total_completed_registrations || 0;
            const totalApprovedApplications = fetchedApplication.find(item => item.total_approved_applications)?.total_approved_applications || 0;
            // const totalLoanApplications = fetchedApplication.find(item => item.total_approved_applications)?.total_approved_applications || 0;
            const totalExpectedLoansRepayment = fetchedApplication.find(item => item.total_amount_of_expected_loan_repayment)?.total_amount_of_expected_loan_repayment || 0;
            const totalLoansRepaymentMade = fetchedApplication.find(item => item.total_amount_of_loan_repayment_made)?.total_amount_of_loan_repayment_made || 0;
            const monthlyLoanApp = fetchedApplication.find(item => item.monthly_loan_applications)?.monthly_loan_applications || 0;
            // Update the applications state
            setApplications({
                totalApplicants,
                totalApplications,
                totalCompletedRegistrations,
                totalApprovedApplications,
                totalExpectedLoansRepayment,
                totalLoansRepaymentMade,
                monthlyLoanApp,
                // totalExpectedLoansRepayment,
                // dailyLoanApplications, // These values are not available from the API response
                // weeklyLoanApplications,
                // monthlyLoanApplications,
            }); 
            // const fetchedApplication = response.data?.data;
            // setApplications(fetchedApplication);
            // setApplications({
            //     totalApplicants: data.find(item => item.total_applicants)?.total_applicants || 0,
            //     totalApplications: data.find(item => item.total_applications)?.total_applications || 0,
            //     totalCompletedRegistrations: data.find(item => item.total_completed_registrations)?.total_completed_registrations || 0,
            //     totalApprovedApplications: data.find(item => item.total_approved_applications)?.total_approved_applications || 0,
            // });
            console.log(fetchedApplication[0]['total_applicants'])
        } else {
            throw new Error('Failed to fetch applications');
        }
      
        } catch (error) {
          if (error.response && error.response.status === 401) {
            
            navigate('/login');
          } else {
          const errorStatus = error.response?.data?.message;
          console.log(errorStatus);
          setApplications([]);
        }
        } finally {
            setDatasLoading(false);
        }
      };
    
      useEffect(() => {
        if (bearer) {
          fetchApplications();
            
        }
      }, [bearer]);
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
      };
    
    
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

      const data = [
        ["Task", "Hours per Day"],
        // ["Work", 11],
        // ["Eat", 2],
        // ["Commute", 2],
        ["Watch TV", 55],
        ["Sleep", 45], // CSS-style declaration
      ];

       const options = {
        // title: "Loan Repayment",
        pieHole: 0.5,
        is3D: false,
        colors: ['#2D995F', 'gray'], // Add your desired colors here
      };

      const data1 = [
        ["Day", "Cups"],
        ["Mon", 165],
        ["Tue", 135],
        ["Wed", 157],
        ["Thu", 139],
        ["Fri", 136],
        ["Sat", 136],
        ["Sun", 136],
      ];

        const options1 = {
            // title: "Loan disbursement",
            // vAxis: { title: "Cups" },
            // hAxis: { title: "Day" },
            legend: { position: "none" }, // Optionally, hide the legend
            colors:['#2D995F'],

            // vAxis: {
            //     ticks: ['2m', '4m', '6m', '8m', '10m', '12m'],
            //   },
            //   colors: ['green', 'Yellow', 'green', 'green', 'green', 'green', 'red',], // Specify colors for bars
          };

  return (
    <div style={{ marginTop: '10rem', }}>
        <AdminHeaderNav/>
        <div className={classes.adminbody}>
        <div className="media-body">
                        <h1 className={classes.label}> Welcome, {user} </h1>
                        {/* <small>From now on you will start your activities.</small> */}
                      </div> 
            <div className={classes.homecontents}>
                <div className={`${classes.gridBoxs} ${classes.chartCont1}`}>
                    <div className={classes.head} style={{margin:'0'}}>
                        <h5>Loan disbursement</h5>
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
                    
                    <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="300px"
                    data={data1}
                    options={options1}
                    />
                    {/* <img src={chart1} alt='chart'/> */}
                </div>
                <div className={`${classes.gridBoxs} ${classes.gridSubgrid}`}>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon1} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Registrations</small>
                        <h1>{applications.totalApplicants}</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon2} alt='Icon'className={classes.img}/>
                        </div>
                        <small>Total number of Completed Registrations</small>
                        <h1>{applications.totalCompletedRegistrations}</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon3} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Applications</small>
                        <h1>{applications.totalApplications}</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon4} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Approved Applications</small>
                        <h1>{applications.totalApprovedApplications}</h1>
                    </div>
                </div>
                <div className={`${classes.gridBoxs} ${classes.chartCont1}`}>
                    <div className={classes.head} style={{margin:'0'}}>
                        <h5>Loan disbursement</h5>
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
                    
                    <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="300px"
                    data={data1}
                    options={options1}
                    />
                    {/* <img src={chart1} alt='chart'/> */}
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
                                <h2>{applications.monthlyLoanApp}</h2>
                            </div>
                            <div className={classes.contDetails}>
                                <small>Total amount of expected loan repayment</small>
                                <h2>{applications.totalExpectedLoansRepayment}</h2>
                            </div>
                            <div className={classes.contDetails}>
                                <small>Total amount of loan repayment</small>
                                <h2>{applications.totalLoansRepaymentMade}</h2>
                            </div>
                        </div>
                        <div className={classes.flexChart}>
                            <Chart
                            chartType="PieChart"
                            width="100%"
                            // height="400px"
                            data={data}
                            options={options}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}