import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
import PatientSettingPage from "../../pages/PatientSettingPage";

function Content(props) {

    return (
        <>
            <div className="contentContainer">
                {
                    props.active === "Profile" ? <Profile isDoctor={props.isDoctor} />
                        : props.active === "All Records" ? <RecordesPage />
                            : props.active === "Patient Access Management" ? <PatientAccessManagement />
                                : props.active === "Appointment Schedule" ? <div className="text-white">Appointment</div>
                                    : props.active === "Settings" ? <PatientSettingPage />
                                        : null
                }
            </div>
        </>

    );
}

export default Content;