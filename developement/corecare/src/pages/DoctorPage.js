import DoctorBody from "../component/DoctorDetails/DoctorBody"
import DoctorHeader from "../component/DoctorDetails/DoctorHeader"
import FormlessFooter from "../component/FormlessFooter"
import { useLocation } from 'react-router-dom';


function DoctorPage() {
    const location = useLocation();
    const { accessKey } = location.state || {};
    console.log(accessKey);
    const userType = "Hospital";
    return (

        <div className="doctor bg-[#181a1f] flex flex-col text-white overflow-hidden">
            <DoctorHeader />
            <DoctorBody userType={userType} />
            <FormlessFooter />
        </div>
    );
}

export default DoctorPage

