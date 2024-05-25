import FormlessFooter from "../component/FormlessFooter";
import "../css/UserPageStyle/userpage.css"
import Content from "../component/UserDetails/Content";
import PatientSidebarHandler from "../component/UserDetails/PatientSidebarHandler";
function UserPage() {

    const isDoctor = true;

    return (
        <>
            <div className="user">
                <PatientSidebarHandler isDoctor={isDoctor} />
                <Content isDoctor={isDoctor} />
            </div>
            <FormlessFooter />
        </>
    );
}

export default UserPage;