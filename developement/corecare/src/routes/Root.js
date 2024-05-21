import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage'
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


function Root() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='about_us' element={<AboutUsPage />} />
                <Route path='services' element={<ServicePage />} />
                <Route path='search' element={<SearchPage />} />
                <Route path='contact' element={<ContactPage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='userprofile' element={<UserPage />} />
                <Route path='signup' element={<><Outlet /></>}>
                    <Route path="step-1" element={<SignupPage1 />} />
                    <Route path="step-2" element={<SignupPage />} />
                    <Route path='step-3' element={<SignupPage2 />} />
                    <Route path='step-4' element={<SignupPage3 />} />
                    <Route path='step-5' element={<SignupPage4 />} />
                    <Route path='end_step' element={<EndSignupPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default Root;
