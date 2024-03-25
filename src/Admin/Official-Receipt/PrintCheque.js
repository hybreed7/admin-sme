import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import classes from './PrintCheque.module.css'

export default function PrintCheque() {
    const location = useLocation();
    const [bearer, setBearer] = useState('');
    const [company, setCompany] = useState('');
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
  const [beneficiary, setBeneficiary] = useState('');


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

      useEffect(() => {
        const { responseData1 } = location.state;
    
        if (responseData1) {
          setBankName(responseData1[0].bank?.gl_name);
          setBankAcc(responseData1[0].bank?.gl_code);
          setBeneficiary(responseData1[0].beneficiary?.name);
          setTotalNetPay(responseData1[0].total_amount);
      
          const totalInWords = convertToWords(totalNetPay);
          setTotalNetPayInWords(totalInWords);

          setPaymentInstruction(responseData1);
    
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
      
        const numToWords = (num) => {
          if (num === 0) return '';
          if (num < 10) return units[num];
          if (num < 20) return teens[num - 10];
          if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
          if (num < 1000)
            return units[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numToWords(num % 100) : '');
          if (num < 1000000)
            return numToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numToWords(num % 1000) : '');
          return 'Number too large to convert';
        };
      
        const [integerPart, decimalPart] = number.toFixed(2).split('.');
        const integerWords = parseInt(integerPart, 10) !== 0 ? numToWords(parseInt(integerPart, 10)) + ' Naira' : '';
        const decimalWords = parseInt(decimalPart, 10) !== 0 ? ' ' + numToWords(parseInt(decimalPart, 10)) + ' Kobo' : '';
      
        const result = (integerWords + (integerWords && decimalWords ? ',' : '') + decimalWords).trim();
      
        return result;
      };

  return (
    <div className={classes.chequeBody}>
    <div className={classes.a4container}>
        <div className={classes.Cheque}>
            <div className={classes.chequeHeader}>
                <div style={{marginBottom:'1cm'}}>
                    <h6 style={{fontSize:'10.72px', margin:'0'}}>302, HERBERT MACAULAY WAY. SABO YABA, LAGOS</h6>
                </div>
                <div >
                    <h2>Ecobank</h2>
                    <p>The Pan African Bank</p>
                </div>
                <div className={classes.dateSection} >
                    <div className={classes.refNO}>
                        <h5>48983408377</h5>   
                        <h6> u9ur909ru9e9qu05459</h6> 
                    </div>
                    <span >
                        <div className={classes.dateInput}>
                            <p className={classes.label}>Day</p>
                            <div className={classes.inputContainer}>
                                <p className={classes.input}  value="2">2</p>
                                <p className={classes.input}  value="1">1</p>
                            </div>
                        </div>
                        <p className={classes.dash}>-</p>
                        <div className={classes.dateInput}>
                            <p className={classes.label}>Month</p>
                            <div className={classes.inputContainer}>
                                <p className={classes.input} value="1">1</p>
                                <p className={classes.input} value="2">2</p>
                            </div>
                        </div>
                        <p className={classes.dash}>-</p>
                        <div className={classes.dateInput}>
                            <p className={classes.label}>Year</p>
                            <div className={classes.inputContainer}>
                                <p className={classes.input} value="2">2</p>
                                <p className={classes.input} value="0">0</p>
                                <p className={classes.input} value="2">2</p>
                                <p className={classes.input} value="4">4</p>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <div className={classes.paydetails}>
                <div className={classes.details}>
                    <p className={classes.label}>Pay to</p>
                    <div className={classes.paymentTo}>OLUWOLE SURAJUDEEN OLAMILESI</div>
                </div>
                <div className={classes.details}>
                    <p className={classes.label}>The sum of</p>
                    <div className={classes.amount} > </div>
                    
                </div>
                
            </div>
            <div className={classes.nairaInput}>
                <p for="" style={{fontSize:'25px'}}>₦</p>
                <div style={{fontWeight: "bold", fontSize: "15px"}}></div>
            </div>
        </div>
        {/* <!-- <img src="/001.jpg" alt="img"> --> */}

    </div>
</div>
  )
}
