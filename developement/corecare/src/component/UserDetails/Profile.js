import "../../css/UserPageStyle/profile.css"
import defaultPic from '../../assets/user_signup.png'
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";


function Profile(props) {
    const userInfo = props.userInfo;

    let userType = '';
    if (props.userType !== "Patient" && props.userType !== "Doctor") {
        userType = "healthcareproviders"
    }
    else {
        userType = 'Patients'
    }

    console.log(userType);

    return (
        <div className="profile-container">
            <ProfileHeader
                userType={props.userType}
                location={userInfo.address}
                country={userInfo.country}
                image={userInfo.personalphoto ? `data:image/jpeg;base64,${userInfo.personalphoto}` : defaultPic}
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
