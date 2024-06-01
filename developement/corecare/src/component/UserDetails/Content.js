import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
import PatientSettingPage from "../../pages/PatientSettingPage";

function Content(props) {
    // <RecordesPage />
    // <Profile isDoctor={props.isDoctor} />
    // <PatientSettingPage/>
    return (
        <>
            <div className="contentContainer">
                <PatientAccessManagement />
            </div>
        </>

    );
}

export default Content;