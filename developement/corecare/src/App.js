import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/home.css';
import './css/header.css';
import './css/aboutus.css';
import './css/service.css';
import './css/search.css';
import './css/contact.css';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUs';
import ServicePage from './pages/ServicePage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <>
    <Header/> 
    <HomePage/>
    {/* <AboutUsPage/> */}
    {/* <ServicePage/> */}
    {/* <SearchPage/> */}
    {/* <ContactPage/> */}
    </>
  );
}

export default App;
