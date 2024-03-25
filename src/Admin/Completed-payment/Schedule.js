import React, { useState, useEffect } from 'react';
import "../assets/plugins/bootstrap/css/bootstrap.min.css";
import "../assets/plugins/metisMenu/metisMenu.min.css";
import "../assets/plugins/fontawesome/css/all.min.css";
import "../assets/plugins/typicons/src/typicons.min.css";
import "../assets/plugins/themify-icons/themify-icons.min.css";
import "../assets/plugins/datatables/dataTables.bootstrap4.min.css";
import { AdminHeaderNav } from '../AdminHeaderNav';
// import Footer from '../../Pages/Footer/Footer';
import { InfoFooter } from '../../InfoFooter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

function Schedule() {
    const [title, setTitle] = useState('');
    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [bank, setBank] = useState('');
    const [medical, setMedical] = useState('');
    const [staffId, setStaffId] = useState('');
    const [rsa, setRsa] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedResignDate, setSelectedResignDate] = useState('');
    const [selectedEmployDate, setSelectedEmployDate] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedStep, setSelectedStep] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCertificate, setSelectedCertificate] = useState('');
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [tableData3, setTableData3] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({
        pension: false,
        nhis: false,
        nhfund: false,
    });

    const handleCheckboxChange = (checkboxName) => {
        setSelectedCheckboxes((prevSelected) => ({
            ...prevSelected,
            [checkboxName]: !prevSelected[checkboxName],
        }));
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleEmployDateChange = (event) => {
        setSelectedEmployDate(event.target.value);
    };

    const handleResignDateChange = (event) => {
        setSelectedResignDate(event.target.value);
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleCertificateChange = (event) => {
        setSelectedCertificate(event.target.value);
    };

    const handleStepChange = (event) => {
        setSelectedStep(event.target.value);
    };

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken');

            if (value !== null) {
                setBearer(value);
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };

    useEffect(() => {
        readData();
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
    };

    const goBack = () => {
        navigate(-1);
    }


    const fetchStep = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://payroll.patna.ng/api/admin/step', { headers });
            const results = response.data?.Steps?.data;
            setTableData(results);
            // console.log(results, "STEP");
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchGrades = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://payroll.patna.ng/api/admin/grade', { headers });
            const results = response.data?.data?.data;
            setTableData1(results);
            // console.log(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData1([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLevel = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://payroll.patna.ng/api/admin/level', { headers });
            const results = response.data?.data?.data;
            setTableData2(results);
            // console.log(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData2([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDepartment = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://payroll.patna.ng/api/admin/department', { headers });
            const results = response.data?.data?.data;
            setTableData3(results);
        } catch (error) {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setTableData([]);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (bearer) {
            fetchStep();
            fetchGrades();
            fetchLevel();
            fetchDepartment();

        }
    }, [bearer]);

    const createStaff = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                "https://payroll.patna.ng/api/admin/staff/create",
                {
                    title: title,
                    lastname: surname,
                    firstname: firstName,
                    dob: selectedDate,
                    gender: selectedGender,
                    marital_status: selectedStatus,
                    phone_number: phone,
                    email: email,
                    staff_id: staffId,
                    rsa_number: rsa,
                    qualification: selectedCertificate,
                    step: selectedStep,
                    grade: selectedGrade,
                    level: selectedLevel,
                    dept_id: selectedDepartment,
                    country: selectedCountry,
                    address: address,
                    city: city,
                    employment_date: selectedEmployDate,
                    account_number: accountNo,
                    account_bank: bank,
                    medical_condition: medical
                },
                { headers }
            );
            navigate('/staff')
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });
            console.log(response.data);

        } catch (error) {
            const errorStatus = error.response;
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response,
            });
            console.error(errorStatus);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '10rem', }}>
            <AdminHeaderNav />
            <div className='newBody'>
                <div className='newWidth'>
                    <div className="wrapper">
                        <div className="main-content">



                            {/* <div className="content-header row align-items-center m-0">

                            <div className="col-sm-8 header-title p-0">
                                <div className="media">
                                    <div className="header-icon text-success mr-3"><i className="typcn typcn-spiral"></i></div>
                                    <div className="media-body">
                                        <h1 className="font-weight-bold">Create new payment voucher </h1>
                                        <small>Fill the respective fields to create your voucher....</small>
                                    </div>

                                </div>

                            </div>
                        </div> */}

                            <div class="main-content">

                                {/* <!-- PAGE-HEADER --> */}

                                <div class="row">
                                    <div class="col-12">
                                        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                            <h4 class="mb-sm-0 font-size-18">Schedule Of Payments</h4>

                                            <div class="page-title-right">
                                                <ol class="breadcrumb m-0">
                                                    <li class="breadcrumb-item"><a href="javascript:void(0);">Payment</a></li>
                                                    <li class="breadcrumb-item active" aria-current="page">Schedule Of Payments</li>
                                                </ol>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <!-- ROW-1 --> */}
                                <div class="row">
                                    <div class="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                                        <div class="card overflow-hidden">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col">
                                                        <h3 class="mb-2 fw-semibold">₦15,900,025.98</h3>
                                                        <p class="text-muted fs-13 mb-0">Total Vouchers</p>
                                                        <p class="text-muted mb-0 mt-2 fs-12">
                                                            <span class="icn-box text-success fw-semibold fs-13 me-1">
                                                                <i class="fa fa-long-arrow-up"></i>
                                                                30</span>
                                                        </p>
                                                    </div>
                                                    <div class="col col-auto top-icn dash">
                                                        <div class="counter-icon bg-primary dash ms-auto box-shadow-primary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-white" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
                                                                <path d="M12,8c-2.2091675,0-4,1.7908325-4,4s1.7908325,4,4,4c2.208252-0.0021973,3.9978027-1.791748,4-4C16,9.7908325,14.2091675,8,12,8z M12,15c-1.6568604,0-3-1.3431396-3-3s1.3431396-3,3-3c1.6561279,0.0018311,2.9981689,1.3438721,3,3C15,13.6568604,13.6568604,15,12,15z M21.960022,11.8046875C19.9189453,6.9902344,16.1025391,4,12,4s-7.9189453,2.9902344-9.960022,7.8046875c-0.0537109,0.1246948-0.0537109,0.2659302,0,0.390625C4.0810547,17.0097656,7.8974609,20,12,20s7.9190063-2.9902344,9.960022-7.8046875C22.0137329,12.0706177,22.0137329,11.9293823,21.960022,11.8046875z M12,19c-3.6396484,0-7.0556641-2.6767578-8.9550781-7C4.9443359,7.6767578,8.3603516,5,12,5s7.0556641,2.6767578,8.9550781,7C19.0556641,16.3232422,15.6396484,19,12,19z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                                        <div class="card overflow-hidden">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col">
                                                        <h3 class="mb-2 fw-semibold">
                                                            ₦15,839,025.98</h3>
                                                        <p class="text-muted fs-13 mb-0">Total Approved Vouchers</p>
                                                        <p class="text-muted mb-0 mt-2 fs-12">
                                                            <span class="icn-box text-success fw-semibold fs-13 me-1">
                                                                <i class="fa fa-long-arrow-down"></i>
                                                                26</span>
                                                        </p>
                                                    </div>
                                                    <div class="col col-auto top-icn dash">
                                                        <div class="counter-icon bg-secondary dash ms-auto box-shadow-secondary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-white" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
                                                                <path d="M19.5,7H16V5.9169922c0-2.2091064-1.7908325-4-4-4s-4,1.7908936-4,4V7H4.5C4.4998169,7,4.4996338,7,4.4993896,7C4.2234497,7.0001831,3.9998169,7.223999,4,7.5V19c0.0018311,1.6561279,1.3438721,2.9981689,3,3h10c1.6561279-0.0018311,2.9981689-1.3438721,3-3V7.5c0-0.0001831,0-0.0003662,0-0.0006104C19.9998169,7.2234497,19.776001,6.9998169,19.5,7z M9,5.9169922c0-1.6568604,1.3431396-3,3-3s3,1.3431396,3,3V7H9V5.9169922z M19,19c-0.0014038,1.1040039-0.8959961,1.9985962-2,2H7c-1.1040039-0.0014038-1.9985962-0.8959961-2-2V8h3v2.5C8,10.776123,8.223877,11,8.5,11S9,10.776123,9,10.5V8h6v2.5c0,0.0001831,0,0.0003662,0,0.0005493C15.0001831,10.7765503,15.223999,11.0001831,15.5,11c0.0001831,0,0.0003662,0,0.0006104,0C15.7765503,10.9998169,16.0001831,10.776001,16,10.5V8h3V19z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-12 col-md-4 col-xl-4">
                                        <div class="card overflow-hidden">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col">
                                                        <h3 class="mb-2 fw-semibold">
                                                            ₦61,000.00</h3>
                                                        <p class="text-muted fs-13 mb-0">Total Pending Vouchers</p>
                                                        <p class="text-muted mb-0 mt-2 fs-12">
                                                            <span class="icn-box text-danger fw-semibold fs-13 me-1">
                                                                <i class="fa fa-long-arrow-up"></i>
                                                                4</span>
                                                        </p>
                                                    </div>
                                                    <div class="col col-auto top-icn dash">
                                                        <div class="counter-icon bg-info dash ms-auto box-shadow-info">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-white" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
                                                                <path d="M7.5,12C7.223877,12,7,12.223877,7,12.5v5.0005493C7.0001831,17.7765503,7.223999,18.0001831,7.5,18h0.0006104C7.7765503,17.9998169,8.0001831,17.776001,8,17.5v-5C8,12.223877,7.776123,12,7.5,12z M19,2H5C3.3438721,2.0018311,2.0018311,3.3438721,2,5v14c0.0018311,1.6561279,1.3438721,2.9981689,3,3h14c1.6561279-0.0018311,2.9981689-1.3438721,3-3V5C21.9981689,3.3438721,20.6561279,2.0018311,19,2z M21,19c-0.0014038,1.1040039-0.8959961,1.9985962-2,2H5c-1.1040039-0.0014038-1.9985962-0.8959961-2-2V5c0.0014038-1.1040039,0.8959961-1.9985962,2-2h14c1.1040039,0.0014038,1.9985962,0.8959961,2,2V19z M12,6c-0.276123,0-0.5,0.223877-0.5,0.5v11.0005493C11.5001831,17.7765503,11.723999,18.0001831,12,18h0.0006104c0.2759399-0.0001831,0.4995728-0.223999,0.4993896-0.5v-11C12.5,6.223877,12.276123,6,12,6z M16.5,10c-0.276123,0-0.5,0.223877-0.5,0.5v7.0005493C16.0001831,17.7765503,16.223999,18.0001831,16.5,18h0.0006104C16.7765503,17.9998169,17.0001831,17.776001,17,17.5v-7C17,10.223877,16.776123,10,16.5,10z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- ROW-1 END--> */}
                                <div className="row row-sm">
                                    <div className="col-lg-12">
                                        <div className="card" style={{marginTop: '20px'}}>
               

                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <div id="datatable-buttons_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-6">
                                                                <div className="dt-buttons btn-group flex-wrap">
                                                                    <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatable-buttons" type="button"><span>Copy</span></button>
                                                                    <button className="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="datatable-buttons" type="button"><span>Excel</span></button> <button class="btn btn-secondary buttons-pdf buttons-html5" tabindex="0" aria-controls="datatable-buttons" type="button"><span>PDF</span></button>
                                                                    <button class="btn btn-secondary buttons-print" tabindex="0" aria-controls="datatable-buttons" type="button"><span>Print</span></button> <div class="btn-group"><button class="btn btn-secondary buttons-collection dropdown-toggle buttons-colvis" tabindex="0" aria-controls="datatable-buttons" type="button" aria-haspopup="true" aria-expanded="false">
                                                                        <span>Column visibility</span>
                                                                    </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-12 col-md-6"><div id="datatable-buttons_filter" class="dataTables_filter">
                                                                <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="datatable-buttons"></input> </label>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div class="row"><div class="col-sm-12"><table id="datatable-buttons" data-page-length="200" class="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline" role="grid" aria-describedby="datatable-buttons_info" style={{ width: '991px' }}>
                                                            <thead>
                                                                <tr role="row"><th className="sorting sorting_asc" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '22.3333px' }} aria-sort="ascending" aria-label="SN: activate to sort column descending">SN</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '211.333px' }} aria-label="Beneficiary: activate to sort column ascending">Beneficiary</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '95.3333px' }} aria-label="Total Amount: activate to sort column ascending">Total Amount</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '117.333px' }} aria-label="Voucher Number: activate to sort column ascending">Voucher Number</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '66.3333px' }} aria-label="Approval: activate to sort column ascending">Approval</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '130.333px' }} aria-label="Date: activate to sort column ascending">Date</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" style={{ width: '49.3333px' }} aria-label="Action: activate to sort column ascending">Action</th></tr>
                                                            </thead>
                                                            <tbody>

                                                                <tr className="odd">
                                                                    <td className="dtr-control sorting_1" tabindex="0">1</td>
                                                                    <td>OMOTAYO BELLO</td>
                                                                    <td className="text-end">50,000.00</td>
                                                                    <td>66509</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-12 07:47:13</td>

                                                                    <td>
                                                                        <NavLink to={"/View_voucher"} className="btn-sm btn-success" data-bs-toggle="tooltip" title="" data-id="1" data-bs-original-title="View voucher detail" aria-label="View voucher detail">   <i class="fa fa-eye"></i></NavLink>
                                                                    </td>
                                                                </tr><tr className="even">
                                                                    <td className="dtr-control sorting_1" tabindex="0">2</td>
                                                                    <td>OMOTAYO BELLO</td>
                                                                    <td className="text-end">50,000.00</td>
                                                                    <td>97745</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-12 13:01:52</td>

                                                                    <td>
                                                                        <NavLink to={"/View_voucher"} className="btn-sm btn-success" data-bs-toggle="tooltip" title="" data-id="2" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></NavLink>
                                                                    </td>
                                                                </tr><tr className="odd">
                                                                    <td className="dtr-control sorting_1" tabindex="0">3</td>
                                                                    <td>OMOTAYO BELLO</td>
                                                                    <td className="text-end">250,000.00</td>
                                                                    <td>87490</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-12 13:25:55</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/3" data-bs-toggle="tooltip" title="" data-id="3" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="even">
                                                                    <td className="dtr-control sorting_1" tabindex="0">4</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td className="text-end">400,700.00</td>
                                                                    <td>6255</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-13 05:05:16</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/4" data-bs-toggle="tooltip" title="" data-id="4" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="odd">
                                                                    <td className="dtr-control sorting_1" tabindex="0">5</td>
                                                                    <td>Ambali Agbeniga</td>
                                                                    <td className="text-end">65,000.00</td>
                                                                    <td>20735</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-13 07:32:22</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/5" data-bs-toggle="tooltip" title="" data-id="5" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="even">
                                                                    <td className="dtr-control sorting_1" tabindex="0">6</td>
                                                                    <td>OMOTAYO BELLO</td>
                                                                    <td className="text-end">62,000.00</td>
                                                                    <td>54678</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-13 07:48:16</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/6" data-bs-toggle="tooltip" title="" data-id="6" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="odd">
                                                                    <td className="dtr-control sorting_1" tabindex="0">7</td>
                                                                    <td>OSADARE BUNMI</td>
                                                                    <td className="text-end">200,000.00</td>
                                                                    <td>81766</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-07-13 10:00:30</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/7" data-bs-toggle="tooltip" title="" data-id="7" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="even">
                                                                    <td className="dtr-control sorting_1" tabindex="0">8</td>
                                                                    <td>OSADARE BUNMI</td>
                                                                    <td className="text-end">10,000.00</td>
                                                                    <td>95105</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-warning edit-item-btn"> </label>

                                                                    </td>
                                                                    <td>2023-07-18 08:09:39</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/8" data-bs-toggle="tooltip" title="" data-id="8" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="odd">
                                                                    <td className="dtr-control sorting_1" tabindex="0">9</td>
                                                                    <td>OSADARE BUNMI</td>
                                                                    <td className="text-end">10,000.00</td>
                                                                    <td>62469</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-warning edit-item-btn"> </label>

                                                                    </td>
                                                                    <td>2023-07-18 08:09:40</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/9" data-bs-toggle="tooltip" title="" data-id="9" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="even">
                                                                    <td className="dtr-control sorting_1" tabindex="0">10</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td className="text-end">40,000.00</td>
                                                                    <td>47342</td>
                                                                    <td>


                                                                        <label className="btn-sm btn-warning edit-item-btn"> </label>

                                                                    </td>
                                                                    <td>2023-07-24 08:43:21</td>

                                                                    <td>
                                                                        <a className="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/10" data-bs-toggle="tooltip" title="" data-id="10" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr className="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">11</td>
                                                                    <td>Adebayo Nathaniel</td>
                                                                    <td class="text-end">4,400.00</td>
                                                                    <td>25552</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-11-15 05:07:43</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/11" data-bs-toggle="tooltip" title="" data-id="11" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">12</td>
                                                                    <td>Adebayo Nathaniel</td>
                                                                    <td class="text-end">7,040.00</td>
                                                                    <td>28988</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-11-16 04:08:46</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/12" data-bs-toggle="tooltip" title="" data-id="12" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">13</td>
                                                                    <td>Ambali Agbeniga</td>
                                                                    <td class="text-end">1,000.00</td>
                                                                    <td>66132</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-warning edit-item-btn"> </label>

                                                                    </td>
                                                                    <td>2023-11-17 06:35:25</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/13" data-bs-toggle="tooltip" title="" data-id="13" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">14</td>
                                                                    <td>Emmanuel Bolu</td>
                                                                    <td class="text-end">989.00</td>
                                                                    <td>9494949848</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-11-18 02:02:27</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/14" data-bs-toggle="tooltip" title="" data-id="14" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">15</td>
                                                                    <td>Ayoola Akindele</td>
                                                                    <td class="text-end">18,866.98</td>
                                                                    <td>9494949848</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-11-18 02:27:59</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/15" data-bs-toggle="tooltip" title="" data-id="15" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">16</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td class="text-end">8,888.00</td>
                                                                    <td>68478</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-07 16:10:46</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/16" data-bs-toggle="tooltip" title="" data-id="16" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">17</td>
                                                                    <td>Emmanuel Bolu</td>
                                                                    <td class="text-end">7,767.00</td>
                                                                    <td>49138</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-11 13:14:40</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/17" data-bs-toggle="tooltip" title="" data-id="17" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">18</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td class="text-end">146,000.00</td>
                                                                    <td>19307</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-11 13:22:23</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/18" data-bs-toggle="tooltip" title="" data-id="18" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">19</td>
                                                                    <td>Adebayo Nathaniel</td>
                                                                    <td class="text-end">60,000.00</td>
                                                                    <td>655567</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-13 18:23:06</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/19" data-bs-toggle="tooltip" title="" data-id="19" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">20</td>
                                                                    <td>Adebayo Nathaniel</td>
                                                                    <td class="text-end">3,500,000.00</td>
                                                                    <td>CHQ232</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-14 11:38:35</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/20" data-bs-toggle="tooltip" title="" data-id="20" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">21</td>
                                                                    <td>OMOTAYO BELLO</td>
                                                                    <td class="text-end">3,500,000.00</td>
                                                                    <td>CHQ23</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-14 11:40:25</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/21" data-bs-toggle="tooltip" title="" data-id="21" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">22</td>
                                                                    <td>RCCG KADUNA 10</td>
                                                                    <td class="text-end">254,123.00</td>
                                                                    <td>001</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-14 13:29:25</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/22" data-bs-toggle="tooltip" title="" data-id="22" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">23</td>
                                                                    <td>Adeniyi Toba Fredrick</td>
                                                                    <td class="text-end">159,782.00</td>
                                                                    <td>002</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-14 13:32:16</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/23" data-bs-toggle="tooltip" title="" data-id="23" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">24</td>
                                                                    <td>Adeniyi Toba Fredrick</td>
                                                                    <td class="text-end">89,000.00</td>
                                                                    <td>909223379</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-15 15:07:51</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/24" data-bs-toggle="tooltip" title="" data-id="24" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">25</td>
                                                                    <td>Adeniyi Toba Fredrick</td>
                                                                    <td class="text-end">90,000.00</td>
                                                                    <td>1106884255</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-15 15:07:51</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/25" data-bs-toggle="tooltip" title="" data-id="25" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">26</td>
                                                                    <td>Adeniyi Toba Fredrick</td>
                                                                    <td class="text-end">900,000.00</td>
                                                                    <td>111305501</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-15 15:10:38</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/26" data-bs-toggle="tooltip" title="" data-id="26" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">27</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td class="text-end">900,000.00</td>
                                                                    <td>640072834</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-19 13:43:03</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/27" data-bs-toggle="tooltip" title="" data-id="27" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">28</td>
                                                                    <td>CHRIST CRUSADES FOUNDATION</td>
                                                                    <td class="text-end">89,000.00</td>
                                                                    <td>782850177</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-19 13:43:03</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/28" data-bs-toggle="tooltip" title="" data-id="28" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="odd">
                                                                    <td class="dtr-control sorting_1" tabindex="0">29</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td class="text-end">4,000,000.00</td>
                                                                    <td>1093744426</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>
                                                                    <td>2023-12-19 13:46:44</td>

                                                                    <td>
                                                                        <a class="btn-sm btn-success" href="https://patna.ng/income/payment/voucher/voucher_details/29" data-bs-toggle="tooltip" title="" data-id="29" data-bs-original-title="View voucher detail" aria-label="View voucher detail"><i class="fa fa-eye"></i></a>
                                                                    </td>
                                                                </tr><tr class="even">
                                                                    <td class="dtr-control sorting_1" tabindex="0">30</td>
                                                                    <td>AMOS OLUWASEGUN EZEKIEL</td>
                                                                    <td class="text-end">900,000.00</td>
                                                                    <td>663444967</td>
                                                                    <td>


                                                                        <label class="btn-sm btn-info edit-item-btn">Approved</label>

                                                                    </td>

                                                                </tr></tbody>
                                                        </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="datatable-buttons_info" role="status" aria-live="polite">Showing 1 to 30 of 30 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="datatable-buttons_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="datatable-buttons_previous"><a href="#" aria-controls="datatable-buttons" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="datatable-buttons" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="datatable-buttons_next"><a href="#" aria-controls="datatable-buttons" data-dt-idx="2" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End Row --> */}




                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <InfoFooter />
        </div>
    )
}

export default Schedule