import { CiSettings } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";


function ProfileHeaderIcon(props) {
    const ErrorIcon =
        <IconContext.Provider value={{ size: "1.5rem" }}>
            <MdErrorOutline />
        </IconContext.Provider>
    const NotificationIcon =
        <IconContext.Provider value={{ size: "1.5rem" }}>
            <IoMdNotifications />
        </IconContext.Provider>
    const SettingsIcon =
        <IconContext.Provider value={{ size: "1.5rem" }}>
            <CiSettings />
        </IconContext.Provider>
    return (
        <div className="profile-header-icon">
        <div>{ErrorIcon}</div>
        <div>{NotificationIcon}</div>
        <div>{SettingsIcon}</div>
        <div className="mini-profile-icon">
            <img className="image" src={props.image} alt="profile"></img>
        </div>
    </div>
    )
}

export default ProfileHeaderIcon


