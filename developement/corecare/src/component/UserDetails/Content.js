import "../../css/UserPageStyle/content.css"
// import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
function Content(props) {
    // <PatientAccessManagement />
    // <Profile isDoctor={props.isDoctor} />
    return (
        <>
            <div className="contentContainer">
                <RecordesPage />
            </div>
        </>

    );
}

export default Content;