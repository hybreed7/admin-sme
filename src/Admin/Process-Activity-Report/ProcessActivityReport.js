import React, { useState, useEffect } from 'react';
import classes from '../../Admin/Process-Activity-Report/ProcessActivityReport.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { useLocation } from 'react-router-dom';

export default function ProcessActivityReport() {
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
                <h6>TRIAL BALANCE REPORT BETWEEN {formatDate(startDate)}  AND {formatDate(endDate)} </h6>
            </div>
            <p>{currentDateTime} </p>
            <table className={classes.table}>
            <thead>
  <tr>
    <th style={{ textAlign: 'left', width: '50px' }}>Account Number</th>
    <th style={{ textAlign: 'left', width: '200px' }}>Account Name</th>
    <th style={{ textAlign: 'left', width: '50px' }}>Type</th>
    <th style={{ textAlign: 'right', width: '100px' }}>Debit</th>
    {/* <th></th> Empty cell for gap */}
    <th style={{ textAlign: 'right', width: '100px' }}>Credit</th>
  </tr>
</thead>


  <tbody>
  {inputss && inputss.map((item, index) => (
      <tr key={index}>
        <td>{item.code}</td>
        <td style={{whiteSpace: "nowrap"}}>{item.name}</td>
        <td>{item.direction === "1" ? "DR" : "CR"}</td>
        {/* <td></td>
        <td></td>
        <td></td> */}
        
        <td  style={{ textAlign: "right" }}>{item.nDebit === "" ? '0.00' :
                                (isNaN(item.nDebit)
                                    ? '0.00'
                                    : parseFloat(item.nDebit).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }))}</td>

<td  style={{ textAlign: "right" }}>{item.nCredit === "" ? '0.00' :
                                (isNaN(item.nCredit)
                                    ? '0.00'
                                    : parseFloat(item.nCredit).toLocaleString('en-US', {
                                        minimumIntegerDigits: 1,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }))}</td>
                  
      </tr>
    ))}
    <tr>
    <td colSpan="9" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
    <tr>
                    <td colSpan="3">Total</td>
                    
                    <td  style={{ textAlign: "right", fontWeight: "bold" }}>{totalDebit}</td>
                    <td  style={{ textAlign: "right", fontWeight: "bold" }}>{totalCredit}</td>
                  </tr>
                  <tr>
    <td colSpan="9" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
  </tbody>
</table>
        </div>
    </div>
  )
}
