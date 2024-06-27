import "../../css/UserPageStyle/profile.css"
import PersonalInformation from "./PersonalIformation";
import PublicInformation from "./PuplicInformation";
import PersonalPublicContainer from "./PersonalPublicContainer";
import { useState } from "react";

function ProfileBody(props) {
  const [active, setActive] = useState('personal');

  const handlePersonalClick = () => {
    setActive('personal');
  };

  const handlePublicClick = () => {
    setActive('public');
  };

  return (
    <>
      <PersonalPublicContainer
        userType={props.userType}
        active={active}
        handlePersonalClick={handlePersonalClick}
        handlePublicClick={handlePublicClick}
      />
      <div className="profile-body">
        {active === 'personal' && (props.userType === "Patient" || props.userType === "Doctor") ? <PersonalInformation userInfo={props.userInfo} /> : <PublicInformation userType={props.userType} />}
      </div>
    </>
  );
}

export default ProfileBody;
