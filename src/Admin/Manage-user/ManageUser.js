import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swal from 'sweetalert2';
import ManageUserUi from './ManageUserUi';
import { NavLink, useNavigate } from 'react-router-dom';



function ManageUser() {
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
  const [roleLoading, setRoleLoading] = useState(false);

  const [department, setDepartment] = useState("");
  const [department1, setDepartment1] = useState("");
  const [deptId, setDeptId] = useState("");
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const [permittedHeaders, setPermittedHeaders] = useState([]);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [trashClicked, setTrashClicked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [perm, setPerm] = useState([]);
  const [permId, setPermId] = useState([]);
  const [fullName, setFullName] = useState("");
  const [fullName1, setFullName1] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [selectedRole1, setSelectedRole1] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [roless, setRoless] = useState([]);
  const [address, setAddress] = useState("");
  const [office_address, setOfficeAddress] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

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

  useEffect(() => {
    const retrieveAdminStatus = async () => {
      try {
        const permitted = await AsyncStorage.getItem('permissions');
        if (permitted) {
          setPermittedHeaders(permitted);
        }
        const adminStatus = await AsyncStorage.getItem('admin');
          setIsAdmin(adminStatus === 'true');
        
  
        
      } catch (error) {
        console.error('Error retrieving admin status:', error);
      }
    };

    retrieveAdminStatus();
  }, []);


  //fetch records
  const fetchBeneficiaries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/users/fetch-all', { headers });

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

  const fetchRole = async () => {
    setRoleLoading(true);
    try {
      const response = await axios.get('https://api-sme.promixaccounting.com/api/v1/role/get-roles', { headers });
      const roleList = response.data?.data;
      // console.log(results);
      setRoless(roleList);
    } catch (error) {
      const errorStatus = error.response?.data?.message;
      console.log(errorStatus);
      setRoless([]);
    } finally {
      setRoleLoading(false);
    }
  };



  useEffect(() => {
    if (bearer) {
      fetchBeneficiaries();
      fetchRole();

    }
  }, [bearer]);

  //create beneficiary
  const createUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/users/create-new',
        {
          name: fullName,
          email: email,
          phone_no: phone,
          role: selectedRole
         
        },
        { headers }
      );
      console.log(response)
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
      const errorStatus = error.message;
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
    const foundUser = tableData.find(item => item.id === id);

    if (foundUser) {
        const { name, email, phone_no, roles } = foundUser;
        setSelectedUser(id);
        setFullName1(name || '');
        setEmail1(email || '');
        setPhone1(phone_no || '');
        setAddress(address || '');

        // Check if roles is not undefined and has at least one element
        if (roles && roles.length > 0) {
            setSelectedRole1(roles[0].id || '');
        } else {
            setSelectedRole1('');
        }

        setShow1(true);
        setEyeClicked(true);
    } else {
        console.error(`User with id ${id} not found`);
    }
};

// Log selectedUser whenever it changes
useEffect(() => {
}, [selectedUser]);



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
  const editUser = async (id) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api-sme.promixaccounting.com/api/v1/users/update-user',
        {
          name: fullName1,
          id: selectedId, 
          email: email1,
          phone_no: phone1,
          role: selectedRole1,
          user_id: selectedUser
        },
        { headers }
      );

      fetchBeneficiaries();
handleClose1();
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

  const handleIdChange = (e) =>{
    setSelectedId(e.target.value)
  }

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

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
};

  const handleRoleChange1 = (event) => {
    setSelectedRole1(event.target.value);
};


  return (
    <ManageUserUi
      // Pass necessary props from the logic to the UI component
      show={show}
      show1={show1}
      handleRoleChange={handleRoleChange}
      handleShow={handleShow}
      handleShow1={handleShow1}
      handleClose={handleClose}
      handleClose1={handleClose1}
      createUser={createUser}
      editUser={editUser}
      isLoading={isLoading}
      selectedRole={selectedRole}
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      entriesPerPage={entriesPerPage}
      setEntriesPerPage={setEntriesPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalEntries={totalEntries}
      permittedHeaders={permittedHeaders}
      totalPages={totalPages}
      startIndexx={startIndexx}
      endIndexx={endIndexx}
      isAdmin={isAdmin}
      displayedData={displayedData}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handleEyeClick={handleEyeClick}
      handleTrashClick={handleTrashClick}
      fullName={fullName}
      setFullName={setFullName}
      address={address}
      setAddress={setAddress}
      roless={roless}
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
      selectedRole1={selectedRole1}
      handleRoleChange1={handleRoleChange1}
     
    />
  )
}

export default ManageUser;