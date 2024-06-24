import Submit from "./Submit";


function FormLogin(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.onContinue) {
            props.onContinue();
        }
        else
            console.log('error')
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