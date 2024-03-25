
import {  Route, Routes  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Landingpage from './Pages/Landingpage/Landingpage';
import Admin from './Admin/Admin';
import Navigation from './Pages/Nav/Navigation';
import Deductions from './Admin/Manage deductions/Deductions';
import Purchaseorderpage from './Purchase Order Pages/Purchaseorder';
// import Signup from './Pages/SignUp';
// import Login from './Pages/Login';
import SignUp from './Pages/SignUp/SignUp';
// import PurchaseOrder from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Pricing from './Pages/Pricing/Pricing';
import SignupBusiness from './Pages/SignUpVarieties/SignupBusiness';
import SignupPersonal from './Pages/SignUpVarieties/SignupPersonal';
import SignupStarter from './Pages/SignUpVarieties/SignupStarter';
import CrteCompny from './Admin/Create Company/CrteCompny';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SalaryStructure from './Admin/Manage Payroll/SalaryStructure';
import Viewdeduction from './Admin/View deductions/Viewdeduction';
import JournalEntries from './Admin/IncomeJournalEntries/JournalEntries';
import ManageUser from './Admin/Manage-user/ManageUser';
import ManageStep from './Admin/Manage-customers/ManageCustomer';
import ManageLevel from './Admin/Manage-level/ManageLevel';
import EditProfile from './Admin/Edit Profile/EditProfile';
import ChangePassword from './Admin/Change password/ChangePassword';
import AddExpenses from './Admin/Manage-expenses/AddExpenses'
import { InfoFooter } from './InfoFooter';
import { useNavigate } from 'react-router-dom';
import AdminOnb from './Admin/Admin/AdminOnb';
 
import ManageGrade from './Admin/Manage-grade/ManageGrade';
// import ManageEmployee from './Admin/ManageStaff/ManageEmployee';
import Payroll from './Admin/Manage Payroll/Payroll';
// import EditNewStaff from './Admin/ManageStaff/EditNewStaff';
import Payslip from './Admin/Payslip/Payslip';
import PurchaseOrder from './Admin/Purchase order/PurchaseOrder';
import PurchaseDelivery from './Admin/Purchase Delivery/Purchasedelivery';
import PurchaseOrderPage from './Purchase Order Pages/Purchaseorder';
import CreatePurchaseOrder from './Purchase Order Pages/Createpurchaseorder';
import SetNewPassword from './Pages/Set New Password/SetNewPassword';
import ForgotPassword from './Pages/Forgot Password/Forgot_password';
import PaymentInstruction from './Admin/PaymentInstruction';
import Remitance from './Admin/Manage Booking/Booking';
import Category from './Admin/Manage Category/Category';
import ViewCategory from './Admin/Manage Category/ViewCategory';
import Suppliers from './Admin/Suppliers/Suppliers';
import ChartAccount from './Admin/Charts-Account/ChartAccount';
import ManageCustomer from './Admin/Manage-customers/ManageCustomer';
import Invoice from './Admin/Sales-invoice/Invoice';
import IncomeExcel from './Admin/Income Excel/IncomeExcel';
import PaymentExcel from './Admin/Payment Excel/PaymentExcel';

import TrialBalance from './Admin/Trial-balance/TrialBalance';

import Create_invoice from './Admin/Sales-invoice/Create_invoice';
import Inflow from './Admin/Inflow/Inflow';
import Cashbook from './Admin/Cashbook/Cashbook';
import IncomeExpenditure from './Admin/Income & Expenditure/IncomeExpenditure';
import GeneralLedger from './Admin/General ledger/GeneralLedger';
import PaymentVoucher from './Admin/Payment-Voucher/PaymentVoucher';
import Schedule from './Admin/Payment-Voucher/Schedule';
import ViewVoucher from './Admin/Payment-Voucher/ViewVoucher';
import Booking from './Admin/Manage Booking/Booking';
import CreateBooking from './Admin/Manage Booking/CreateBooking';
import InvoicePayment from './Admin/Invoice-payment/InvoicePayment';
// import NewInvoice from './Admin/Invoice-payment/NewInvoicePayment';
import Deposit from './Admin/Deposit - lodgement/Deposit';
import ManagePurchaseDelivery from './Admin/Purchase Delivery/ManagepurchaseDelivery';
import Receipt from './Admin/Receipt/Receipt';
import AdvancePayments from './Admin/Receivables/AdvancePayments';
import SalesInvoicePayment from './Admin/Sales-invoice-payment/SalesInvoicePayment';
import AddIncome from './Admin/Receipt/NewIncome';
// import ProcessCashBook from './Admin/Process-CashBook/ProcessCashBook';
import ProcessActivityReport from './Admin/Process-Activity-Report/ProcessActivityReport';
import ProcessCashBook from './Admin/Process-CashBook/ProcessCashBook';
import CreatePaymentVoucher from './Admin/Payment-Voucher/CreatePaymentVoucher';
import ProcessGeneral from './Admin/Process-General-ledger/ProcessGeneral';

import IncomeProcess from './Admin/Income & expend/IncomeProcess';
import ManageExpenses from './Admin/Manage-expenses/ManageExpenses';
import EditUser from './Admin/Manage-customers/EditUser';
import Stocks from './Admin/Manage Items/Items';
// import Unit from './Admin/Manage_Unit/Unit';
import Items from './Admin/Manage Items/Items';
import Unit from './Admin/Manage_Unit/Unit';
import PrintReceipt from './Admin/Receipt/PrintReceipt';
import PrintExpenses from './Admin/Manage-expenses/PrintExpenses';
import PrintInvoice from './Admin/Sales-invoice/PrintInvoice';
import PrintPayment from './Admin/Receivables/PrintPayment';
import PrintSales from './Admin/Sales-invoice-payment/PrintSales';
import Requisition from './Admin/Manage-Requisition/Requisition';
import OfficialReceipt from './Admin/Official-Receipt/OfficialReceipt';
import Department from './Admin/Manage-Department/Department';
import PaymentOrder from './Admin/Official-Receipt/PaymentOrder';
// import Department from './Admin/Manage-Department/Department';
import PrintVoucher from './Admin/Payment-Voucher/PrintVoucher';
import ViewPayment from './Admin/Payment-Voucher/ViewPayment';
import PendingPayment from './Admin/Pending-payment/PendingPayment';
import PrintCheque from './Admin/Official-Receipt/PrintCheque';
import CompletedPayment from './Admin/Completed-payment/CompletedPayment';
import ViewPending from './Admin/Pending-payment/ViewPending';
import PrintOffReceipt from './Admin/Receipt/PrintOffReceipt';
import PrintCheque1 from './Admin/Official-Receipt/PrintCheque1';
import BulkEntries from './Admin/BulkEntries/BulkEntries';
import CreateRequisition from './Admin/Manage-Requisition/CreateRequisition';
// import EditRequisition from './Admin/Manage-Requisition/EditRequisition';
import ViewRequisition from './Admin/Manage-Requisition/ViewRequisition';
// import EditRequisition from './Admin/Manage-Requisition/EditRequisition';
import LoanAccount from './Admin/Loan Account/LoanAccount';
import CreateLoan from './Admin/Loan Account/CreateLoan';
import EditLoan from './Admin/Loan Account/EditLoan';
import SavingsAccounts from './Admin/Savings Account/SavingsAccount';
import CreateSavingsAccount from './Admin/Savings Account/CreateSavingsAccount';
import EditSavings from './Admin/Savings Account/EditSavings';
import ManageLoans from './Admin/Manage Loans & Advances/ManageLoans';
import CreateLoanAdvance from './Admin/Manage Loans & Advances/CreateLoanAdvance';
import ManageSavings from './Admin/Manage Savings/ManageSavings';
import CreateSavings from './Admin/Manage Savings/CreateSavings';
import EditUserss from './Admin/Manage-user/EditUser';
import BulkEntriesExcel from './Admin/BulkEntries Excel/BulkEntriesExcel';
import LoanRepayment from './Admin/Loan Repayment/Loan_Repayment';
import EditInvoice from './Admin/Sales-invoice/EditInvoice';
import EditLoanAdvance from './Admin/Manage Loans & Advances/EditLoanAdvance';
import SavingsExcel from './Admin/Manage-Savins-Excel/SavingsExcel';
import Role from './Admin/Manage-Role/Role';
import CreateRole from './Admin/Manage-Role/CreateRole';
import EditRole from './Admin/Manage-Role/EditRole';
import SavingsWithdrawal from './Admin/Savings Withdrawal/Savings_Withdrawal';
import LoanRepaymentExcel from './Admin/Loan Repayment Excel/LoanRepaymentExcel';
import ManageApproval from './Admin/Manage Approval/ManageApproval';
import SetNewApproval from './Admin/Manage Approval/SetNewApproval';
import ViewApproval from './Admin/Manage Approval/ViewApproval';
import CreateSales from './Admin/Sales/CreateSales';
import ManageSales from './Admin/Sales/ManageSales';
import BalanceSheet from './Admin/Balance Sheet/BalanceSheet';
import BalanceSheetPrint from './Admin/Balance Sheet Print/BalanceSheetPrint';
import EditBooking from './Admin/Manage Booking/EditBooking';
import MonthlyIncome from './Admin/Monthly Income/MonthlyIncome';
import MonthlyIncomeProcess from './Admin/Monthly Income & Expend/MonthlyIncomeProcess';






// import Payslip from './Admin/Payslip/Payslip';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [userIsInactive, setUserIsInactive] = useState(false);
  const inactivityThreshold = 600000; 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0);
  }, [location]);

 let inactivityTimer;
  
 const resetInactivityTimer = () => {
   if (inactivityTimer) {
     clearTimeout(inactivityTimer);
   }
 
   inactivityTimer = setTimeout(async () => {
   
     setUserIsInactive(true);
     await AsyncStorage.clear();
     navigate('/login');
     
   }, inactivityThreshold);
 };
 
 const handleUserActivity = () => {
   resetInactivityTimer();
 };
 
 useEffect(() => {
   resetInactivityTimer();
 
   const activityEvents = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
   activityEvents.forEach((event) => {
     document.addEventListener(event, handleUserActivity);
   });
 
   return () => {
     activityEvents.forEach((event) => {
       document.removeEventListener(event, handleUserActivity);
     });
 
     if (inactivityTimer) {
       clearTimeout(inactivityTimer);
     }
   };
 }, []);

  return (
    <>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/admin'element={<Admin/>}/>
        <Route path='/charts'element={<ChartAccount/>}/>
        <Route path='/journal_entries'element={<JournalEntries/>}/>
        <Route path='/manage_user'element={<ManageUser/>}/>
        <Route path='/manage_expenses'element={<ManageExpenses/>}/>
       <Route path='/category' element={<Category/>}/>
       <Route path='/customers' element={<ManageCustomer/>}/>
       <Route path='/view_category' element={<ViewCategory/>}/>
        <Route path='/invoice'element={<Invoice/>}/>
        <Route path='/income'element={<IncomeExcel/>}/>
        <Route path='/edit_user'element={<EditUser/>}/>
        <Route path='/payment'element={<PaymentExcel/>}/>
        <Route path='/grade'element={<ManageGrade/>}/>
        <Route path='/salary_structure'element={<SalaryStructure/>}/>
        <Route path='/payroll'element={<Payroll/>}/>
        <Route path='/info_footer'element={<InfoFooter/>}/>
        <Route path='/suppliers'element={<Suppliers/>}/>
        <Route path='/payment_voucher'element={<PaymentVoucher/>}/>
        <Route path='/schedule'element={<Schedule/>}/>
        <Route path='/view_voucher'element={<ViewVoucher/>}/>
        <Route path='/process_general'element={<ProcessGeneral/>}/>
        <Route path='/create_company'element={<CrteCompny/>}/>
        <Route path='/booking'element={<Booking/>}/>
        <Route path='/create_booking'element={<CreateBooking/>}/>
        <Route path='/invoice_payment'element={<InvoicePayment/>}/>
        <Route path='/savings_withdrawal'element={<SavingsWithdrawal/>}/>
        {/* <Route path='/invoiceprnt'element={<Invoiceprnt/>}/> */}
        {/* <Route path='/new_invoice'element={<NewInvoice/>}/> */}
        <Route path='/deposit'element={<Deposit/>}/>
        <Route path='/receipt'element={<Receipt/>}/>
        <Route path='/Purchase_Delivery'element={<PurchaseDelivery/>}/>
        <Route path='/ManagePurchase_Delivery'element={<ManagePurchaseDelivery/>}/>
        <Route path='/Purchase_Order'element={<PurchaseOrder/>}/>
        <Route path='/Purchase_Orderpage'element={<PurchaseOrderPage/>}/>
        <Route path='/CreatePurchase_Order'element={<CreatePurchaseOrder/>}/>
        <Route path='/Create_invoice'element={<Create_invoice/>}/>
        <Route path='/sales_invoice_payment'element={<SalesInvoicePayment/>}/>
        <Route path='/add_income'element={<AddIncome/>}/>
        <Route path='/create_paymentvoucher'element={<CreatePaymentVoucher/>}/>
        
        <Route path='/general'element={<GeneralLedger/>}/>
        <Route path='/cashbook'element={<Cashbook/>}/>
        <Route path='/inflow'element={<Inflow/>}/>
        <Route path='/income_expenditure'element={<IncomeExpenditure/>}/>
        <Route path='/trial_balance'element={<TrialBalance/>}/>
        <Route path='/create_company'element={<CrteCompny/>}/>
        <Route path='/admin_onboarding'element={<AdminOnb/>}/>
        <Route path='/signup'element={<SignUp/>}/>
        {/* <Route path='/login'element={<Login/>}/> */}
        <Route path='/pricing'element={<Pricing/>}/>
        <Route path='/signup_business'element={<SignupBusiness/>}/>
        <Route path='/signup_personal'element={<SignupPersonal/>}/>
        <Route path='/signup_starter'element={<SignupStarter/>}/>
        <Route path='/payslip'element={<Payslip/>}/>
        <Route path='/forgot_password'element={<ForgotPassword/>}/>
        <Route path='/set_new_password'element={<SetNewPassword/>}/>
        <Route path='/payment_instruction'element={<PaymentInstruction/>}/>
        <Route path='/remitance'element={<Remitance/>}/>
        <Route path='/loan_account'element={<LoanAccount/>}/>
        <Route path='/savings_account'element={<SavingsAccounts/>}/>
        <Route path='/create_savings'element={<CreateSavingsAccount/>}/>
        <Route path='/edit_savings'element={<EditSavings/>}/>
        <Route path='/loans_advances'element={<ManageLoans/>}/>
        <Route path='/create_loans'element={<CreateLoanAdvance/>}/>
        <Route path='/savings'element={<ManageSavings/>}/>
        <Route path='/create_savings_app'element={<CreateSavings/>}/>
        <Route path='/edit_userss'element={<EditUserss/>}/>

        <Route path='/EditProfile'element={<EditProfile/>}/>
        <Route path='/ChangePassword'element={<ChangePassword/>}/>
        <Route path='/advance_payments'element={<AdvancePayments/>}/>
        <Route path='/process_cash_book'element={<ProcessCashBook/>}/>
        <Route path='/process_ctivity_report'element={<ProcessActivityReport/>}/>
        <Route path='/income_print'element={<IncomeProcess/>}/>
        <Route path='/print_invoice'element={<PrintInvoice/>}/>
        <Route path='/print_receipt'element={<PrintReceipt/>}/>
        <Route path='/print_payment'element={<PrintPayment/>}/>
        <Route path='/print_sales'element={<PrintSales/>}/>
        <Route path='/print_expenses'element={<PrintExpenses/>}/>
        <Route path='/AddExpenses'element={<AddExpenses/>}/>
        <Route path='/items'element={<Items/>}/>
        <Route path='/unit'element={<Unit/>}/>
        <Route path='/requisition'element={<Requisition/>}/>
        <Route path='/create_requisition'element={<CreateRequisition/>}/>
        <Route path='/view_requisition'element={<ViewRequisition/>}/>
        <Route path='/official_receipt'element={<OfficialReceipt/>}/>
        <Route path='/print_voucher'element={<PrintVoucher/>}/>
        <Route path='/view_payment'element={<ViewPayment/>}/>
        <Route path='/view_pending'element={<ViewPending/>}/>
        <Route path='/pending_payment_voucher'element={<PendingPayment/>}/>
        <Route path='/create_loan'element={<CreateLoan/>}/>
        <Route path='/edit_loan'element={<EditLoan/>}/>
        <Route path='/completed_payment_voucher'element={<CompletedPayment/>}/>
        <Route path='/department'element={<Department/>}/>
        <Route path='/payment_order'element={<PaymentOrder/>}/>
        <Route path='/print_cheque'element={<PrintCheque/>}/>
        <Route path='/print_off_receipt'element={<PrintOffReceipt/>}/>
        <Route path='/print_cheque1'element={<PrintCheque1/>}/>
        <Route path='/bulk_payment_excel'element={<BulkEntriesExcel/>}/>
        <Route path='/bulk_payment'element={<BulkEntries/>}/>
        <Route path='/loan_repayment'element={<LoanRepayment/>}/>
        <Route path='/edit_invoice'element={<EditInvoice/>}/>
        <Route path='/edit_loan_advance'element={<EditLoanAdvance/>}/>
        <Route path='/savings_excel'element={<SavingsExcel/>}/>
        <Route path='/role'element={<Role/>}/>
        <Route path='/create_role'element={<CreateRole/>}/>
        <Route path='/edit_role'element={<EditRole/>}/>
        <Route path='/loan_repayment_excel'element={<LoanRepaymentExcel/>}/>
        <Route path='/approval_level'element={<ManageApproval/>}/>
        <Route path='/set_approval_level'element={<SetNewApproval/>}/>
        <Route path='/view_approval'element={<ViewApproval/>}/>
        <Route path='/sales'element={<ManageSales/>}/>
        <Route path='/create_sales'element={<CreateSales/>}/>
        <Route path='/balance_sheet'element={<BalanceSheet/>}/>
        <Route path='/balance_sheet_print'element={<BalanceSheetPrint/>}/>
        <Route path='/edit_booking'element={<EditBooking/>}/>
        <Route path='/monthly_income'element={<MonthlyIncome/>}/>
        <Route path='/monthly_income_process'element={<MonthlyIncomeProcess/>}/>
      </Routes>
    </>
  );
}
export default App;