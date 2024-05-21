// import { useFormStatus } from "react-dom/server";

import { Link, Outlet } from "react-router-dom";

function Submit(props) {
    // const { pending } = useFormStatus();
    return (
        <>
            <button style={{
                color: "#ffffff",
                backgroundColor: '#3146FF',
                width: '100%',
                minWidth: '40px',
                height: '34px',
                borderRadius: '50PX',
                fontFamily: 'DM Sans',
                margin: "14px 0 6px 0"
            }}
                type="submit" value={props.name}>
                {/* {pending ? "Submitting..." : "Submit"} */}
                {/* <Link to={props.path} > */}
                {props.name}
                {/* </Link> */}
            </button>
            <Outlet />
        </>
    );
};

export default Submit;