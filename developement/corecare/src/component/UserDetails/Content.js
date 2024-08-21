import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import PatientAccessManagement from "./PatientAccessManagement"
import RecordesPage from "../../pages/RecordesPage"
import PatientSettingPage from "../../pages/PatientSettingPage";
import AddAccount from "../hospitaldetails/AddAccount";
import AddLaboratoryAccount from "../hospitaldetails/AddLaboratoryAccount";
import AddDoctorAccount from "../hospitaldetails/AddDoctorAccount";
import AddRadiologyAccount from "../hospitaldetails/AddRadiologyAccount";
import AddPharmacyAccount from "../hospitaldetails/AddPharmacyAccount";
import EmergencyAccess from "./EmergecyAccess";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginInfo } from "../../Recoil/Atom";
import { useEffect } from "react";


function Content(props) {
    const setUserInfo = useSetRecoilState(loginInfo);
    const userInfoValue = useRecoilValue(loginInfo);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:4000/accesskey/getnotificationtoast/${userInfoValue.login}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    notificationsCount: jsonData
                }));
            }
            catch (error) {
                console.error(error.message);
            }
        }
        if (props.userType !== "Patient")
            // setTimeout(() => {
            fetchNotifications();
        // }, 5000);
    }, [props.active]);

    return (
        <>
            <div className="contentContainer">
                {
                    props.active === "Profile" ? <Profile userType={props.userType} />
                        : props.active === "All Records" ? <RecordesPage title={props.active} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                            : props.active === "Report" ? <RecordesPage title={props.active} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                                : props.active === "Lab test" ? <RecordesPage title={props.active} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                                    : props.active === "Radiology" ? <RecordesPage title={props.active} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                                        : props.active === "Prescription" ? <RecordesPage title={props.active} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                                            : props.active === "Summarized Files" ? <RecordesPage title={props.active} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                                                : props.active === "Add Patient" ? <AddAccount userType={props.userType} title={props.active} />
                                                    : props.active === "Add Doctor" ? <AddDoctorAccount userType={props.userType} title={props.active} />
                                                        : props.active === "Add Laboratory" ? <AddLaboratoryAccount userType={props.userType} title={props.active} />
                                                            : props.active === "Add Radiology" ? <AddRadiologyAccount userType={props.userType} title={props.active} />
                                                                : props.active === "Add Pharmacy" ? <AddPharmacyAccount userType={props.userType} title={props.active} />
                                                                    : props.active === "Patient Access Management" ? <PatientAccessManagement userType={props.userType} />
                                                                        : props.active === "Appointment Schedule" ? <div className="text-white">Appointment</div>
                                                                            : props.active === "Emergency Access" ? <EmergencyAccess userType={props.userType} handleCreateAccessKeyClick={props.handleCreateAccessKeyClick} />
                                                                                : props.active === "Settings" ? <PatientSettingPage userType={props.userType} />
                                                                                    : null
                }
            </div>
        </>

    );
}

export default Content;