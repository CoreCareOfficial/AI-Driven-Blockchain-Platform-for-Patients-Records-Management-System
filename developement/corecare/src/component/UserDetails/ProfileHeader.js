import ImageNameContainer from "./ImageNameContainer"
import InfoContainer from "./InfoContainer"
import ProfileHeaderIcon from "./ProfileHeaderIcon"
import "../../css/UserPageStyle/profile.css"
import { useEffect, useRef, useState } from "react";

function ProfileHeader(props) {
    const [userSocialmedia, setUserSocialmedia] = useState(null);
    const hasEffectRun = useRef(false);

    const getUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/socialmedia/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();
            setUserSocialmedia(jsonData);
            console.log("Success:", jsonData);
        } catch (err) {
            console.error("Error:", err);
        }
    };
    useEffect(() => {
        if (!hasEffectRun.current) {

            getUserData(props.userId);

            hasEffectRun.current = true;
        }
    }, []);
    console.log("user socialmedia: " + userSocialmedia[0][0].link);
    console.log(userSocialmedia);
    return (
        <div className="profile-header">
            <ProfileHeaderIcon image={props.image} />
            <ImageNameContainer userType={props.userType} location={props.location} image={props.image} username={props.username} display={true} name={props.name} gender={props.gender} age={props.age} />
            <InfoContainer twitter={props.twitter} insta={props.insta} linkedin={props.linkedin} fb={props.fb} whatsapp={props.whatsapp} />
            <hr />
        </div>
    )
}

export default ProfileHeader

