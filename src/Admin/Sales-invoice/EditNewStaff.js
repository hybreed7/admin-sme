import React, {useState, useEffect} from 'react';
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

function EditNewStaff() {
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
const [bearer, setBearer] = useState('');

const handleDateChange = (event) => {
  setSelectedDate(event.target.value);
};

const handleEmployDateChange = (event) => {
  setSelectedEmployDate(event.target.value);
};

const handleResignDateChange = (event) => {
  selectedResignDate(event.target.value);
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



    return (
        <div>

            <div className="main-content">
                <AdminHeaderNav/>

                <div className="content-header row align-items-center m-0">
                    
                    <div className="col-sm-8 header-title p-0">
                        <div className="media">
                            <div className="header-icon text-success mr-3"><i className="typcn typcn-spiral"></i></div>
                            <div className="media-body">
                                <h1 className="font-weight-bold">Staff </h1>
                                <small></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="body-content">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="create-new-staff-card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fs-17 font-weight-600 mb-0 textInput">All Staff</h6>
                                </div>
                                {/* <div className="text-right modal-effect ">
                                    <a href="window.history.back();" className="btn btn-success rounded-pill w-100p btn-sm mr-1">
                                        <i className="fas fa-plus"></i> Back
                                    </a>
                                </div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-body">
                                            <form id="frm_main" method="post">
                                                <input type="hidden" name="_token" value="KiSRjT32h6F7th6RHz8yCxwK7Muj2Y0m4UR37urv"/>
                                                    <h4>Section A:</h4>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Title</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="title" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Surname</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} name="lastname" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">First Name</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstname" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Middle Name</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} name="middlename" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Date
                                                                    of Birth</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="date" onChange={handleDateChange}  name="dob" value={selectedDate} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Gender</label>
                                                                <div className="col-sm-9">
                                                                    <select name="gender" className="form-control" required="" value={selectedGender} onChange={handleGenderChange}>
                                                                        <option value="">Select Gender</option>
                                                                        <option value="Male">Male</option>
                                                                        <option value="Female">Female</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Marital Status</label>
                                                                <div className="col-sm-9">
                                                                    <select name="marital_status" className="form-control" required="" value={selectedStatus} onChange={handleStatusChange}>
                                                                        <option value="">
                                                                        </option>
                                                                        <option value="Single">Single</option>
                                                                        <option value="Married">Married</option>
                                                                        <option value="Divorce">Divorce</option>
                                                                        <option value="Widow">Widow</option>
                                                                    </select>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Phone Number</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone_number" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Email</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Staff ID</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={staffId} onChange={(e) => setStaffId(e.target.value)} name="staff_id" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">RSA Number</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={rsa} onChange={(e) => setRsa(e.target.value)} name="rsa_number" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h4>Section B:</h4>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Qualification</label>
                                                                <div className="col-sm-9">

                                                                    <select className="form-control" required="" name="qualification" value={selectedCertificate} onChange={handleCertificateChange}>
                                                                        <option value="First School Leaving Certificate">First School Leaving
                                                                            Certificate</option>
                                                                        <option value="ND">ND</option>
                                                                        <option value="NCE">NCE</option>
                                                                        <option value="HND">HND</option>
                                                                        <option value="BSc">BSc</option>
                                                                        <option value="B.ed">B.ed</option>
                                                                        <option value="BSc.ed">BSc.ed</option>
                                                                        <option value="M.ed">M.ed</option>
                                                                        <option value="MSc">MSc</option>
                                                                        <option value="phd">PhD</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
  <div className="form-group row">
    <label htmlFor="example-text-input" className="col-sm-3 col-form-label font-weight-400">Step</label>
    <div className="col-sm-9">
      <select name="step" className="form-control" value={selectedStep} onChange={handleStepChange} >
        <option value="">Select Step</option>
        {tableData.map((item) => (
          <option key={item.id} value={item.id}>
            {item.description}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>
                                                        <div class="col-md-6">
                                                            <div class="form-group row">
                                                                <label for="example-text-input" class="col-sm-3 col-form-label font-weight-400">Grade</label>
                                                                <div class="col-sm-9">
                                                                    <select name="grade" class="form-control" value={selectedGrade} onChange={handleGradeChange}>
                                                                        <option value="">Select Grade</option>
                                                                        {tableData1.map((item) => (
          <option key={item.id} value={item.id}>
            {item.description}
          </option>
        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group row">
                                                                <label for="example-text-input" class="col-sm-3 col-form-label font-weight-400">Level</label>
                                                                <div class="col-sm-9">
                                                                    <select name="level" class="form-control" required="" value={selectedLevel} onChange={handleLevelChange}>
                                                                        <option value="">Select Level</option>
                                                                        {tableData2.map((item) => (
          <option key={item.id} value={item.id}>
            {item.description}
          </option>
        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group row">
                                                                <label for="example-text-input" class="col-sm-3 col-form-label font-weight-400">Department</label>
                                                                <div class="col-sm-9">

                                                                    <select name="dept_id" class="form-control" required="" value={selectedDepartment} onChange={handleDepartmentChange}>
                                                                        <option value="">Select Department</option>
                                                                        {tableData3.map((item) => (
          <option key={item.id} value={item.id}>
            {item.description}
          </option>
        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h4>Section C</h4>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Country</label>
                                                                <div className="col-sm-9">
                                                                    <select name="country" className="form-control" required="" id="country" value={selectedCountry} onChange={handleCountryChange}>
                                                                        <option value="">
                                                                            Select Country
                                                                        </option>
                                                                        <option value="1">AFGHANISTAN</option>
                                                                        <option value="2">ALBANIA</option>
                                                                        <option value="3">ALGERIA</option>
                                                                        <option value="4">AMERICAN SAMOA</option>
                                                                        <option value="5">ANDORRA</option>
                                                                        <option value="6">ANGOLA</option>
                                                                        <option value="7">ANGUILLA</option>
                                                                        <option value="8">ANTARCTICA</option>
                                                                        <option value="9">ANTIGUA AND BARBUDA</option>
                                                                        <option value="10">ARGENTINA</option>
                                                                        <option value="11">ARMENIA</option>
                                                                        <option value="12">ARUBA</option>
                                                                        <option value="13">AUSTRALIA</option>
                                                                        <option value="14">AUSTRIA</option>
                                                                        <option value="15">AZERBAIJAN</option>
                                                                        <option value="16">BAHAMAS</option>
                                                                        <option value="17">BAHRAIN</option>
                                                                        <option value="18">BANGLADESH</option>
                                                                        <option value="19">BARBADOS</option>
                                                                        <option value="20">BELARUS</option>
                                                                        <option value="21">BELGIUM</option>
                                                                        <option value="22">BELIZE</option>
                                                                        <option value="23">BENIN</option>
                                                                        <option value="24">BERMUDA</option>
                                                                        <option value="25">BHUTAN</option>
                                                                        <option value="26">BOLIVIA</option>
                                                                        <option value="27">BOSNIA AND HERZEGOVINA</option>
                                                                        <option value="28">BOTSWANA</option>
                                                                        <option value="29">BOUVET ISLAND</option>
                                                                        <option value="30">BRAZIL</option>
                                                                        <option value="31">BRITISH INDIAN OCEAN TERRITORY</option>
                                                                        <option value="32">BRUNEI DARUSSALAM</option>
                                                                        <option value="33">BULGARIA</option>
                                                                        <option value="34">BURKINA FASO</option>
                                                                        <option value="35">BURUNDI</option>
                                                                        <option value="36">CAMBODIA</option>
                                                                        <option value="37">CAMEROON</option>
                                                                        <option value="38">CANADA</option>
                                                                        <option value="39">CAPE VERDE</option>
                                                                        <option value="40">CAYMAN ISLANDS</option>
                                                                        <option value="41">CENTRAL AFRICAN REPUBLIC</option>
                                                                        <option value="42">CHAD</option>
                                                                        <option value="43">CHILE</option>
                                                                        <option value="44">CHINA</option>
                                                                        <option value="45">CHRISTMAS ISLAND</option>
                                                                        <option value="46">COCOS (KEELING) ISLANDS</option>
                                                                        <option value="47">COLOMBIA</option>
                                                                        <option value="48">COMOROS</option>
                                                                        <option value="49">CONGO</option>
                                                                        <option value="50">CONGO, THE DEMOCRATIC REPUBLIC OF THE</option>
                                                                        <option value="51">COOK ISLANDS</option>
                                                                        <option value="52">COSTA RICA</option>
                                                                        <option value="53">COTE D'IVOIRE</option>
                                                                        <option value="54">CROATIA</option>
                                                                        <option value="55">CUBA</option>
                                                                        <option value="56">CYPRUS</option>
                                                                        <option value="57">CZECH REPUBLIC</option>
                                                                        <option value="58">DENMARK</option>
                                                                        <option value="59">DJIBOUTI</option>
                                                                        <option value="60">DOMINICA</option>
                                                                        <option value="61">DOMINICAN REPUBLIC</option>
                                                                        <option value="62">ECUADOR</option>
                                                                        <option value="63">EGYPT</option>
                                                                        <option value="64">EL SALVADOR</option>
                                                                        <option value="65">EQUATORIAL GUINEA</option>
                                                                        <option value="66">ERITREA</option>
                                                                        <option value="67">ESTONIA</option>
                                                                        <option value="68">ETHIOPIA</option>
                                                                        <option value="69">FALKLAND ISLANDS (MALVINAS)</option>
                                                                        <option value="70">FAROE ISLANDS</option>
                                                                        <option value="71">FIJI</option>
                                                                        <option value="72">FINLAND</option>
                                                                        <option value="73">FRANCE</option>
                                                                        <option value="74">FRENCH GUIANA</option>
                                                                        <option value="75">FRENCH POLYNESIA</option>
                                                                        <option value="76">FRENCH SOUTHERN TERRITORIES</option>
                                                                        <option value="77">GABON</option>
                                                                        <option value="78">GAMBIA</option>
                                                                        <option value="79">GEORGIA</option>
                                                                        <option value="80">GERMANY</option>
                                                                        <option value="81">GHANA</option>
                                                                        <option value="82">GIBRALTAR</option>
                                                                        <option value="83">GREECE</option>
                                                                        <option value="84">GREENLAND</option>
                                                                        <option value="85">GRENADA</option>
                                                                        <option value="86">GUADELOUPE</option>
                                                                        <option value="87">GUAM</option>
                                                                        <option value="88">GUATEMALA</option>
                                                                        <option value="89">GUINEA</option>
                                                                        <option value="90">GUINEA-BISSAU</option>
                                                                        <option value="91">GUYANA</option>
                                                                        <option value="92">HAITI</option>
                                                                        <option value="93">HEARD ISLAND AND MCDONALD ISLANDS</option>
                                                                        <option value="94">HOLY SEE (VATICAN CITY STATE)</option>
                                                                        <option value="95">HONDURAS</option>
                                                                        <option value="96">HONG KONG</option>
                                                                        <option value="97">HUNGARY</option>
                                                                        <option value="98">ICELAND</option>
                                                                        <option value="99">INDIA</option>
                                                                        <option value="100">INDONESIA</option>
                                                                        <option value="101">IRAN, ISLAMIC REPUBLIC OF</option>
                                                                        <option value="102">IRAQ</option>
                                                                        <option value="103">IRELAND</option>
                                                                        <option value="104">ISRAEL</option>
                                                                        <option value="105">ITALY</option>
                                                                        <option value="106">JAMAICA</option>
                                                                        <option value="107">JAPAN</option>
                                                                        <option value="108">JORDAN</option>
                                                                        <option value="109">KAZAKHSTAN</option>
                                                                        <option value="110">KENYA</option>
                                                                        <option value="111">KIRIBATI</option>
                                                                        <option value="112">KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF</option>
                                                                        <option value="113">KOREA, REPUBLIC OF</option>
                                                                        <option value="114">KUWAIT</option>
                                                                        <option value="115">KYRGYZSTAN</option>
                                                                        <option value="116">LAO PEOPLE'S DEMOCRATIC REPUBLIC</option>
                                                                        <option value="117">LATVIA</option>
                                                                        <option value="118">LEBANON</option>
                                                                        <option value="119">LESOTHO</option>
                                                                        <option value="120">LIBERIA</option>
                                                                        <option value="121">LIBYAN ARAB JAMAHIRIYA</option>
                                                                        <option value="122">LIECHTENSTEIN</option>
                                                                        <option value="123">LITHUANIA</option>
                                                                        <option value="124">LUXEMBOURG</option>
                                                                        <option value="125">MACAO</option>
                                                                        <option value="126">MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF</option>
                                                                        <option value="127">MADAGASCAR</option>
                                                                        <option value="128">MALAWI</option>
                                                                        <option value="129">MALAYSIA</option>
                                                                        <option value="130">MALDIVES</option>
                                                                        <option value="131">MALI</option>
                                                                        <option value="132">MALTA</option>
                                                                        <option value="133">MARSHALL ISLANDS</option>
                                                                        <option value="134">MARTINIQUE</option>
                                                                        <option value="135">MAURITANIA</option>
                                                                        <option value="136">MAURITIUS</option>
                                                                        <option value="137">MAYOTTE</option>
                                                                        <option value="138">MEXICO</option>
                                                                        <option value="139">MICRONESIA, FEDERATED STATES OF</option>
                                                                        <option value="140">MOLDOVA, REPUBLIC OF</option>
                                                                        <option value="141">MONACO</option>
                                                                        <option value="142">MONGOLIA</option>
                                                                        <option value="143">MONTSERRAT</option>
                                                                        <option value="144">MOROCCO</option>
                                                                        <option value="145">MOZAMBIQUE</option>
                                                                        <option value="146">MYANMAR</option>
                                                                        <option value="147">NAMIBIA</option>
                                                                        <option value="148">NAURU</option>
                                                                        <option value="149">NEPAL</option>
                                                                        <option value="150">NETHERLANDS</option>
                                                                        <option value="151">NETHERLANDS ANTILLES</option>
                                                                        <option value="152">NEW CALEDONIA</option>
                                                                        <option value="153">NEW ZEALAND</option>
                                                                        <option value="154">NICARAGUA</option>
                                                                        <option value="155">NIGER</option>
                                                                        <option value="156">NIGERIA</option>
                                                                        <option value="157">NIUE</option>
                                                                        <option value="158">NORFOLK ISLAND</option>
                                                                        <option value="159">NORTHERN MARIANA ISLANDS</option>
                                                                        <option value="160">NORWAY</option>
                                                                        <option value="161">OMAN</option>
                                                                        <option value="162">PAKISTAN</option>
                                                                        <option value="163">PALAU</option>
                                                                        <option value="164">PALESTINIAN TERRITORY, OCCUPIED</option>
                                                                        <option value="165">PANAMA</option>
                                                                        <option value="166">PAPUA NEW GUINEA</option>
                                                                        <option value="167">PARAGUAY</option>
                                                                        <option value="168">PERU</option>
                                                                        <option value="169">PHILIPPINES</option>
                                                                        <option value="170">PITCAIRN</option>
                                                                        <option value="171">POLAND</option>
                                                                        <option value="172">PORTUGAL</option>
                                                                        <option value="173">PUERTO RICO</option>
                                                                        <option value="174">QATAR</option>
                                                                        <option value="175">REUNION</option>
                                                                        <option value="176">ROMANIA</option>
                                                                        <option value="177">RUSSIAN FEDERATION</option>
                                                                        <option value="178">RWANDA</option>
                                                                        <option value="179">SAINT HELENA</option>
                                                                        <option value="180">SAINT KITTS AND NEVIS</option>
                                                                        <option value="181">SAINT LUCIA</option>
                                                                        <option value="182">SAINT PIERRE AND MIQUELON</option>
                                                                        <option value="183">SAINT VINCENT AND THE GRENADINES</option>
                                                                        <option value="184">SAMOA</option>
                                                                        <option value="185">SAN MARINO</option>
                                                                        <option value="186">SAO TOME AND PRINCIPE</option>
                                                                        <option value="187">SAUDI ARABIA</option>
                                                                        <option value="188">SENEGAL</option>
                                                                        <option value="189">SERBIA AND MONTENEGRO</option>
                                                                        <option value="190">SEYCHELLES</option>
                                                                        <option value="191">SIERRA LEONE</option>
                                                                        <option value="192">SINGAPORE</option>
                                                                        <option value="193">SLOVAKIA</option>
                                                                        <option value="194">SLOVENIA</option>
                                                                        <option value="195">SOLOMON ISLANDS</option>
                                                                        <option value="196">SOMALIA</option>
                                                                        <option value="197">SOUTH AFRICA</option>
                                                                        <option value="198">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                                                                        <option value="199">SPAIN</option>
                                                                        <option value="200">SRI LANKA</option>
                                                                        <option value="201">SUDAN</option>
                                                                        <option value="202">SURINAME</option>
                                                                        <option value="203">SVALBARD AND JAN MAYEN</option>
                                                                        <option value="204">SWAZILAND</option>
                                                                        <option value="205">SWEDEN</option>
                                                                        <option value="206">SWITZERLAND</option>
                                                                        <option value="207">SYRIAN ARAB REPUBLIC</option>
                                                                        <option value="208">TAIWAN, PROVINCE OF CHINA</option>
                                                                        <option value="209">TAJIKISTAN</option>
                                                                        <option value="210">TANZANIA, UNITED REPUBLIC OF</option>
                                                                        <option value="211">THAILAND</option>
                                                                        <option value="212">TIMOR-LESTE</option>
                                                                        <option value="213">TOGO</option>
                                                                        <option value="214">TOKELAU</option>
                                                                        <option value="215">TONGA</option>
                                                                        <option value="216">TRINIDAD AND TOBAGO</option>
                                                                        <option value="217">TUNISIA</option>
                                                                        <option value="218">TURKEY</option>
                                                                        <option value="219">TURKMENISTAN</option>
                                                                        <option value="220">TURKS AND CAICOS ISLANDS</option>
                                                                        <option value="221">TUVALU</option>
                                                                        <option value="222">UGANDA</option>
                                                                        <option value="223">UKRAINE</option>
                                                                        <option value="224">UNITED ARAB EMIRATES</option>
                                                                        <option value="225">UNITED KINGDOM</option>
                                                                        <option value="226">UNITED STATES</option>
                                                                        <option value="227">UNITED STATES MINOR OUTLYING ISLANDS</option>
                                                                        <option value="228">URUGUAY</option>
                                                                        <option value="229">UZBEKISTAN</option>
                                                                        <option value="230">VANUATU</option>
                                                                        <option value="231">VENEZUELA</option>
                                                                        <option value="232">VIET NAM</option>
                                                                        <option value="233">VIRGIN ISLANDS, BRITISH</option>
                                                                        <option value="234">VIRGIN ISLANDS, U.S.</option>
                                                                        <option value="235">WALLIS AND FUTUNA</option>
                                                                        <option value="236">WESTERN SAHARA</option>
                                                                        <option value="237">YEMEN</option>
                                                                        <option value="238">ZAMBIA</option>
                                                                        <option value="239">ZIMBABWE</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">City</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row" id="homeAdressNationalityDiv">
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Address</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="address"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Employment
                                                                    Date</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="date" onChange={handleEmployDateChange} value={selectedEmployDate} name="employment_date"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Resignation/Retirement
                                                                    Date</label>
                                                                <div className="col-sm-9">
                                                                    <input class="form-control" required="" type="date"  name="res_retir_date" value={selectedResignDate} onChange={handleResignDateChange}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div classNames="form-group row">
                                                                <label for="example-text-input" class="col-sm-3 col-form-label font-weight-400">Account
                                                                    Number</label>
                                                                <div class="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} name="account_number"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400"> Bank Account
                                                                    </label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={bank} onChange={(e) => setBank(e.target.value)} name="account_bank"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group row">
                                                                <label for="example-text-input" className="col-sm-3 col-form-label font-weight-400">Medical
                                                                    Condition</label>
                                                                <div className="col-sm-9">
                                                                    <input className="form-control" required="" type="text" value={medical} onChange={(e) => setMedical(e.target.value)}  name="medical_condition"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h3>Statory Deductions</h3>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="form-group form-check">
                                                                <input type="checkbox" name="pension" className="form-check-input" value="1" id="checkPension"/>
                                                                    <label className="form-check-label" for="checkPension">Pension</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group form-check">
                                                                <input type="checkbox" name="nhis" className="form-check-input" value="1" id="checkNHIS"/>
                                                                    <label className="form-check-label" for="checkNHIS">NHIS</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group form-check">
                                                                <input type="checkbox" className="nhfund"  value="1" id="checkNHFUND"/>
                                                                    <label className="form-check-label" for="checkNHFUND">NHFUND</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="submit" class="btn btn-success"><span id="loaderg" className="spinner-border spinner-border-sm me-2" role="status" style={{display:"none",}}></span>Save changes</button>
                                                    </div>
                                            </form>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InfoFooter/>
        </div>
    )
}

export default EditNewStaff