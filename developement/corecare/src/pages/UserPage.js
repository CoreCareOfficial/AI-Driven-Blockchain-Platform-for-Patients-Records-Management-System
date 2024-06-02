import FormlessFooter from "../component/FormlessFooter";
import "../css/UserPageStyle/userpage.css"
import Content from "../component/UserDetails/Content";
import PatientSidebarHandler from "../component/UserDetails/PatientSidebarHandler";
import { useState } from "react";
function UserPage() {

    const isDoctor = true;
    const [active, setActive] = useState("Profile")

    const handleButtonClick = (text) => {
        setActive(text);
    };



    return (
        <>
            <div className="user">
                <PatientSidebarHandler isDoctor={isDoctor} handleButtonClick={handleButtonClick} />
                <Content isDoctor={isDoctor} active={active}/>
            </div>
            <FormlessFooter />
        </>
    );
}

export default UserPage;