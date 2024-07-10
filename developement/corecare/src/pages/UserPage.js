import FormlessFooter from "../component/FormlessFooter";
import "../css/UserPageStyle/userpage.css"
import Content from "../component/UserDetails/Content";
import PatientSidebarHandler from "../component/UserDetails/PatientSidebarHandler";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CreateAccessKey from "../component/UserDetails/CreateAccessKey";
function UserPage() {

    const location = useLocation();
    const { userType } = location.state || {};
    console.log(userType);
    const [active, setActive] = useState("Profile")

    const handleButtonClick = (text) => {
        setActive(text);
    };

    const [createAccessKey, setCreateAccessKey] = useState(false);
    const handleCreateAccessKeyClick = ((e) => {

        setCreateAccessKey(!createAccessKey);
    });
    return (
        <>
            {userType ?
                <>
                        {
                            createAccessKey && <CreateAccessKey />
                        }
                    <div className="user">
                        <PatientSidebarHandler userType={userType} handleButtonClick={handleButtonClick} handleCreateAccessKeyClick={handleCreateAccessKeyClick} />
                        <Content userType={userType} active={active} />
                    </div>
                    <FormlessFooter />
                </>
                : null
            }
        </>
    );
}

export default UserPage;