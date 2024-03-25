import React, { useState, useEffect } from 'react';
import classes from '../../Admin/Process-General-ledger/ProcessGeneral.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { useLocation } from 'react-router-dom';
import { AdminHeaderNav } from '../AdminHeaderNav';

export default function ProcessGeneral() {
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
  const startDate = new Date(inputss.start_date);
  const endDate = new Date(inputss.end_date);

  const getOrdinalSuffix = (number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return v >= 11 && v <= 13
      ? 'th'
      : suffixes[v % 10] || 'th';
  };

  function formattedDates(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  useEffect(() => {
    if (accounts) {
      const debitTotal = accounts.reduce((total, item) => total + parseFloat(item.debit), 0);
      const creditTotal = accounts.reduce((total, item) => total + parseFloat(item.credit), 0);

      // Format the numbers with commas and two decimal places
      const formattedDebitTotal = debitTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      const formattedCreditTotal = creditTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      setTotalDebit(formattedDebitTotal);
      setTotalCredit(formattedCreditTotal);
    }
  }, [accounts]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return (
    <div style={{ marginTop: '1rem', }}>
      {/* <AdminHeaderNav /> */}
      <div className='newBody'>
        <div className='newWidth'>
          <div className="wrapper">
            <div className={classes.a4}>
              <div className={classes.header}>
                <p style={{ width: "100%", fontSize: 18 }}>{company}</p>
                {/* <h4>Account Activity Period, 01 - 01 (September - September) 2017/2018</h4> */}
                <h6>GENERAL LEDGER REPORT BETWEEN {formatDate(startDate)}  AND {formatDate(endDate)} </h6>
              </div>
              <p>{currentDateTime} </p>
              <table className={classes.table}>
  <tr>
    <th style={{ width: '200px' }}>Post Date</th>
    <th style={{ width: '200px' }}>Value Date</th>
    <th style={{ width: '500px' }}>Details</th>
    <th style={{ textAlign: "center", width: '200px' }}>Debit</th>
    <th style={{ textAlign: "center", width: '200px' }}>Credit</th>
  </tr>
  {accounts && accounts.map((item, index) => (
    <tr key={index}>
      <td>{formattedDates(item.created_at)}</td>
      <td>{item.transaction_date}</td>
      <td>{item.details}</td>
      <td style={{ textAlign: "right", width: '200px' }}>{parseFloat(item.debit).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</td>
      <td style={{ textAlign: "right", width: '200px' }}>{parseFloat(item.credit).toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</td>
    </tr>
  ))}
  <tr>
    <td colSpan="5" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
  <tr>
    <td colSpan="3">Total</td>
    <td style={{ textAlign: "right", fontWeight: "bold", width: '150px' }}>{totalDebit}</td>
    <td style={{ textAlign: "right", fontWeight: "bold", width: '150px' }}>{totalCredit}</td>
  </tr>
  <tr>
    <td colSpan="5" style={{ borderBottom: "2px solid #000" }}></td>
  </tr>
</table>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
