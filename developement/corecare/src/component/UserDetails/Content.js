import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
function Content(props) {
    // <RecordesPage />
    // <Profile isDoctor={props.isDoctor} />
    return (
        <>
            <div className="contentContainer">
                <PatientAccessManagement />
            </div>
        </>

    );
}

export default Content;