import React, { useState, useEffect } from 'react';
import classes from '../../Admin/Income & expend/IncomeProcess.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { useLocation } from 'react-router-dom';

export default function IncomeProcess() {
    const [bearer, setBearer] = useState('');
    const [company, setCompany] = useState('');
    const location = useLocation();
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [totalDebit, setTotalDebit] = useState('');
    const [totalCredit, setTotalCredit] = useState('');

    useEffect(() => {
        const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);
    
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = addLeadingZero(currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();
        const minutes = addLeadingZero(currentDate.getMinutes());
        const hours = addLeadingZero(currentDate.getHours() % 12 || 12);
        const seconds = addLeadingZero(currentDate.getSeconds());
        const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
    
        const formattedDateTime = `Date Time ${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
        setCurrentDateTime(formattedDateTime);
      }, []);

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value1 = await AsyncStorage.getItem('companyName');
    
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
          }
          if (value1 !== null) {
            setCompany(value1);
         
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };

      useEffect(() => {
        readData();

    }, []);

    const { accounts, inputss } = location.state || {};
    const startDate = new Date(accounts.start);
    const endDate = new Date(accounts.end);

    const getOrdinalSuffix = (number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = number % 100;
        return v >= 11 && v <= 13
          ? 'th'
          : suffixes[v % 10] || 'th';
      };

      const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
    
        return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
      };


      useEffect(() => {
        if (inputss) {
            const creditTotal = inputss
                .filter((item) => !isNaN(item.nCredit) && item.nCredit !== "")
                .reduce((total, item) => total + parseFloat(item.nCredit), 0);
    
            const debitTotal = inputss
                .filter((item) => !isNaN(item.nDebit) && item.nDebit !== "")
                .reduce((total, item) => total + parseFloat(item.nDebit), 0);
    
            // Format the numbers with commas and two decimal places
            const formattedDebitTotal = debitTotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
    
            const formattedCreditTotal = creditTotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
    
            setTotalDebit(formattedDebitTotal);
            setTotalCredit(formattedCreditTotal);
        }
    }, [inputss]);
    
      

  return (
    <div className={classes.generalbd}>
        <div className={classes.a4}>
            <div className={classes.header}>
                <p style={{width: "100%", fontSize: 18}}>{company}</p>
                <h6>INCOME & EXPENDITURE REPORT BETWEEN {formatDate(startDate)}  AND {formatDate(endDate)} </h6>
            </div>
            <p>{currentDateTime} </p>
            <table className={classes.table}>
            <thead>
  <tr>
    <th style={{ textAlign: 'left', width: '200px' }}>Account Code</th>
    <th style={{ textAlign: 'left', width: '500px' }}>Account Name</th>
    <th style={{ textAlign: 'left', width: '150px' }}>Type</th>
    {/* <th></th> Empty cell for gap */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Debit</th> */}
    {/* <th></th> Empty cell for gap */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Credit</th> */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Debit</th> */}
    {/* <th></th> Empty cell for gap */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Credit</th> */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Debit</th> */}
    {/* <th></th> Empty cell for gap */}
    <th style={{ textAlign: 'right', width: '250px' }}>Amount</th>
  </tr>
</thead>


  <tbody>
  <tr>
      <td style={{fontWeight: "bold"}}>INCOME</td>
      <td colSpan="3"></td>
    </tr>
    
    {inputss && inputss.map((item, index) => (
      item.type === 1 && (
        <tr key={index}>
          <td>{item.account_code}</td>
          <td style={{ whiteSpace: "nowrap" }}>{item.account_name}</td>
          <td>{item.type === 1 ? "DR" : "CR"}</td>
          <td style={{ textAlign: "right" }}>{parseFloat(item.amount).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
})}</td>
        </tr>
      )
    ))}
    <tr>
    <td colSpan="9" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
    <tr>
                    <td colSpan="3">Total Income</td>
                    <td  style={{ textAlign: "right", fontWeight: "bold" }}>{parseFloat(accounts.totalIncome).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
})}</td>
                  </tr>
                  <tr>
    <td colSpan="9" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
  <tr>
      <td style={{fontWeight: "bold"}}>EXPENSES</td>
      <td colSpan="3"></td>
    </tr>
    
    {inputss && inputss.map((item, index) => (
      item.type === 2 && (
        <tr key={index}>
          <td>{item.account_code}</td>
          <td style={{ whiteSpace: "nowrap" }}>{item.account_name}</td>
          <td>{item.type === 1 ? "DR" : "CR"}</td>
          <td style={{ textAlign: "right" }}>{parseFloat(item.amount).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
})}</td>
        </tr>
      )
    ))}
    <tr>
    <td colSpan="9" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
    <tr>
                    <td colSpan="3">Total Expenses</td>
                    <td  style={{ textAlign: "right", fontWeight: "bold" }}>{parseFloat(accounts.totalExpense).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
})}</td>
                  </tr>
                  <tr>
    <td colSpan="9" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
  
  </tbody>
</table>
<div className={classes.footer} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div>
          <p>Total Income: <span>{parseFloat(accounts.totalIncome).toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</span></p>
          <p>Total Expense: <span>{parseFloat(accounts.totalExpense).toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</span></p>
        </div>
        <div>
          <p>Profit/Loss: <span>{(parseFloat(accounts.totalIncome) - parseFloat(accounts.totalExpense)).toLocaleString('en-US', {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</span></p>
          <p>Status: <span>{(parseFloat(accounts.totalIncome) >= parseFloat(accounts.totalExpense)) ? 'Profit' : 'Loss'}</span></p>
        </div>
      </div>
  
        </div>
    </div>
  )
}
