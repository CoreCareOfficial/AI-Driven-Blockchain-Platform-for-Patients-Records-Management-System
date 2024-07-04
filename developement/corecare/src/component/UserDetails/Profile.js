import "../../css/UserPageStyle/profile.css"
import defaultPic from '../../assets/user_signup.png'
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../Recoil/Atom";
import { useEffect, useRef, useState } from "react";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";


function Profile(props) {
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
            setTimeout(() => {
                getUserData(`http://192.168.137.1:5000/${userType}?email=${loginInfoValue.login}`);
                hasEffectRun.current = true;
            }, 350);
        }
    }, [userType, loginInfoValue.login]);

    console.log('userInfo:', userInfo);
    console.log(userInfo);

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    if (!userInfo) {
        return <ProfileSkeleton />;
    } else {
        console.log("userInfo", userInfo);
    }

    return (
        <div className="profile-container">
            <ProfileHeader
                userType={props.userType}
                location={userInfo.address}
                country={userInfo.country}
                image={userInfo.facilityphoto
                    ? `data:image/jpeg;base64,${userInfo.facilityphoto}`
                    : userInfo.personalphoto
                        ? `data:image/jpeg;base64,${userInfo.personalphoto}`
                        : defaultPic}
                username={userInfo.username}
                name={userType === "healthcareproviders" ? userInfo.name : `${userInfo.firstname} ${userInfo.secondname} ${userInfo.thirdname} ${userInfo.lastname}`}
                gender={userInfo.sex}
                age={calculateAge(userInfo.dateofbirth)}
                userId={userInfo.email}
            // Add other social media props if available in patient data
            />
            <ProfileBody userType={props.userType} userInfo={userInfo} facilityInfo={userType === "healthcareproviders" ? userInfo : null}
            />
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
