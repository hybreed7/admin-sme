import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import classes from './PaymentOrder.module.css';
import { Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function PaymentOrder() {
    const location = useLocation();
    const [bearer, setBearer] = useState('');
    const [company, setCompany] = useState('');
    const [instructionLoading, setInstructionLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    // const [responseData, setResponseData] = useState(null);
    const [paymentInstruction, setPaymentInstruction] = useState([]);
  const [totalNetPay, setTotalNetPay] = useState(0);
  const [totalNetPayInWords, setTotalNetPayInWords] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAcc, setBankAcc] = useState('');


    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken');
          const value1 = await AsyncStorage.getItem('companyName');
          const value2 = await AsyncStorage.getItem('companyEmail');
          const value3 = await AsyncStorage.getItem('companyPhone');
          const value4 = await AsyncStorage.getItem('companyAddress');
    
          if (value !== null) {
            setBearer(value);
            // setAuthenticated(true);
          }
          if (value1 !== null) {
            setCompany(value1);
         
          }
          if (value2 !== null) {
            setEmail(value2);
         
          }
          if (value3 !== null) {
            setPhone(value3);
         
          }
          if (value4 !== null) {
            setAddress(value4);
         
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };
    
      useEffect(() => {
        readData();
    
    }, []);

    useEffect(() => {
        const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);
      
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = addLeadingZero(currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();
        const formattedDateTime = `${day}/${month}/${year}`;
      
        setCurrentDateTime(formattedDateTime);
      }, []);

      const { rows, selectedBank } = location.state;
      const parsedSelectedBank = JSON.parse(selectedBank);

// console.log(parsedSelectedBank.id); // Accessing selectedBank.id
// console.log(parsedSelectedBank.gl_name); // Accessing selectedBank.gl_name
// console.log(parsedSelectedBank.gl_code); // Accessing selectedBank.gl_code


      useEffect(() => {
        const { rows } = location.state;
    
        if (rows) {
         
          const total = rows.reduce((acc, item) => acc + parseFloat(item.total_amount), 0);
          setTotalNetPay(total);
    
          const totalInWords = convertToWords(total);
          setTotalNetPayInWords(totalInWords);

          setPaymentInstruction(rows);
    
        } else {
          console.error('No selected item data found in location state.');
        }
      }, [location.state]);

      const convertToWords = (number) => {
        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = [
          '',
          'Eleven',
          'Twelve',
          'Thirteen',
          'Fourteen',
          'Fifteen',
          'Sixteen',
          'Seventeen',
          'Eighteen',
          'Nineteen',
        ];
        const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const suffixes = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
      
        const numToWords = (num) => {
          if (num === 0) return '';
          if (num < 10) return units[num];
          if (num < 20) return teens[num - 10];
          if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
          if (num < 1000)
            return units[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numToWords(num % 100) : '');
          for (let i = 1; i <= 4; i++) {
            if (num < Math.pow(1000, i + 1)) {
              return numToWords(Math.floor(num / Math.pow(1000, i))) + ' ' + suffixes[i] +
                (num % Math.pow(1000, i) !== 0 ? ' ' + numToWords(num % Math.pow(1000, i)) : '');
            }
          }
          return 'Number too large to convert';
        };
      
        const [integerPart, decimalPart] = number.toFixed(2).split('.');
        const integerWords = parseInt(integerPart, 10) !== 0 ? numToWords(parseInt(integerPart, 10)) + ' Naira' : '';
        const decimalWords = parseInt(decimalPart, 10) !== 0 ? ' ' + numToWords(parseInt(decimalPart, 10)) + ' Kobo' : '';
      
        const result = (integerWords + (integerWords && decimalWords ? ',' : '') + decimalWords).trim();
      
        return result;
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
      };
    
      
      const handleInstruction = async () => {
        // Display a confirmation dialog using Swal
        Swal.fire({
          title: 'Are you sure?',
          text: 'This action will generate a payment instruction. Do you want to proceed?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed!',
          cancelButtonText: 'No, cancel'
        }).then(async (result) => {
          if (result.isConfirmed) {
            setInstructionLoading(true);
            try {
              const ids = rows.map(row => row.id);
            
              const response = await axios.post(`https://api-sme.promixaccounting.com/api/v1/payment_voucher/make-voucher-payment`,
                {
                  id: ids,
                  bank: parsedSelectedBank.id,
                  gateway: "instruction"
                },
                { headers });
                window.print();
            } catch (error) {
              const errorStatus = error.response?.data?.message;
              console.log(errorStatus);
    
            } finally {
              setInstructionLoading(false);
            }
          }
        });
      };

    return (
        <body className={classes.officialBody}>
            <div className={classes.a4}>
            <div className={classes.headerContainer}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                     <p>
          <strong>To: </strong>
          <br />
          {/* The Branch Manager of, <br /> {bankName}, */}
        </p>
        <br />
        <p>
          Date: {currentDateTime}
        </p> 
        </div>
                    <p style={{paddingBottom:'10px'}}><span >Dear Sir / Madam,</span><br/></p>
                    <span >
                    We, {company}, kindly request the transfer of the following sum to the specified account, debiting from our account under the a/c name of <b> {parsedSelectedBank.gl_name}</b> and a/c no. <b> {parsedSelectedBank.gl_code} </b>.
                    </span>
                    <table className={classes.orderTable}>
                    <thead>
          <tr>
            <th style={{ maxWidth: '50px' }}>S/N</th>
            <th>Account Name</th>
            <th>Bank Name</th>
            <th>A/C Number</th>
            <th>Amount(N)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((instruction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{instruction.beneficiary === null ? instruction.description : instruction.beneficiaries_account?.account_name}</td>
              <td>{instruction.beneficiaries_account === null ? instruction.bank_name : instruction.beneficiaries_account?.bank_name}</td>
              <td>{instruction.beneficiaries_account === null ? instruction.account_number : instruction.beneficiaries_account?.bank_account}</td>
              <td style={{textAlign: "right", whiteSpace: 'nowrap'}}>{parseFloat(instruction?.total_amount).toLocaleString('en-US', {
                                      minimumIntegerDigits: 1,
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><b>Total</b></td>
            <td colSpan={3} style={{textAlign: "center"}}>{totalNetPayInWords}</td>
            
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{totalNetPay.toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</td>
          </tr>
          
       
        </tfoot>
      </table>
                </div>
                <div className={classes.printButton}>
  <Button style={{ borderRadius: 0 }} variant="success" onClick={handleInstruction}>
    {instructionLoading ? (
      <>
        <Spinner size='sm' />
        <span style={{ marginLeft: '5px' }}>Generating instruction, Please wait...</span>
      </>
    ) : (
      "Print Instruction"
    )}
  </Button>
</div>
            </div>
            
        </body>
      )
}
