import DoctorBody from "../component/DoctorDetails/DoctorBody"
import DoctorHeader from "../component/DoctorDetails/DoctorHeader"
import FormlessFooter from "../component/FormlessFooter"
import { useLocation } from 'react-router-dom';


function DoctorPage() {
    const location = useLocation();
    const { patientid, keyuser, userType } = location.state || {};
    return (

        <div className="doctor bg-[#181a1f] flex flex-col text-white overflow-hidden">
            <DoctorHeader />
            <DoctorBody userType={userType} patientid={patientid} keyuser={keyuser} />
            <FormlessFooter />
        </div>
    );
}

export default DoctorPage

