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

function ViewVoucher() {
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
        <div >



            <div className="main-content" >
                <AdminHeaderNav />
                <div className='newBody'>
                <div className='newWidth'>
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

                <div id="layout-wrapper" className='voucherwrap'>
                    <div className="main-content">

                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18">Voucher Detail (66509)</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript:void(0);"></a></li>
                                            <li className="breadcrumb-item active" aria-current="page"></li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- PAGE-HEADER END --> */}

                        {/* <!-- Row --> */}
                        <div className="row row-sm">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Voucher Detail For PAYMENT OF ELECTRICITY (66509)
                                        </h4>

                                    </div>
                                    {/* <!-- end card header --> */}

                                    <div className="card-body">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                        Print
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                                                    <div className="accordion-body">
                                                        <div className="page" id="contentToPrint" size="A4">
                                                            <div className="top-section">
                                                                <div className="address">
                                                                    <div className="address-content">
                                                                        <h2 style={{ fontFamily: 'Times New Roman', }} >THE
                                                                            REDEEMED CHRISTIAN <br></br> CHURCH OF GOD
                                                                            <br></br>LAGOS - IBADAN EXPRESS WAY, NIGERIA
                                                                        </h2>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p style={{ fontSize: '22px', fontFamily: 'Times New Roman', textAlign: 'center', marginTop: '20px' }}>
                                                                PAYMENT VOUCHER (66509)</p>
                                                            <div className="billing-invoice">
                                                                <div className="des">
                                                                    <p className="issue" style={{ paddingLeft: '50px', marginTop: '10px', fontFamily: 'Times New Roman', }}>
                                                                        Date:
                                                                        12th Jul, 2023
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="billing-to">
                                                                <p style={{ marginTop: '20px', fontfamily: 'Times New Roman', }}>
                                                                    I CERTIFIED that the sum of <span style={{ textDecoration: 'underline' }}>₦50,000.00K
                                                                        <b><i>( Fifty    Thousand Naira Only)</i></b></span> is due
                                                                    to:-
                                                                </p>

                                                                <p style={{ marginTop: '20px', fontFamily: 'Times New Roman', }}>
                                                                    Name:OMOTAYO BELLO
                                                                </p>
                                                                <p style={{ marginTop: '20px', fontFamily: 'Times New Roman', }}>
                                                                    Address:Abeokuta
                                                                </p>
                                                            </div>
                                                            <div className="billed-sec">
                                                                <div className="sub-title" style={{ textAlign: 'center', marginBottom: '10px', fontFamily: 'Times New Roman', }}>
                                                                    as per
                                                                    invoices attached</div>
                                                            </div>
                                                            <div className="table" style={{ marginLeft: '5px', width: '97%', fontFamily: 'Times New Roman', }} >
                                                                <table>
                                                                    <tbody><tr style={{ color: '#000' }}>
                                                                        <th style={{ width: '10%' }}>Invoice Date</th>
                                                                        <th style={{ width: '15%' }}>Invoice No</th>
                                                                        <th style={{ width: '10%' }}>Order No</th>
                                                                        <th style={{ width: '10%' }}>Code</th>
                                                                        <th colspan="2">Amount</th>
                                                                        <th colspan="8">NARRATION</th>
                                                                    </tr>
                                                                    </tbody><tbody>
                                                                        <tr style={{ height: '200px' }}>
                                                                            <td rowspan="8" className="align-top">
                                                                                12th Jul, 2023
                                                                            </td>
                                                                            <td rowspan="8" className="align-top">
                                                                                66509</td>
                                                                            <td rowspan="8" className="align-top">
                                                                                66509</td>
                                                                            <td rowspan="8" className="align-top">
                                                                                100239</td>
                                                                            <td rowspan="6" className="align-top">
                                                                                ₦50,000
                                                                            </td>
                                                                            <td rowspan="6" className="align-top">00 K</td>
                                                                            <td colspan="8" className="align-top">
                                                                                PAYMNT FOR ELECTRICITY</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="bottom-section" style={{ display: 'flex', width: '97%', border: 'solid #000', marginLeft: '5px', fontFamily: 'Times New Roman', borderWidth: '1px' }}>
                                                                <div style={{ border: 'solid #000', width: '50%', borderWidth: '1px' }}>
                                                                    <p style={{ marginLeft: '10px', marginTop: '20px' }}>Prepared by:
                                                                        Name:Brookes</p>
                                                                    <p style={{ marginTop: '20px', marginLeft: '10px' }}>
                                                                        Signature/Date:12th Jul, 2023
                                                                    </p>
                                                                    <p style={{ marginTop: '20px', marginLeft: '10px' }}>Checked by:
                                                                        Name:..........................................................
                                                                    </p>
                                                                    <p style={{ marginTop: '20px', marginLeft: '10px' }}>
                                                                        Signature/Date:.........................................................
                                                                    </p>
                                                                </div>
                                                                <div style={{ border: 'solid #000', width: '25%', marginLeft: '10px', borderWidth: '1px' }}>
                                                                    <p style={{ marginLeft: '10px', marginTop: '20px' }}>Authorized by</p>
                                                                    <p style={{ textAlign: 'center', marginTop: '20px' }}>___________________
                                                                    </p>
                                                                    <p style={{ textAlign: 'center', marginTop: '20px' }}>Principal</p>
                                                                    <p style={{ marginTop: '20px', textAlign: 'center' }}>
                                                                        ............20...........</p>
                                                                    <p style={{ marginLeft: '10px', marginTop: '20px' }}>This authority is
                                                                        essential</p>
                                                                </div>
                                                                <div style={{ border: 'solid #000', width: '25%', marginLeft: '10px', borderWidth: '1px' }}>
                                                                    <p style={{ textAlign: 'center', marginTop: '70px' }}>
                                                                        ........................................</p>
                                                                    <p style={{ textAlign: 'center', marginTop: '20px' }}><i>Accountant</i>
                                                                    </p>
                                                                    <p style={{ marginTop: '20px', textAlign: 'center', marginBottom: '10px' }}>
                                                                        ............20...........</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <center><button type="button" className="btn btn-primary btn-lg" id="printButton">PRINT</button></center>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Supporting Document
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample" >
                                                    <div class="accordion-body">
                                                        <h5>NO UPLOADED DOCUMENT</h5>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <!-- end accordion --> */}
                                    </div>
                                    {/* <!-- end card-body --> */}
                                    <hr></hr>
                                    <div className="card-body">
                                        <div className="d-flex gap-2 flex-wrap mb-3">
                                            <button className="btn btn-primary" type="button">
                                                Approved
                                            </button>
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

export default ViewVoucher