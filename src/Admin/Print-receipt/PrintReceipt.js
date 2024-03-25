import React from 'react';
import classes from './PrintReceipt.module.css';
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

const PrintReceipt = () => {

  const handlePrint = () => {
    window.print()
  }


  return (

    <div className="fixed topmain">
      <AdminHeaderNav />
      <div class="content-header row align-items-center m-0 invcont" >
        <nav aria-label="breadcrumb" class="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
          <div className={classes.cardFooter}>
            <button type="button" class="btn btn-info mr-2 dbtn" onclick="myFunction()"><span class="fa fa-print dfont"> Print Invoice</span></button>
          </div>
        </nav>
        <div class="col-sm-8 header-title p-0">
          <div class="media">
            <div class="header-icon text-success mr-3 iconinv" ><i><img src={favicon} style={{ height: 30, width: 30 }} alt="favicon" /></i></div>
            <div class="media-body">
              <h1 class="font-weight-bold">Invoice</h1>
              <small>From now on you will start your activities.</small>
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
                  <strong>Twitter, Inc.</strong><br></br>
                  1355 Market Street, Suite 900<br></br>
                  San Francisco, CA 94103<br></br>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
                <address>
                  <strong>Full Name</strong><br></br>
                  <a href="mailto:#">first.last@example.com</a>
                </address>
              </div>
              <div class="col-sm-6 text-right">
                <h1 class="h3">Invoice #0044777</h1>
                <div>Issued March 19th, 2023</div>
                <div class="text-danger m-b-15">Payment due April 21st, 2024</div>
                <address>
                  <strong>Twitter, Inc.</strong><br></br>
                  1355 Market Street, Suite 900<br></br>
                  San Francisco, CA 94103<br></br>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped table-nowrap">
                <thead>
                  <tr>
                    <th>Item List</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Tax</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div><strong>Lorem Ipsum is simply dummy text</strong></div>
                      <small>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots</small></td>
                    <td>1</td>
                    <td>$39.00</td>
                    <td>$71.98</td>
                    <td>$27,98</td>
                  </tr>
                  <tr>
                    <td>
                      <div><strong>It is a long established fact that a reader will be</strong></div>
                      <small>There are many variations of passages of Lorem Ipsum available, but the majority</small>
                    </td>
                    <td>2</td>
                    <td>$57.00</td>
                    <td>$56.80</td>
                    <td>$112.80</td>
                  </tr>
                  <tr>
                    <td><div><strong>The standard chunk of Lorem Ipsum used since</strong></div>
                      <small>It has survived not only five centuries, but also the leap into electronic .</small></td>
                    <td>3</td>
                    <td>$645.00</td>
                    <td>$321.20</td>
                    <td>$1286.20</td>
                  </tr>
                  <tr>
                    <td><div><strong>The standard chunk of Lorem Ipsum used since</strong></div>
                      <small>It has survived not only five centuries, but also the leap into electronic .</small></td>
                    <td>3</td>
                    <td>$486.00</td>
                    <td>$524.20</td>
                    <td>$789.20</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-sm-8">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                  to make a type specimen book.</p>
                <p><strong>Thank you very much for choosing us. It was a pleasure to have worked with you.</strong></p>
                {/* <img src="assets/dist/img/credit/AM_mc_vs_ms_ae_UK.png" class="img-responsive" alt=""> */}

              </div>
              <div class="col-sm-4">
                <ul class="list-unstyled text-right">
                  <li>
                    <strong>Sub - Total amount:</strong> $9265 </li>
                  <li>
                    <strong>Discount:</strong> 12.9% </li>
                  <li>
                    <strong>VAT:</strong> ----- </li>
                  <li>
                    <strong>Grand Total:</strong> $12489 </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
      <InfoFooter />
    </div>

  );
}

export default PrintReceipt;
