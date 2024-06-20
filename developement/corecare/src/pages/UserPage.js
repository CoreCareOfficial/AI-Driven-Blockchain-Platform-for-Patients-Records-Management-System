import FormlessFooter from "../component/FormlessFooter";
import "../css/UserPageStyle/userpage.css"
import Content from "../component/UserDetails/Content";
import PatientSidebarHandler from "../component/UserDetails/PatientSidebarHandler";
import { useState } from "react";
function UserPage() {

    const userType ="Doctor";
    const [active, setActive] = useState("Profile")

    const handleButtonClick = (text) => {
        setActive(text);
    };



    return (
        <>
            <div className="user">
                <PatientSidebarHandler userType={userType} handleButtonClick={handleButtonClick} />
                <Content userType={userType} active={active} />
            </div>
            <FormlessFooter />
        </>
    );
}

export default UserPage;