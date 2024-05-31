
import { IconContext } from "react-icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



function BackButton() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back one level in the hierarchy
    };

    return (
        <button onClick={handleGoBack} style={{ position: 'relative', left: '-15px' }}>
            <IconContext.Provider value={{ color: "#3146FF", size: '1.2em' }}>
                <FaArrowLeftLong />
            </IconContext.Provider>
        </button>
    );
};

export default BackButton;