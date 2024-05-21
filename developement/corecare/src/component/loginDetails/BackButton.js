
import { IconContext } from "react-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


function BackButton(props) {

    return (
        <Link to={props.backPath} style={{ backgroundColor: 'red', width: '80px', height: '70px', position: 'relative' }}>
            <IconContext.Provider value={{ color: "#3146FF", size: '1.2em' }}>
                <FaArrowLeftLong />
            </IconContext.Provider>
        </Link>
    );
};

export default BackButton;