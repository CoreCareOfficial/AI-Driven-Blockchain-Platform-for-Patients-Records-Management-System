import { Link } from "react-router-dom";


function ForgotButton() {

    return (
        <Link style={{
            color: "#ffffff",
            display: 'block',
            width: '76%',
            textAlign: 'right',
            fontFamily: 'DM Sans',
            backgroundColor: "#272c34",
            fontSize: '12px',
        }} to='/forget-password'>
            Forgotten password
        </Link>
    );
};

export default ForgotButton;