import ImageNameContainer from "./ImageNameContainer"
import InfoContainer from "./InfoContainer"
import ProfileHeaderIcon from "./ProfileHeaderIcon"

function ProfileHeader(props) {
    return (
        <div className="profile-header">
            <ProfileHeaderIcon image={props.image} />
            <ImageNameContainer image={props.image} username={props.username} name={props.name} gender={props.gender} age={props.age} />
            <InfoContainer twitter={props.twitter} insta={props.insta} linkedin={props.linkedin} fb={props.fb} whatsapp={props.whatsapp} />
            <hr />
        </div>
    )
}

export default ProfileHeader

