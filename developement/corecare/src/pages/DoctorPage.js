import DoctorBody from "../component/DoctorDetails/DoctorBody"
import DoctorHeader from "../component/DoctorDetails/DoctorHeader"
import FormlessFooter from "../component/FormlessFooter"


function DoctorPage() {
    return (

        <div className="doctor bg-[#181a1f] flex flex-col text-white overflow-hidden">
            <DoctorHeader />
            <DoctorBody />
            <FormlessFooter />
        </div>
    )
}

export default DoctorPage

