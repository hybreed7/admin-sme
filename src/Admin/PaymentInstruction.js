import React, {useState, useEffect} from 'react';
import classes from "./PaymentInstruction.module.css";
import { useLocation } from 'react-router-dom';

function PaymentInstruction() {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [gender, setGender] = useState('');
  const [grade1, setGrade1] = useState('');
  const [paymentInstruction, setPaymentInstruction] = useState([]);
  const [totalNetPay, setTotalNetPay] = useState(0);
  const [totalNetPayInWords, setTotalNetPayInWords] = useState('');
  const [bankName, setBankName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { paymentInstruction: paymentData, selectedBank, selectedMonth, selectedYear } = location.state;

    if (paymentData) {
      setBankName(selectedBank);
      setMonth(selectedMonth);
      setYear(selectedYear);
      setPaymentInstruction(paymentData);

      const total = paymentData.reduce((acc, item) => acc + parseFloat(item.net_pay), 0);
      setTotalNetPay(total);

      const totalInWords = convertToWords(total);
      setTotalNetPayInWords(totalInWords);
  
    } else {
      console.error('No selected item data found in location state.');
    }
  }, [location.state]);
  
  const generateCurrentDate = () => {
    const currentDate = new Date();
    
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    
    return formattedDate;
  };

  const currentDate = generateCurrentDate();

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
    <div className={classes.container}>
      <div className={classes.address}>
        <p>
          <strong>To</strong>
          <br />
          The Branch Manager, <br /> {bankName}, <br /> Address of the Bank.
        </p>

        <p>
          Place: <br /> Date: {currentDate}
        </p>
      </div>

      <p style={{ textAlign: "center" }}>
        Sub: Employees Salary transfer letter for <strong>{month} {year}</strong>.
      </p>

      <p>Dear Sir/Madam,</p>

      <p>
        <span style={{ marginLeft: "40px" }}> We</span>{" "}
        <strong>International School Ibadan</strong> request you to Kindly transfer the salaries of the following employees into
        their respective bank accounts by debiting from our account bearing a/c no. <strong></strong> for the month of{" "}
        <strong>{month} {year}</strong>.
      </p>
        <div className={classes.PaymentInstructionTable}>
          <table>
            <thead>
              <tr>
                <th>S No</th>
                <th>Account Name</th>
                <th>Bank Name</th>
                <th>A/C Number</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {paymentInstruction?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.staff?.firstname} {item.staff?.middlename} {item.staff?.lastname}</td>
                  <td>{item.staff?.account_bank}</td>
                  <td>{item.staff?.account_number}</td>
                  <td>{parseFloat(item.net_pay).toLocaleString('en-US', {
                                          minimumIntegerDigits: 1,
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}
                    </td>
                </tr>
              ))}
                                    
            </tbody>

            <tfoot>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <strong>Total</strong>
                </td>
                <td colSpan="3"></td>
                <td>{totalNetPay.toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}</td>
              </tr>
              <tr>
                <td colSpan="5">{totalNetPayInWords}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      

      <p style={{ textAlign: "center" }}>Thank You.</p>

      <p style={{ textAlign: "right" }}>
        For the <strong>[Company Name]</strong>,
      </p>
      <p style={{ textAlign: "right" }}>Authorized Person name & Signatory.</p>
    </div>
  );
}

export default PaymentInstruction;
