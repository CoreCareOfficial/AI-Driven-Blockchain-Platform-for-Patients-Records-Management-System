
import DoctorBodyLeft from "./DoctorBodyLeft";
import Osama from '../../assets/osama.jpg'
import DoctorBodyRight from "./DoctorBodyRight";
import { MdOutlineVaccines } from "react-icons/md";




function DoctorBody(props) {

    return (
        <>
            <div className="doctor-body-top flex flex-row text-white justify-between">
                <DoctorBodyLeft image={Osama} username="osama" name="Osama Alathwari" gender="Male" age="29" />
                <DoctorBodyRight userType={props.userType} />
            </div>
        </>
    );
}

export default DoctorBody