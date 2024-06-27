import "../../css/UserPageStyle/profile.css"
import defaultPic from '../../assets/user_signup.png'
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { loginInfo } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

function Profile(props) {
    const loginInfoValue = useRecoilValue(loginInfo);
    const [patient, setPatient] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const hasEffectRun = useRef(false);


    let userType = '';
    if (props.userType !== "Patient" && props.userType !== "Doctor") {
        userType = "healthcare_provider"
    }

    else {
        userType = props.userType + 's'
    }

    console.log(userType);

    const getUserData = async (fetchText, param) => {
        console.log(param);
        try {
            const response = await fetch(fetchText, {
                body: param
            });
            const jsonData = await response.json();
            setUserInfo(jsonData);
            console.log('succes');
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        if (!hasEffectRun.current) {
            getUserData(`http://localhost:5000/${userType}`, { email: loginInfoValue.login });
            console.log("user info: " + userInfo);
            console.log(userInfo);
            // const fetchPatientData = async () => {
            //     console.log(loginInfoValue.login);
            //     try {
            //         const response = await axios.get(`http://localhost:5000/${userType}`, {
            //             params: { email: loginInfoValue.login }
            //         });
            //         setPatient(response.data);
            //     } catch (err) {
            //         setError(err.response ? err.response.data : err.message);
            //         console.error('Error:', err);
            //     }
            // };


            // if (patient.patientid) {
            //     try {
            //         const response = await axios.get(`http://localhost:5000/socialmedia`, {
            //             params: {patientid: patient.patientid}
            //         });
            //     } catch (err) {
            //         setError(err.response ? err.response.data : err.message);
            //         console.error('Error:', err);
            //     }
            // }

            // fetchPatientData();
            hasEffectRun.current = true;
        }
    }, []);

    console.log('patient:', userInfo);
    console.log(userInfo);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <ProfileHeader
                userType={props.userType}
                location={patient.address}
                image={patient.personalphoto ? `data:image/jpeg;base64,${patient.personalphoto}` : defaultPic}
                username={patient.username}
                name={`${patient.firstname} ${patient.lastname}`}
                gender={patient.sex}
                age={calculateAge(patient.dateofbirth)}
            // Add other social media props if available in patient data
            />
            <ProfileBody userType={props.userType} patient={patient} />
        </div>
    )
}

// Helper function to calculate age
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default Profile;
