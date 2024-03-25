import React, { useState, useEffect } from 'react';
import classes from './BalanceSheetPrint.module.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { useLocation } from 'react-router-dom';

export default function BalanceSheetPrint() {
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

    const { accounts } = location.state || {};
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


      
    
      

  return (
    <div className={classes.generalbd}>
        <div className={classes.a4}>
            <div className={classes.header}>
                <p style={{width: "100%", fontSize: 18}}>{company}</p>
                <h6>BALANCE SHEET  </h6>
            </div>
            <p>{currentDateTime} </p>
            <table className={classes.table}>
            <thead>
  <tr>
    <th style={{ textAlign: 'left', width: '200px' }} className={classes.th}>Description</th>
    
    {/* <th></th> Empty cell for gap */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Debit</th> */}
    {/* <th></th> Empty cell for gap */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Credit</th> */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Debit</th> */}
    {/* <th></th> Empty cell for gap */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Credit</th> */}
    {/* <th style={{ textAlign: 'right', width: '100px' }}>Debit</th> */}
    {/* <th></th> Empty cell for gap */}
    <th style={{ textAlign: 'right', width: '250px' }} className={classes.th}>Amount</th>
  </tr>
</thead>


  <tbody>
  
    
    {accounts && accounts.map((item, index) => (
      <React.Fragment key={index}>
      <tr>
        <th colSpan={4}>{item.description.toUpperCase()}</th>
      </tr>
      {item.categories?.map((category, catIndex) => (
        <React.Fragment key={catIndex}>
          <tr>
            <th colSpan={4}>{category.description}</th>
          </tr>
          {category.postings.map((posting, postIndex) => (
            <tr key={postIndex}>
              <td>{posting.name}</td>
              <td style={{textAlign: "right"}}>
                {parseFloat(posting.amount).toLocaleString('en-US', {
                  minimumIntegerDigits: 1,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
            </tr>
          ))}
           <tr>
              <td colSpan={1} style={{fontWeight: 'bold'}} className={classes.totalTh}>Total </td>
              <td style={{textAlign: "right", fontWeight: 'bold'}} className={classes.totalTh}>
                {parseFloat(category.total).toLocaleString('en-US', {
                  minimumIntegerDigits: 1,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
            </tr>
            <tr><td colSpan={4}>&nbsp;</td></tr>
        </React.Fragment>
      ))}
      
    </React.Fragment>
    ))}
                
  </tbody>
</table>

  
        </div>
    </div>
  )
}
