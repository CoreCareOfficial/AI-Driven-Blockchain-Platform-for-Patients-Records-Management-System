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
        isDoctor={props.isDoctor}
        active={active}
        handlePersonalClick={handlePersonalClick}
        handlePublicClick={handlePublicClick}
      />
      <div className="profile-body">
        {active === 'personal' || !props.isDoctor ? <PersonalInformation /> : <PublicInformation />}
      </div>
    </>
  );
}

export default ProfileBody;
