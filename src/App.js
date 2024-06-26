
import {  Route, Routes  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Admin from './Admin/Admin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';

import ViewLoan from './Admin/Loans/ViewLoan';
import SignIn from './Pages/Sign in/SignIn';
import Applications from './Admin/Applications/Applications';

// import Grants from './Admin/Grants/Grants';
import Loans from './Admin/Loans/Loans';
import Grants from './Admin/Grants/Grants';
import ViewGrants from './Admin/Grants/ViewGrants';
import ViewApplication from './Admin/Applications/ViewApplication';
import AdminHome from './Admin/AdminHome/AdminHome';
import Booking from './Admin/Registration/Registration';
import Registration from './Admin/Registration/Registration';
import ViewRegistration from './Admin/Registration/ViewRegistration';
import Role from './Admin/Manage-Role/Role';
import ManageLevel from './Admin/Manage-level/ManageLevel';
import ManageUser from './Admin/Manage-user/ManageUser';
import ViewLoan1 from './Admin/Loans/ViewLoan1';
import ViewRegistration1 from './Admin/Registration/ViewRegistration1';
import ViewGrant1 from './Admin/Grants/ViewGrant1';
import CreateRole from './Admin/Manage-Role/CreateRole';
import EditRole from './Admin/Manage-Role/EditRole';
import CreateLevel from './Admin/Manage-level/CreateLevels';
import UpdateApprovalLevels from './Admin/Manage-level/UpdateApprovalLevels';
import Approvals from './Admin/Approvals/Approvals';
import ViewApprovals1 from './Admin/Approvals/ViewGrantApprovals1';
import GrantApprovals from './Admin/Approvals/GrantApprovals';
import ViewGranApprovals1 from './Admin/Approvals/ViewGrantApprovals1';
import ViewLoanApprovals1 from './Admin/Approvals/ViewLoanApprovals1';
import DisbursedLoan from './Admin/Disbursed/DisbursedLoan';
import DisbursedGrant from './Admin/Disbursed/DisbursedGrant';






// import Payslip from './Admin/Payslip/Payslip';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
//   const [userIsInactive, setUserIsInactive] = useState(false);
//   const inactivityThreshold = 600000; 
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Scroll to the top of the page when the route changes
//     window.scrollTo(0, 0);
//   }, [location]);

//  let inactivityTimer;
  
//  const resetInactivityTimer = () => {
//    if (inactivityTimer) {
//      clearTimeout(inactivityTimer);
//    }
 
//    inactivityTimer = setTimeout(async () => {
   
//      setUserIsInactive(true);
//      await AsyncStorage.clear();
//      navigate('/login');
     
//    }, inactivityThreshold);
//  };
 
//  const handleUserActivity = () => {
//    resetInactivityTimer();
//  };
 
//  useEffect(() => {
//    resetInactivityTimer();
 
//    const activityEvents = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
//    activityEvents.forEach((event) => {
//      document.addEventListener(event, handleUserActivity);
//    });
 
//    return () => {
//      activityEvents.forEach((event) => {
//        document.removeEventListener(event, handleUserActivity);
//      });
 
//      if (inactivityTimer) {
//        clearTimeout(inactivityTimer);
//      }
//    };
//  }, []);

  return (
    <>
      <Routes>
        <Route path='/'element={<SignIn/>}/>
        <Route path='/login'element={<SignIn/>}/>
        <Route path='/admin'element={<AdminHome/>}/>
        <Route path='/applications'element={<Applications/>}/>
        <Route path='/view_application'element={<ViewApplication/>}/>
        <Route path='/view_applicant_loan'element={<ViewLoan/>}/>
        <Route path='/view_applicant_loan1'element={<ViewLoan1/>}/>
        
        <Route path='/view_applicant_grant'element={<ViewGrants/>}/>
        <Route path='/view_applicant_grant1'element={<ViewGrant1/>}/>
        <Route path='/create_role'element={<CreateRole/>}/>
        <Route path='/create_level'element={<CreateLevel/>}/>
        <Route path='/update_approval_level'element={<UpdateApprovalLevels/>}/>
        <Route path='/edit_role'element={<EditRole/>}/>
        <Route path='/admin_home'element={<AdminHome/>}/>
        <Route path='/approval_loans'element={<Approvals/>}/>
        <Route path='/disbursed_loans'element={<DisbursedLoan/>}/>
        <Route path='/disbursed_grants'element={<DisbursedGrant/>}/>
        <Route path='/approval_grants'element={<GrantApprovals/>}/>
        <Route path='/view_grant_approval1'element={<ViewGranApprovals1/>}/>
        <Route path='/view_loan_approval1'element={<ViewLoanApprovals1/>}/>
        {/* <Route path='/view_applicant_grant'element={<ViewGrant/>}/> */}
        <Route path='/grants'element={<Grants/>}/>
        <Route path='/loans'element={<Loans/>}/>
        <Route path='/registration'element={<Registration/>}/>
        <Route path='/view_applicant'element={<ViewRegistration/>}/>
        <Route path='/view_applicant1'element={<ViewRegistration1/>}/>
        <Route path='/role'element={<Role/>}/>
        <Route path='/approval_level'element={<ManageLevel/>}/>
        <Route path='/manage_user'element={<ManageUser/>}/>
        {/* <Route path='/update_level'element={<UpdateLevels/>}/> */}
        
      </Routes>
    </>
  );
}
export default App;