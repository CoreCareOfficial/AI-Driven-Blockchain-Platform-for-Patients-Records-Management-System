import { VscError } from "react-icons/vsc";
import "../../css/UserPageStyle/profile.css"

function GeneralInfoItem(props) {
    return (
        <div className="general-info-item">
        <div className="general-info-item-icon">
            <span className="icon">
                {props.icon ? props.icon : <VscError/>}
            </span>
            <p>{props.title ? props.title : "Unknown"}</p>
        </div>
        <p className="value">{props.value ? props.value : "Unknown"}</p>
    </div>
    );
}

export default GeneralInfoItem;

