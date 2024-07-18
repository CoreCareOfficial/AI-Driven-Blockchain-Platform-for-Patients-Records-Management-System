import { useRecoilValue } from "recoil";
import Osama from "../../assets/osama.jpg"
import HeaderContainer from "./HaederContainer";
import NewNotificationContainer from "./NewNotificationContainer";
import PatientsTable from "./PatientsTable";
import { loginInfo } from "../../Recoil/Atom";
import { useEffect, useRef, useState } from "react";




function PatientAccessManagement() {
    const hasEffectRun = useRef(false);
    const userLoginInfo = useRecoilValue(loginInfo);
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
            }
            catch (error) {
                console.error(error.message);
            }
        }
        if (!hasEffectRun.current) {
            fetchNotifications();
            hasEffectRun.current = true;
        }
    }, []);

    if (userLoginInfo.login === '') {
        return <div>you are not a provider</div>
    }
    // const notifications = {
    //     notf1: {
    //         sender: "Ahmed",
    //         accessKey: "7gkjksdfhgdflkgjdfkl"
    //     },
    //     notf2: {
    //         sender: "osama",
    //         accessKey: "iredfldkhjfflkgjdfkl"
    //     },
    //     notf3: {
    //         sender: "Muthanna",
    //         accessKey: "jyiojytjtgdflkgjdfkl"
    //     },
    //     notf4: {
    //         sender: "Azooz",
    //         accessKey: "otnjrlkjntrpojtrdftf"
    //     },
    // };

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