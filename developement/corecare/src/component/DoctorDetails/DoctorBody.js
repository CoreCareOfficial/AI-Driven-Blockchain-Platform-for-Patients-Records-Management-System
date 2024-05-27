
import DoctorBodyLeft from "./DoctorBodyLeft";
import Osama from '../../assets/osama.jpg'



function DoctorBody() {
    return (
        <div className="flex flex-row text-white justify-between">
            <DoctorBodyLeft image={Osama} username="osama" name="Osama Alathwari" gender="Male" age="29" />
        </div>
    );
}

export default DoctorBody