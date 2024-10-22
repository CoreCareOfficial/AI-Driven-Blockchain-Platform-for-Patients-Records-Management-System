import ImageNameContainer from "./ImageNameContainer"
import InfoContainer from "./InfoContainer"
import ProfileHeaderIcon from "./ProfileHeaderIcon"
import "../../css/UserPageStyle/profile.css"
import { useEffect, useState } from "react";



const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ProfileHeader(props) {
    const [userSocialmedia, setUserSocialmedia] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async (userId) => {
        try {
            const response = await fetch(`${SERVER_URL}/socialmedia/${userId}`, {
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
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getUserData(props.userId);
    }, [props.userId]);

    if (!isLoading && userSocialmedia.length > 0) {
    }
    return (
        <div className="profile-header">
            <ProfileHeaderIcon image={props.image} />
            <ImageNameContainer userType={props.userType} location={`${props.country}, ${props.location}`} image={props.image} username={props.username} display={true} name={props.name} gender={props.gender} age={props.age} />
            <InfoContainer
                twitter={userSocialmedia.find(sm => sm.type === 'twitter')?.link || ''}
                insta={userSocialmedia.find(sm => sm.type === 'instagram')?.link || ''}
                linkedin={userSocialmedia.find(sm => sm.type === 'linkedin')?.link || ''}
                fb={userSocialmedia.find(sm => sm.type === 'facebook')?.link || ''}
                whatsapp={userSocialmedia.find(sm => sm.type === 'whatsapp')?.link || ''}
            />
            <hr />
        </div>
    )
}

export default ProfileHeader

