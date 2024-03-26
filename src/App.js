
import {  Route, Routes  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Admin from './Admin/Admin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';

import ViewLoan from './Admin/Loans/ViewLoan';
import SignIn from './Pages/Sign in/SignIn';
import Applications from './Admin/Applications/Applications';
// import ViewGrants from './Admin/Grants/ViewGrants';
// import Grants from './Admin/Grants/Grants';
import Loans from './Admin/Loans/Loans';
import Grants from './Admin/Grants/Grants';
import ViewGrants from './Admin/Grants/ViewGrants';
import ViewApplication from './Admin/Applications/ViewApplication';
import AdminHome from './Admin/AdminHome/AdminHome';
import Booking from './Admin/Registration/Registration';
import Registration from './Admin/Registration/Registration';






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
        <Route path='/'element={<AdminHome/>}/>
        <Route path='/login'element={<SignIn/>}/>
        <Route path='/admin'element={<Admin/>}/>
        <Route path='/applications'element={<Applications/>}/>
        <Route path='/view_application'element={<ViewApplication/>}/>
        <Route path='/view_applicant_loan'element={<ViewLoan/>}/>
        <Route path='/view_applicant_grant'element={<ViewGrants/>}/>
        {/* <Route path='/view_grants'element={<ViewGrants/>}/> */}
        {/* <Route path='/view_applicant_grant'element={<ViewGrant/>}/> */}
        <Route path='/grants'element={<Grants/>}/>
        <Route path='/loans'element={<Loans/>}/>
        <Route path='/registration'element={<Registration/>}/>
      </Routes>
    </>
  );
}
export default App;