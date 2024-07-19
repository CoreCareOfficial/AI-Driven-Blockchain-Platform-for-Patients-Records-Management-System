import ProfileHeaderIcon from "../UserDetails/ProfileHeaderIcon"
import H1 from "../H1"
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../Recoil/Atom";
import defaultPic from '../../assets/user_signup.png'

function DoctorHeader() {
    const loginInfoValue = useRecoilValue(loginInfo);
    return (
        <div className="flex flex-row justify-between border-b border-[#272C34]">
            <H1 name="text-cennter my-auto pl-3 font-poston " title='Core Care' />
            <ProfileHeaderIcon image={loginInfoValue.photo ? `${loginInfoValue.photo}` : defaultPic} />
        </div>
    );
}

export default DoctorHeader;