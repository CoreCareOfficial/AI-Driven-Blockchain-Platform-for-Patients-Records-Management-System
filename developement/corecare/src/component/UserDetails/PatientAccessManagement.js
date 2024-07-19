import { useRecoilValue, useSetRecoilState } from "recoil";
import HeaderContainer from "./HaederContainer";
import NewNotificationContainer from "./NewNotificationContainer";
import PatientsTable from "./PatientsTable";
import { loginInfo } from "../../Recoil/Atom";
import { useEffect, useState } from "react";




function PatientAccessManagement() {
    const userLoginInfo = useRecoilValue(loginInfo);
    const setUserInfo = useSetRecoilState(loginInfo);
    const [notifications, setNotifications] = useState([]);

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
        }
        setTimeout(() => {
            fetchNotifications();
        }, 5000);
    });

    if (userLoginInfo.login === '') {
        return <div>you are not a provider</div>
    }

    const patients = {
        patient1: {
            id: "123456789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
        patient2: {
            id: "213456789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
        patient3: {
            id: "321456789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
        patient4: {
            id: "423156789",
            name: "Ahmed",
            diagnosis: "General",
            nextVisit: "2024-01-01",
            accessed: "2024-01-01",
        },
    }

    return (

        <div className="main-container flex flex-col justify-between">
            <HeaderContainer image={userLoginInfo.photo} />
            <NewNotificationContainer notifications={notifications} />
            <PatientsTable patients={patients} />

        </div>

    );
}

export default PatientAccessManagement