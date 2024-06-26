import ImageNameContainer from "./ImageNameContainer"
import InfoContainer from "./InfoContainer"
import ProfileHeaderIcon from "./ProfileHeaderIcon"
import "../../css/UserPageStyle/profile.css"

function ProfileHeader(props) {
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

