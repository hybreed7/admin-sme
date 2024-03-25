import React, { useState, useEffect } from 'react';
import Happiness from '../../src/Images/happiness.svg';
import "./assets/plugins/bootstrap/css/bootstrap.min.css";
import "./assets/plugins/metisMenu/metisMenu.min.css";
import "./assets/plugins/fontawesome/css/all.min.css";
import "./assets/plugins/typicons/src/typicons.min.css";
import "./assets/plugins/themify-icons/themify-icons.min.css";
import happiness from "./assets/dist/img/happiness.svg";
import "./assets/plugins/datatables/dataTables.bootstrap4.min.css";
import "./style.css";
import { AdminHeaderNav } from './AdminHeaderNav';
import { AdminHeadernavMainMenu } from './AdminHeadernavMainMenu';
import { NavLink } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';
import { InfoFooter } from '../InfoFooter';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import classes from './Admin.module.css';
import favicon from '../Images/faviconn.png'
import PieChart1 from '../Images/Pie-Chart-1.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';





function Admin() {
  const [user, setUser] = useState('');
  const [bearer, setBearer] = useState('');
  const [mycompanyName, setMyCompanyName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();


  const readData = async () => {
    try {
      const detail = await AsyncStorage.getItem('tobi');
      const details = await AsyncStorage.getItem('userToken');

      if (detail !== null) {
        setUser(detail);
      }


      if (details !== null) {
        setBearer(details);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

  //   const filteredData = tableData.filter(item => item.gl_name.toLowerCase().includes(searchTerm.toLowerCase()));
  let totalEntries = tableData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);


  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const startIdx = (currentPage - 1) * entriesPerPage + 1;
  const endIdx = Math.min(startIdx + entriesPerPage - 1, totalEntries);
  const displayedData = tableData.slice(startIdx - 1, endIdx);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  const fetchCharts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/account', { headers });
      const results = response.data?.data;

      setTableData(results);
      //   console.log(results, "NIGERR");
    } catch (error) {
      if (error.response && error.response.status === 401) {

        navigate('/login');
      } else {
        const errorStatus = error.response?.data?.message;
        console.log(errorStatus);
        setTableData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bearer) {
      fetchCharts();
    }
  }, [bearer]);




  return (

    // <div className="fixed">
    <div style={{ marginTop: '8rem', }}>
      {/* <!-- #END# Page Loader --> */}
      <div></div>
      <div className="wrapper">

        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">
            <AdminHeaderNav />


            {/* <!--Content Header (Page header)--> */}
            <div className='newBody'>
              <div className='newWidth'>
                <div className="content-header row align-items-center m-0">

                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold"> Welcome, {user} </h1>
                        <small>From now on you will start your activities.</small>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="body-content">


                  <div className="row" >
                    <div className="col-lg-12 col-xl-12">
                      <div className="card mb-12" >
                        <div className="card-body" >
                          <div className="table-resposive" >
                            <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20, marginTop: -40 }}>
                              <div className={classes.greenbtn} style={{ display: 'flex', }}>
                                {/* <div>
                                  <button>Copy</button>
                                  <button>Excel</button>
                                  <button>PDF</button>
                                  <button className={classes.diffbtn}>Column visibility</button>
                                </div> */}
                                {/* <div>
                                  <label className="d-flex justify-content-start align-items-center">
                                    Show
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" value={entriesPerPage}
                                      onChange={(e) => {
                                        setEntriesPerPage(parseInt(e.target.value));
                                        setCurrentPage(1);
                                      }}>
                                      <option value={10}>10</option>
                                      <option value={25}>25</option>
                                      <option value={50}>50</option>
                                      <option value={100}>100</option>
                                    </select>
                                    entries
                                  </label>
                                </div> */}
                              </div>
                              <div className="text-right modal-effect ">
                                {/* <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="mr-2">Search:</div>
                                    <input
                                      type="search"
                                      value={searchTerm}
                                      className="form-control form-control-sm"
                                      placeholder=""
                                      aria-controls="DataTables_Table_0"
                                      onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                      }}
                                    />
                                  </div>

                                </div> */}
                              </div>
                            </div>


                            {isLoading ? (
                              <p>Fetching charts...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead className={classes.tableHeadAdmin} style={{ whiteSpace: 'nowrap'}}>
                                    <tr>
                                      <th>S/N</th>
                                      <th>NAME</th>
                                      <th>GRANT/LOAN</th>
                                      <th>STATUS</th>
                                      <th>AMOUNT</th>
                                      <th>PAID/PAID NOT </th>
                                      {/* <th>Actions</th> */}
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.gl_code}</td>
                                        <td style={{ textAlign: "left" }}>{item.gl_name}</td>
                                        <td>{item.class?.description}</td>
                                        <td>{item.category?.description}</td>
                                        <td style={{ textAlign: "left" }}>{item.subcategory?.description}</td>

                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}



                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="row" >



                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            {/* <!--/.body content--> */}
          </div>
          <InfoFooter />
          {/* <div className="overlay"></div> */}
        </div>
      </div>



    </div>

  );
}

export default Admin;