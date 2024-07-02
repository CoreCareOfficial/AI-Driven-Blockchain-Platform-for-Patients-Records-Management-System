import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
import PatientSettingPage from "../../pages/PatientSettingPage";
import { useEffect, useRef, useState } from 'react';
import { loginInfo } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";
import AddAccount from "../hospitaldetails/AddAccount";

function Content(props) {
    const loginInfoValue = useRecoilValue(loginInfo);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const hasEffectRun = useRef(false);


    let userType = '';
    if (props.userType !== "Patient" && props.userType !== "Doctor") {
        userType = "healthcareproviders"
    }
    else {
        userType = 'Patients'
    }

    console.log(userType);

    const getUserData = async (fetchText, param) => {
        console.log('param;', param);
        console.log('fetchText:;', fetchText);
        try {
            const response = await fetch(fetchText, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                params: JSON.stringify(param),
            });
            const jsonData = await response.json();
            setUserInfo(jsonData);
            console.log("success");
        } catch (err) {
            setError(err.message);
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        if (!hasEffectRun.current) {
            getUserData(`http://192.168.137.1:5000/${userType}?email=${loginInfoValue.login}`);
            hasEffectRun.current = true;
        }
    }, [userType, loginInfoValue.login]);

    console.log('userInfo:', userInfo);
    console.log(userInfo);

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    if (!userInfo) {
        return <div style={{ color: 'white' }}>Loading...</div>;
    } else {
        console.log("userInfo", userInfo);
    }

    return (
        <>
            <div className="contentContainer">
                {
                    props.active === "Profile" ? <Profile userType={props.userType} userInfo={userInfo} />
                        : props.active === "All Records" ? <RecordesPage title={props.active} />
                            : props.active === "Report" ? <RecordesPage title={props.active} />
                                : props.active === "Lab test" ? <RecordesPage title={props.active} />
                                    : props.active === "Radiology" ? <RecordesPage title={props.active} />
                                        : props.active === "Prescription" ? <RecordesPage title={props.active} />
                                            : props.active === "Add Patient" ? <AddAccount userType={props.userType} title={props.active}/>
                                                : props.active === "Patient Access Management" ? <PatientAccessManagement />
                                                    : props.active === "Appointment Schedule" ? <div className="text-white">Appointment</div>
                                                        : props.active === "Settings" ? <PatientSettingPage userType={props.userType} userInfo={userInfo} />
                                                            : null
                }
            </div>
        </>

    );
}

export default Content;