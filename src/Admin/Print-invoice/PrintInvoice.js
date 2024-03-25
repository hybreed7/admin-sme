import React, { useState, useEffect } from 'react';
import classes from './PrintInvoice.module.css';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
import favicon from '../../Images/faviconn.png'
import { useLocation } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrintInvoice1 = () => {
  const location = useLocation();
  const [bearer, setBearer] = useState('');
  const [company, setCompany] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

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

const { selectedInvoice } = location.state || {};


const handlePrint = () => {
  window.print();
};


  return (

    <div className="fixed topmain">
      <AdminHeaderNav />
      <div class="content-header row align-items-center m-0 invcont" >
        <nav aria-label="breadcrumb" class="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
          <div className={classes.cardFooter}>
            <button type="button" className="btn btn-info mr-2 dbtn" onClick={handlePrint}><span className="fa fa-print dfont"> Print Invoice</span></button>
          </div>
        </nav>
        
        <div className="col-sm-8 header-title p-0" >
          <div className="media">
            <div className="header-icon text-success mr-3 iconinv" ><i><img className={classes.cardHeader} src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
            <div className="media-body">
              <h1 className="font-weight-bold">Invoice</h1>
              <small>Check and print your invoice.</small>
            </div>
          </div>
        </div>
      </div>
  


      {/* <!--/.Content Header (Page header)-->  */}
      <div className={classes.bodyContent}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                {/* <img src="assets/dist/img/mini-logo.png" class="img-fluid mb-3" alt=""> */}
                <br></br>
                <address>
                  <strong>Invoice To:</strong><br></br>
                  {selectedInvoice.customer?.name} <br></br>
                  {selectedInvoice.customer?.address}<br></br>
                  {selectedInvoice.customer?.phone}
                </address>
                <address>
                  <strong>Email:</strong><br></br>
                  <a href="mailto:#">{selectedInvoice.customer?.email}</a>
                </address>
              </div>
              <div class="col-sm-6 text-right">
                <h1 class="h3">Invoice #{selectedInvoice.invoice_number}</h1>
                <div>Issued {currentDateTime}</div>
                {/* <div class="text-danger m-b-15">Payment due April 21st, 2024</div>
                <address>
                  <strong>Twitter, Inc.</strong><br></br>
                  1355 Market Street, Suite 900<br></br>
                  San Francisco, CA 94103<br></br>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address> */}
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped table-nowrap">
                <thead>
                  <tr>
                    <th>Item List</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    {/* <th>Tax</th> */}
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div><strong>{selectedInvoice.description}</strong></div>
                      {/* <small>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</small> */}
                      </td>
                    <td>2</td>
                    <td style={{textAlign: "right"}}>{parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                    {/* <td>$71.98</td> */}
                    <td style={{textAlign: "right"}}>{parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</td>
                  </tr>
                  
                  
                  
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-sm-8">
                {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.</p> */}
                <p><strong>Thank you very much for choosing us. It was a pleasure to have worked with you.</strong></p>
                {/* <img src="assets/dist/img/credit/AM_mc_vs_ms_ae_UK.png" class="img-responsive" alt=""> */}

              </div>
              <div class="col-sm-4">
                <ul class="list-unstyled text-right">
                  <li>
                    <strong>Sub - Total amount:</strong> {parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} </li>
                  
                  <li>
                    <strong>Grand Total:</strong> {parseFloat(selectedInvoice.amount).toLocaleString('en-US', {
                    minimumIntegerDigits: 1,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <InfoFooter /> */}
    </div>

  );
}

export default PrintInvoice1;
