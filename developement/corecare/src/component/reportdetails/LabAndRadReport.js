import React, { useEffect, useState } from "react";
function LabAndRadReport(props) {
    const inp = {
        width: 'calc(100% - 80px)',
        borderBottom: '1px solid #3146ff',
        outline: 'none',
        fontWeight: '500',
    }

    const [info, setInfo] = useState(null);
    useEffect(() => {
        setInfo(props.info);
    }, [props.info]);

    if (!info) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {props.type === "lab" ? (
                <h1 className="h_1">Laboratory Test</h1>

            ) : <h1 className="h_1">Radiology Test</h1>
            }

            <div className="LabAndRadReport-container">
                {
                    info.testsList && info.testsList.map((labTest) => {
                        return (
                            <div key={labTest.id} style={{ width: '100%', minHeight: '8vh', margin: '0px', }}>
                                <div style={{ margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
                                    <input type='checkbox' value="" name="LaboratoryTest" checked={true} />
                                    <input style={inp} type="text" value={labTest.name} disabled={true} />
                                </div>
                            </div>
                        )
                    })
                }
                <div
                    style={{
                        width: '50%',
                        minHeight: '8vh',
                        margin: '0px auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <label
                        style={{
                            color: '#272c34',
                            fontWeight: '700',
                        }}>Notes : </label>
                    <textarea
                        style={{
                            resize: 'none',
                            outline: 'none',
                            borderBottom: '1px solid #3146ff',
                            width: 'calc(100% - 85px)',
                            paddingLeft: '5px',
                        }}
                        value={info.notes.notes}
                        disabled={true}>
                    </textarea>
                </div>
            </div>
        </>
    );
}
export default LabAndRadReport;