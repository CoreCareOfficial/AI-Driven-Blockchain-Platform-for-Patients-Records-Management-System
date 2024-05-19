import { useState } from "react";
import "../../css/UserPageStyle/dropdownbutton.css"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
function DropDownButton(props) {

    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="warapper">
            <div className="dropdown-button" onClick={handleClick}>
                <p>{expanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />} {props.icon}</p>
                <p>{props.text}</p>
            </div>

            <div style={{ display: `${expanded ? 'flex' : 'none'}` }} className="dropdown-content">
                <div className="dropdown-item">
                    {props.children}
                </div>

            </div>
        </div>
    );
}

export default DropDownButton;