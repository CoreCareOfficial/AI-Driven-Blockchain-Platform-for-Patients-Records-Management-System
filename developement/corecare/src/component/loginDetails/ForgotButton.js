

function ForgotButton() {
    const forgotEvent = () => {
        alert("Forgot password");
    };
    return (
        <button style={{
            color: "#ffffff",
            display: 'block',
            width: '76%',
            textAlign: 'right',
            fontFamily: 'DM Sans',
            backgroundColor: "#272c34",
            fontSize: '12px',
        }} onClick={forgotEvent}>
            Forgotten password
        </button>
    );
};

export default ForgotButton;