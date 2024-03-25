import React, {useState, useEffect} from 'react';
import classes from '../../Admin/Payslip/Payslip.module.css';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Logo from '../../Images/brookes.png';
import Avater from '../../Images/avatar33.png';

function Payslip() {
  const [totalDeduction, setTotalDeduction] = useState('');
  const [payslipMonthYear, setPayslipMonthYear] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [gender, setGender] = useState('');
  const [grade1, setGrade1] = useState('');
  const [steps, setSteps] = useState('');
  const [level1, setLevel1] = useState('');
  const [basic, setBasic] = useState('');
  const [gross, setGross] = useState('');
  const [net, setNet] = useState('');
  const [bankName, setBankName] = useState('');
  const [filteredAllowances, setFilteredAllowances] = useState([]);
  const [filteredDeductions, setFilteredDeductions] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const location = useLocation();

  const handlePrint = () => {
    window.print();
  };

 
  useEffect(() => {
    const selectedItem = location.state;

    if (selectedItem) {
     
      const month = selectedItem.month;
      const year = selectedItem.year;
      const monthlyBasic = selectedItem.monthly_basic || 0;
      setBasic(monthlyBasic);

      const grossPay = selectedItem.gross_pay || 0;
      setGross(grossPay);

      const netPay = selectedItem.net_pay || 0;
      setNet(netPay);

      const totalDeduct = selectedItem.total_deduction || 0;
      setTotalDeduction(totalDeduct);


      setPayslipMonthYear(`${month} - ${year}`);

      setEmployeeName(selectedItem.staff_name);
      setEmployeeNumber(selectedItem.staff_number);
      setGender(selectedItem.staff?.gender);
      setGrade1(selectedItem.staff?.grade);
      setSteps(selectedItem.staff?.step);
      setLevel1(selectedItem.staff?.level);
      setBankName(selectedItem.staff?.account_bank);
      setAccountNumber(selectedItem.staff?.account_number);


      const filteredAllowances = Object.entries(selectedItem)
      .filter(([key, value]) => key.endsWith('allowance') && key !== 'total_allowance' && value > 0)
      .map(([key, value]) => ({ name: key, value }));

    setFilteredAllowances(filteredAllowances);

    const filteredDeductions = Object.entries(selectedItem)
      .filter(([key, value]) => key.endsWith('deduction') && key !== 'total_deduction' && value > 0)
      .map(([key, value]) => ({ name: key, value }));

    setFilteredDeductions(filteredDeductions);

    const totalDeductionValue = filteredDeductions.reduce((total, deduction) => total + deduction.value, 0);
    setTotalDeduction(totalDeductionValue);
      
    } else {
      console.error('No selected item data found in location state.');
    }
  }, [location.state]);

  
  return (
    <div className={classes.body}>
      <div className={classes.a4}>
        <div className={classes.header}>
          <div className={classes.logocont}>
            <img src={Logo} alt='logo' className={classes.logo}/>
          </div>
          <h3> BROOKES PROFESSIONAL SERVICE LIMITED </h3>
          <p>EMPLOYEE PAYSLIP</p>
          <span>{payslipMonthYear}</span>
          <div className={classes.passport}>
            <img src={Avater} alt='user passport'/>
          </div>
        </div> 
        <div className={classes.container}>
          <div className={classes.card1}>
            <div className={classes.step1}>
              <span>
                <label>Employee Name:</label>
                <value className={classes.bold}>{employeeName}</value>
              </span>
              <span>
                <label>Employee Number:</label>
                <value className={classes.bold}>{employeeNumber}</value>
              </span>
              <span>
                <label>Gender:</label>
                <value>{gender}</value>
              </span>
            </div>
          </div>
          <div className={classes.card2}>
            <span>
              <label>Grade:</label>
              <value>{grade1}</value>
            </span>
            <span>
              <label>Step:</label>
              <value>{steps}</value>
            </span>
            <span>
              <label>Level:</label>
              <value>{level1}</value>
            </span>
          </div>
        </div>
        <div className={classes.bold}>Bank Information Details</div>
        <div className={classes.container2}>
          <div className={classes.card1}>
            <div className={classes.step1}>
              <span>
                <label>Bank Name:</label>
                <value>{bankName}</value>
              </span>
              <span>
                <label>Account Num:</label>
                <value>{accountNumber}</value>
              </span>
          
            </div>
          </div>
          
        </div>
        <div className={classes.tableSection}>
          <div>
            <h4>Gross Earning Information</h4>
            <table>
              <tr>
                <th>Earnings</th>
                <th></th>
                <th style={{textAlign:'right',}}>Amount</th>
              </tr>
              <tr>
                <td>Basic Salary</td>
                <td></td>
                <td>{parseFloat(basic).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}</td>
              </tr>
              {filteredAllowances.map((allowance, index) => (
            <tr key={index}>
              <td>{allowance.name}</td>
              <td></td>
              <td>{parseFloat(allowance.value).toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
              <tr>
                <td></td>
                <td className={classes.bold} style={{textAlign:'center',}}> Total </td>
                <td className={classes.bold}>{parseFloat(gross).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}</td>
              </tr>
            </table>  
          </div>
          <div>
            <h4>Gross Deduction Information</h4>
            <table>
              <tr>
                <th>Deductions</th>
                <th></th>
                <th style={{textAlign:'right',}}>Amount</th>
              </tr>
              {filteredDeductions.map((deduction, index) => (
            <tr key={index}>
              <td>{deduction.name}</td>
              <td></td>
              <td>{parseFloat(deduction.value).toLocaleString('en-US', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
              <tr>
                <td></td>
                <td className={classes.bold} style={{textAlign:'center',}}> Total </td>
                <td className={classes.bold}>{parseFloat(totalDeduction).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}</td>
              </tr>
            </table>  
          </div>
        </div>
        <div className={classes.summaryContainer}>
          <div className={classes.summary}>
            <h6 className={classes.underline} style={{marginBottom:'20px',}}>Summary of Payments</h6>
            <div className={classes.mainSummary}>
              <div>
                <h6> Total Gross Earning:</h6>
                <span>{parseFloat(gross).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}</span>
              </div>
              <div >
                <h6 className={classes.underRule}> Total Gross Deduction:</h6>
                <span>{parseFloat(totalDeduction).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}</span>
              </div>
              <div>
                <h6> Total Net Pay:</h6>
                <span className={classes.topRule}>{parseFloat(net).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}</span>
              </div>
            </div>
          </div>

        </div>
        <Button id='print-slip' variant='success' onClick={handlePrint}>Print slip</Button>
      </div>
      
    </div>
  )
}

export default Payslip