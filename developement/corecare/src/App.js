import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/home.css';
import './css/aboutus.css';
import './css/service.css';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUs';
import ServicePage from './pages/ServicePage';
function App() {
  return (
    <>
    <Header/> 
    {/* <HomePage/> */}
    {/* <AboutUsPage/> */}
    <ServicePage/>
    </>
  );
}

export default App;
