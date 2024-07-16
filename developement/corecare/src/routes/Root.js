import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SignupPage1 from '../pages/SignupPage1';
import SignupPage2 from '../pages/SignupPage2';
import SignupPage3 from '../pages/SignupPage3';
import SignupPage4 from '../pages/SignupPage4';
import AboutUsPage from '../pages/AboutUs';
import ServicePage from '../pages/ServicePage';
import SearchPage from '../pages/SearchPage';
import ContactPage from '../pages/ContactPage';
import UserPage from '../pages/UserPage';
import EndSignupPage from '../pages/EndSignupPage';
import VerifyCodePage from '../pages/VerifyCodePage';
import DoctorPage from '../pages/DoctorPage';
import DoctorSignupPage from '../pages/DoctorSignupPage';
import HealthcareFacilitySignupPage from '../pages/HealthcareFacilitySignupPage';
import HealthcareFacilitySignupPage2 from '../pages/HealthcareFacilitySignupPage2';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import ScrollToTop from '../utiles/ScrollToTop';
import PdfViewer from '../component/FilesUploadAndViw/PdfViewer';
import FileUpload from '../component/FilesUploadAndViw/FileUpload';
import DicomViewer from '../component/FilesUploadAndViw/DicomViewer';
import ReportPage from '../pages/ReportPage';

function Root() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='about_us' element={<AboutUsPage />} />
                <Route path='services' element={<ServicePage />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='forget-password' element={<ForgetPasswordPage />} />
                <Route path='userprofile' element={<UserPage />} />
                <Route path='doctor' element={<DoctorPage />} />
                <Route path='signup' element={<><Outlet /></>}>
                    <Route path="" element={<SignupPage1 />} />
                    <Route path="step-1" element={<SignupPage />} />
                    <Route path='step-2' element={<SignupPage2 />} />
                    <Route path='step-3' element={<SignupPage3 />} />
                    <Route path='step-4' element={<DoctorSignupPage />} />
                    <Route path='password-step' element={<SignupPage4 />} />
                    <Route path='HealthcareFacility-step-1' element={<HealthcareFacilitySignupPage />} />
                    <Route path='HealthcareFacility-step-2' element={<HealthcareFacilitySignupPage2 />} />
                    <Route path='verify-code' element={<VerifyCodePage />} />
                    <Route path='end_step' element={<EndSignupPage />} />
                </Route>
                <Route path='read-pdf' element={<PdfViewer />} />
                <Route path='view-dicom' element={<DicomViewer />} />
                {/* <Route path='prescription' element={<Prescription />} /> */}
                <Route path='open-report' element={<ReportPage />} />
                <Route path='pdf' element={<FileUpload />} />
            </Routes>
        </>
    );
}

export default Root;
