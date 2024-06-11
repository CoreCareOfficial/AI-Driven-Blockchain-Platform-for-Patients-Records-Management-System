import { Link, Outlet } from "react-router-dom";

function SignOrLogin(props) {
    const goToLogin = 'Do you already have an account? Login';
    const goToSignUp = 'Need an account? Sign up';
    const login = '/login';
    const sign = '/signup';


    return (
        <>
            <Link to={props.goSign ? sign : login} style={{
                color: "#3146FF",
                display: 'block',
                width: '76%',
                textAlign: 'center',
                fontFamily: 'DM Sans',
                backgroundColor: "#272c34",
                fontSize: '12px',
                marginTop: "12px",
            }}>
                {props.goSign ? goToSignUp : goToLogin}
            </Link>
            <Outlet />
        </>
    );
};

export default SignOrLogin;