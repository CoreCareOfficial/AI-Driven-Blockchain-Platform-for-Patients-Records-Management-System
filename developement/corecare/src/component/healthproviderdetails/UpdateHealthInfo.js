import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { AddAccountForm, AddAccountInput3 } from "../settingdetails/TextFormSetting";
import AdvanceDemo from "../../utiles/Upload";
import { Toast } from "primereact/toast";


function UpdateHealthInfo(props) {

    const initialHealthInfo = {
        blood: '',
        bloodsugar: '',
        bloodpressure: '',
        heartrate: '',
        respiratoryrate: '',
        allergies: ''
    };
    const [notes, setNotes] = useState('');
    const [healthInfo, setHealthInfo] = useState(initialHealthInfo);

    const handleHealthInfo = (name, value) => {
        setHealthInfo((perviousHealth) => ({
            ...perviousHealth,
            [name]: value
        }))
    }
    const resetHealthInfo = () => {
        setHealthInfo(initialHealthInfo);
    };
    const toast = useRef(null);
    // const handleToast = (t) => {
    //     toast.current.show(t)
    // };

    const handleonSubmit = async () => {
        console.log('healthInfo', healthInfo);
        if (!props.patientid) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Selected Patient' });
        }
        try {
            const response = await fetch(`https://corecare-server.onrender.com/healthinfo/updatehealthinfo/${props.patientid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(healthInfo)
            });
            if (!response.ok) {
                console.log('An error occurred during the upload.(re)');
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Updating Health Info' });
                throw new Error('An error occurred during the upload.');
            }
            const jsonData = response.json();
            console.log(jsonData.message)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Health Info Updated Successfully' });
            resetHealthInfo();
        } catch (error) {
            console.log(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error In Updating Health Info' });
        }
    }
    return (
        <>
            <Toast ref={toast} />
            <Container style={{ width: '90%' }}>

                <div style={{ height: '60vh', margin: '16px auto' }}>
                    {/* <AddAccountForm label="Add"> */}
                    <h1 style={{ color: '#fff', fontSize: '1.5em', fontWeight: '600', margin: '10px 0px' }}>Add Notes and Upload Files</h1>
                    <div style={{ padding: '16px', marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexDirection: 'column' }}>
                        <textarea rows={3} placeholder="  Write Notes .." style={{
                            margin: '16px auto',
                            width: '100%',
                            padding: '6px',
                            borderBottom: '1px solid #3f4652',
                            outline: 'none',
                            fontWeight: '500',
                            backgroundColor: '#181a1f',
                            color: '#fff',
                            resize: 'none',
                            minHeight: '10vh'
                        }}
                            onChange={(e) => setNotes(e.target.value)}
                        >

                        </textarea>
                        <AdvanceDemo
                            patientid={props.patientid}
                            keyuser={props.keyuser}
                            userType={props.userType}
                            notes={notes}
                        />
                        {/* <AddAccountPassport title="Upload the document" /> */}
                    </div>
                    {/* </AddAccountForm> */}
                </div>
                <div style={{ height: '30vh' }}>
                    <AddAccountForm label="Update Health Info" onSubmit={handleonSubmit}>
                        <h1 style={{ color: '#fff', fontSize: '1.5em', fontWeight: '600', margin: '10px 0px' }}>Update Health Info</h1>
                        <div style={{ marginTop: '10px', borderRadius: '8px', backgroundColor: '#272c34', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                            <>
                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                    <AddAccountInput3 label="Blood (HP) :" name="blood" value={healthInfo.blood} type="number" placeholder="" handleHealthInfo={(name, value) => handleHealthInfo(name, value)} />
                                    <AddAccountInput3 label="Blood Sugar :" name="bloodsugar" value={healthInfo.bloodsugar} type="number" placeholder="" handleHealthInfo={(name, value) => handleHealthInfo(name, value)} />
                                    <AddAccountInput3 label="Blood Pressure :" name="bloodpressure" value={healthInfo.bloodpressure} type="number" placeholder="" handleHealthInfo={(name, value) => handleHealthInfo(name, value)} />
                                </div>

                                <div style={{ paddingRight: '5px', marginTop: '10px', width: '40%' }}>
                                    <AddAccountInput3 label="Heart Rate (Pulse):" name="heartrate" value={healthInfo.heartrate} type="number" placeholder="" handleHealthInfo={(name, value) => handleHealthInfo(name, value)} />
                                    <AddAccountInput3 label="Respiratory Rate :" name="respiratoryrate" value={healthInfo.respiratoryrate} type="number" placeholder="" handleHealthInfo={(name, value) => handleHealthInfo(name, value)} />
                                    <AddAccountInput3 label="Allergies :" name="allergies" value={healthInfo.allergies} type="text" placeholder="" handleHealthInfo={(name, value) => handleHealthInfo(name, value)} />
                                </div>
                            </>
                        </div>
                    </AddAccountForm>
                </div>
            </Container >
        </>
    );
}
export default UpdateHealthInfo;
