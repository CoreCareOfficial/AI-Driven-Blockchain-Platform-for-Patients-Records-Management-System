import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/home.css';
import './css/header.css';
import './css/aboutus.css';
import './css/service.css';
import './css/search.css';
import './css/contact.css';
import './css/RecordesPageStyle/recordes.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';              // Icons
// import 'primeflex/primeflex.css';                          // PrimeFlex

import Root from './routes/Root';

function App() {
  return (
    <>

      <Root />

    </>
  );
}

export default App;
