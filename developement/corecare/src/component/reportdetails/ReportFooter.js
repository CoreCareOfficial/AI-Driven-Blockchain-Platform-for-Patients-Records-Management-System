import React from "react";

function ReportFooter(props) {
    return (
        <>
            <div className="ReportFooter-container">
                <h6 className="h_6">{props.h6}</h6>
                <p style={{ textAlign: 'center' }}>{props.p}</p>
            </div>

        </>
    );
}
export default ReportFooter;