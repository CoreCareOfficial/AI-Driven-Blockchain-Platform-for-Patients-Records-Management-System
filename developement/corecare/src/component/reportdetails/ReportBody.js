import React from "react";
function ReportBody(props) {
    return (
        <>
            <div style={{
                backgroundColor: '#fff',
                border: 'solid 2px black',
                display:'flex',
                flexDirection:'column',
                width: '100%',
                height: '100%',
                minHeight: '50vh',
                margin: '15px auto',
                borderRadius: '15px',
                padding: '10px',
            }} className="ReportBody">
                {props.children}
            </div>
        </>
    );
}
export default ReportBody;