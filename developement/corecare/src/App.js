import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/home.css';
import './css/aboutus.css';
import Header from './component/Header';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUs';
function App() {
  return (
    <>
    <Header/> 
    {/* <HomePage/> */}
    <AboutUsPage/>
    </>
  );
}

export default App;
