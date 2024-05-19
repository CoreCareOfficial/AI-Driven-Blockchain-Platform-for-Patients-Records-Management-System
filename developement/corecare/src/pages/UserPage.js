import FormlessFooter from "../component/FormlessFooter";
import "../css/UserPageStyle/userpage.css"
import SideBar from "../component/UserDetails/SideBar";
import Content from "../component/UserDetails/Content";
function UserPage() {

    return (
        <>
        <div className="user">
        <SideBar />
        <Content />
        </div>
        <FormlessFooter mail="corecareofficial@gmail.com" phoneNumber="+967 711 379 934" textLogo="@corecare 2024" followText="Follow for more" />
        </>
    );
}

export default UserPage;