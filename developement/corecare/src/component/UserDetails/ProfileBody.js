import ProfileBodyLeft from "./ProfileBodyLeft";
import ProfileBodyRight from "./ProfileBodyRight";
import ProfileBodyBottom from "./ProfileBodyBottom";
import "../../css/UserPageStyle/profile.css"

function ProfileBody() {
  return (
    <div className="profile-body">
      <ProfileBodyLeft />
      <ProfileBodyRight />
      <ProfileBodyBottom />
    </div>
  );
}

export default ProfileBody;
