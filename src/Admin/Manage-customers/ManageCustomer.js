import React, { useState, useEffect } from 'react';
import ManageCustomerUI from './ManageCustomerUI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



function ManageCustomer() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bearer, setBearer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [role1, setRole1] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [department, setDepartment] = useState("");
  const [department1, setDepartment1] = useState("");
  const [deptId, setDeptId] = useState("");
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [perm, setPerm] = useState([]);
  const [permId, setPermId] = useState([]);
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [address, setAddress] = useState("");
  const [office_address, setOfficeAddress] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState('');

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');

      if (value !== null) {
        setBearer(value);
        setAuthenticated(true);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

  // specify header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearer}`
  };

  //fetch records
  const fetchBeneficiaries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/customer', { headers });

      // console.log(response);
      const results = response.data?.data;
      setTableData(results);
      // console.log(results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized
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
      fetchBeneficiaries();

    }
  }, [bearer]);

  //create beneficiary
  const createCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/customer/add',
        {
          name: fullName,
          email: email,
          phone: phone,
          address: address,
          office_address: office_address,
        },
        { headers }
      );
      console.log(response.data.message)
      fetchBeneficiaries();
      handleClose();
      // return
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      console.log(response.data);

    } catch (error) {
      const errorStatus = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }


  //view records
  const handleEyeClick = (id) => {
    const foundCustomer = tableData.find(item => item.id === id);
        navigate('/edit_userss', { state: { selectedCustomer: foundCustomer } });
        setEyeClicked(true);
      };

  //delete function
  const handleTrashClick = async (id) => {
    try {
      const response = await axios.get(`https://payroll.patna.ng/api/admin/users/destroy?id=${id}`, { headers });
      fetchBeneficiaries();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      setTrashClicked(true);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });
      console.log(errorStatus);
    }
  };

  //update function
  const editCustomer = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://payroll.patna.ng/api/admin/users/update',
        {
          name: fullName1,
          // id: deptId, 
          email: email1,
          phone: phone1,
          
        },
        { headers }
      );

      fetchBeneficiaries();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });

      // console.log(response.data);
    } catch (error) {
      const errorStatus = error.response?.data?.message || 'An error occurred';

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: errorStatus,
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  //filter function
  const filteredData = tableData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const totalEntries = filteredData.length;
  const startIndexx = (currentPage - 1) * entriesPerPage + 1;
  const endIndexx = Math.min(startIndexx + entriesPerPage - 1, totalEntries);
  const displayedData = filteredData.slice(startIndexx - 1, endIndexx);




  return (
    <ManageCustomerUI
      // Pass necessary props from the logic to the UI component
      show={show}
      show1={show1}
      handleShow={handleShow}
      handleShow1={handleShow1}
      handleClose={handleClose}
      handleClose1={handleClose1}
      createCustomer={createCustomer}
      editCustomer={editCustomer}
      isLoading={isLoading}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      entriesPerPage={entriesPerPage}
      setEntriesPerPage={setEntriesPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalEntries={totalEntries}
      totalPages={totalPages}
      startIndexx={startIndexx}
      endIndexx={endIndexx}
      displayedData={displayedData}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handleEyeClick={handleEyeClick}
      handleTrashClick={handleTrashClick}
      fullName={fullName}
      setFullName={setFullName}
      address={address}
      setAddress={setAddress}
      office_address={office_address}
      setOfficeAddress={setOfficeAddress}
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      fullName1={fullName1}
      setFullName1={setFullName1}
      phone1={phone1}
      setPhone1={setPhone1}
      email1={email1}
      setEmail1={setEmail1}
      tableData={tableData}
      formatDate={formatDate}
    />
  )
}

export default ManageCustomer;