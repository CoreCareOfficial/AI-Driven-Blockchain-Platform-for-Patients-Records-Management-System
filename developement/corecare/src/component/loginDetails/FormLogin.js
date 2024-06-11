import Submit from "./Submit";
import { useNavigate } from 'react-router-dom';


function FormLogin(props) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        if (props.onContinue) {
            props.onContinue();
            console.log('tyyuu');
        }
        else
            console.log('error')

        navigate(props.path); // Redirect on successful submission
    };

    return (
        <form style={{
            width: '85%',
            textAlign: 'center',
            margin: "10px 0 0 0"
        }} onSubmit={handleSubmit}>
            {props.children}
            <Submit name={props.buttonName} />
        </form>
    );
};

export default FormLogin;