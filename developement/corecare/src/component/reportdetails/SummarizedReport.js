import React, { useEffect, useState } from "react";
function SummarizedReport(props) {
    const [summary, setSummary] = useState('');

    useEffect(() => {
        setSummary(props.summary);
    }, [props.summary]);

    const parseRecordString = (recordString) => {
        let htmlContent = recordString
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\* (.*?)/g, '<li>$1</li>') // Replace bullet points with list items
            .replace(/\n/g, '<br>'); // Replace newlines with <br>

        // Wrap list items with <ul>
        htmlContent = htmlContent.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

        // Remove unnecessary <br> before <ul> and after </ul>
        htmlContent = htmlContent.replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>');

        return htmlContent;
    };

    return (
        <>
            <h1 className="h_1">AI Summarized Report</h1>

            <div className="GeneralReport-container" style={{ color: '#000' }}>
                <div dangerouslySetInnerHTML={{ __html: summary && parseRecordString(summary) }}></div>
                {/* {summary && summary} */}
            </div>
        </>
    );
}
export default SummarizedReport;