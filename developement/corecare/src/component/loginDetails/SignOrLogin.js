
function SignOrLogin(props) {
    const goToLogin = 'Do you already have an account? Login';
    const goToSignUp = 'Need an account? Sign up';

    return (
        <button style={{
            color: "#3146FF",
            display: 'block',
            width: '76%',
            textAlign: 'center',
            fontFamily: 'DM Sans',
            backgroundColor: "#272c34",
            fontSize: '12px',
            marginTop: "12px",
        }} onClick={() => { alert(`${props.goSign ? goToSignUp : goToLogin}`) }}>
            {props.goSign ? goToSignUp : goToLogin}
        </button>
    );
};

export default SignOrLogin;