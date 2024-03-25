import React, {useState, useEffect} from 'react'
import classes from './PrintVoucher.module.css'
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrintVoucher() {
    const location = useLocation();
    const [bearer, setBearer] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
  
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
    const minutes = addLeadingZero(currentDate.getMinutes());
    const hours = addLeadingZero(currentDate.getHours() % 12 || 12);
    const seconds = addLeadingZero(currentDate.getSeconds());
    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
  
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  
    setCurrentDateTime(formattedDateTime);
  }, []);
  
  const { selectedVoucher } = location.state || {};
  
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <body className={classes.officialBody}>
        <div className={classes.a4}>
            <div className={classes.headerContainer}>
                <div className={classes.flex1}>
                    <h1>PAYMENT VOUCHER</h1>
                    <h4 className={classes.fontBold} >{company}</h4>
                    <p style={{fontSize:'15px', width: "420px", wordWrap: 'break-word'}}>{address}</p>
                    <p>{phone}</p>
                    <p>{email}</p>
                    <table className={classes.headerTable1}>
                        <tr>
                            <td>SALESPERSON</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>CREDIT CARD NO.</td>
                            <td></td>
                        </tr>
                    </table>
                </div>

                <div className={classes.flex2}>
                    <table className={classes.headerTable2}>
                        <tr>
                            <td style={{borderBottom:'1px solid gray',}}>DATE & TIME </td>
                            <td>{selectedVoucher.date}</td>
                        </tr>
                        <tr>
                            <td>PV NO.</td>
                            <td>{selectedVoucher.pvnumber}</td>
                        </tr>
                        {/* <tr>
                            <td>BENEFICIARY NO.</td>
                            <td>{selectedVoucher.beneficiary?.id}</td>
                        </tr> */}
                        <tr>
                            <td>BENEFICIARY NAME</td>
                            <td>{selectedVoucher.beneficiary?.name}</td>
                        </tr>
                        {/* <tr>
                            <td>BENEFICIARY EMAIL</td>
                            <td>{selectedVoucher.beneficiary?.email}</td>
                        </tr> */}
                        {/* <tr>
                            <td>BENEFICIARY PHONE NO.</td>
                            <td>{selectedVoucher.beneficiary?.phone_number}</td>
                        </tr> */}
                        <tr>
                            <td>BENEFICIARY ADDRESS</td>
                            <td>{selectedVoucher.beneficiary?.address}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{backgroundColor:'gray', padding:'3px', height:'20px',}}></td>
                        </tr>
                    </table>
                    {/* <div style={{padding:'0 0 0 10px'}}>
                        <p style={{padding:'5px 0 10px 0 ',}}>BENEFICIARY NAME:</p>
                        <h5 className={classes.fontBold}>{selectedVoucher.customer?.name} </h5>
                        <p style={{width: "420px", wordWrap: 'break-word'}}>{selectedVoucher.customer?.address}<br></br>
                  {selectedVoucher.customer?.phone}</p>
                    </div> */}
                </div>     
            </div>

                
            <table className={classes.bodyTable}>
                <tr>
                    <th>ITEM NO</th>
                    <th style={{width:'300px'}}>DESCRIPTION</th>
                    <th>CONTRACT AMOUNT</th>
                    <th>TAX AMOUNT</th>
                    <th>TOTAL AMOUNT</th>
                </tr>   
                <tr>
                    <td>1</td>
                    <td >{selectedVoucher.description}</td>
                    <td style={{textAlign: "right"}}>{parseFloat(selectedVoucher.contract_amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                    <td style={{textAlign: "right"}}>{parseFloat(selectedVoucher.total_tax_amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                    <td style={{textAlign: "right"}}>{parseFloat(selectedVoucher.total_amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>   
                <tr>
                    <td rowSpan={5} colSpan={2} className={classes.spaned}>
                        <span>Remarks/Instructions:</span>
                        <div style={{textAlign:'center', marginTop:'90px',}}>
                            <span>Please make check payable to Your Company Name.</span><br/>
                            <div style={{fontSize:'23px', paddingTop:'10px'}}>THANK YOU</div>
                        </div>

                    </td>
                    <td colSpan={2}>SUBTOTAL</td>
                    <td style={{textAlign:'right',}}>{parseFloat(selectedVoucher.total_amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                </tr>   
                <tr>
                    <td colSpan={2}>TAX</td>
                    <td className={classes.right}></td>
                </tr>
                <tr>
                    <td colSpan={2}>SHIPPING / HANDLING</td>
                    <td className={classes.right}></td>
                </tr>
                <tr>
                    <td colSpan={2}>OTHER</td>
                    <td className={classes.right}></td>
                </tr>
                <tr>
                    <td colSpan={2}>TOTAL</td>
                    <td className={classes.right}>{parseFloat(selectedVoucher.total_amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                </tr>
                <tr>
                    <td colSpan={5} className={classes.footerCont} >
                        <div className={classes.div1}>
                            <div className={classes.div2}>
                                <div>
                                    <span>CASH</span>
                                    <span>CREDIT CARD</span>
                                    <span>MONEY ORDER</span>
                                </div>
                                <span className={classes.span1}>
                                    For questions concerning this invoice please contact {company} on {phone}, Email<br/> {email}
                                </span>
                                {/* <a>www.brookessoftwere.com</a> */}
                                
                            </div>

                        </div>
                    </td>
                </tr>
                
                
            </table>
        </div>
    </body>
  )
}
