import { useRecoilValue, useSetRecoilState } from "recoil";
import HeaderContainer from "./HaederContainer";
import NewNotificationContainer from "./NewNotificationContainer";
import PatientsTable from "./PatientsTable";
import { loginInfo } from "../../Recoil/Atom";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";




function PatientAccessManagement(props) {
    const userLoginInfo = useRecoilValue(loginInfo);
    const setUserInfo = useSetRecoilState(loginInfo);
    const [notifications, setNotifications] = useState([]);
    const [patients, setPatients] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            console.log("fetching notifications");
            try {
                const response = await fetch(`http://192.168.137.1:5000/accesskey/get/${userLoginInfo.login}`, {
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
                setNotifications(jsonData.notifications);
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    notificationsCount: jsonData
                }));
            }
            catch (error) {
                console.error(error.message);
            }
        };

        const fetchPatients = async () => {
            console.log("fetching patients");
            try {
                const response = await fetch(`http://192.168.137.1:5000/previouspatients/${userLoginInfo.login}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    toast.current.show({ severity: 'error', summary: 'Error Message', detail: `HTTP error! Status: ${response.status}`, life: 3000 });
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setPatients(jsonData.previousPatients);
            }
            catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: error.message, life: 3000 });
                console.error(error.message);
            }
        };
        fetchNotifications();
        fetchPatients();
    }, []);

    if (userLoginInfo.login === '') {
        return <div>you are not a provider</div>
    }

    // const patients = {
    //     patient1: {
    //         id: "123456789",
    //         name: "Ahmed",
    //         diagnosis: "General",
    //         nextVisit: "2024-01-01",
    //         accessed: "2024-01-01",
    //     },
    //     patient2: {
    //         id: "213456789",
    //         name: "Ahmed",
    //         diagnosis: "General",
    //         nextVisit: "2024-01-01",
    //         accessed: "2024-01-01",
    //     },
    //     patient3: {
    //         id: "321456789",
    //         name: "Ahmed",
    //         diagnosis: "General",
    //         nextVisit: "2024-01-01",
    //         accessed: "2024-01-01",
    //     },
    //     patient4: {
    //         id: "423156789",
    //         name: "Ahmed",
    //         diagnosis: "General",
    //         nextVisit: "2024-01-01",
    //         accessed: "2024-01-01",
    //     },
    // }

    return (

        <div className="main-container flex flex-col justify-between">
            <Toast ref={toast} />
            <HeaderContainer image={userLoginInfo.photo} />
            <NewNotificationContainer notifications={notifications} />
            <PatientsTable patients={patients} userType={props.userType} />

        </div>

    );
}

export default PatientAccessManagement