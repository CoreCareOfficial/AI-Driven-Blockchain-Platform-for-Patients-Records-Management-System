import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
import PatientSettingPage from "../../pages/PatientSettingPage";

function Content(props) {
    // <RecordesPage />
    // <Profile isDoctor={props.isDoctor} />
    // <PatientAccessManagement />
    return (
        <>
            <div className="contentContainer">
                <PatientSettingPage/>
            </div>
        </>

    );
}

export default Content;