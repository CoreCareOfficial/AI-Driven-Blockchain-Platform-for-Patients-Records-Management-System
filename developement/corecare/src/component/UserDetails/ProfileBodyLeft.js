import { MdPersonOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import { MdOutlineEditRoad } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { MdBloodtype } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdWorkOutline } from "react-icons/md";
import GeneralInfoItem from "./GeneralInfoItem";
import CardListContaier from "./CardListContaier";
import "../../css/UserPageStyle/profile.css"

function ProfileBodyLeft() {
    return (
        <div className="profile-body-left">
            <div className="profile-body-left-top">
                <div className="general-info">
                    <h3>General Information :</h3>
                    <div className="general-info-container">
                        <GeneralInfoItem icon={<MdPersonOutline />} title="Full Name :" value="Osama Alathwari" />
                        <GeneralInfoItem icon={<MdAlternateEmail />} title="Email :" value="Osama@gmail.com" />
                        <GeneralInfoItem icon={<FaVenusMars />} title="Gender" value="Male" />
                        <GeneralInfoItem icon={<MdLocalPhone />} title="Phone Number :" value="+967711379934" />
                        <GeneralInfoItem icon={<MdCalendarToday />} title="Date of Birth :" value="8 sep 1995" />
                        <GeneralInfoItem icon={<MdOutlineEditRoad />} title="Address :" value="Yemen, Taiz, Gamal Street" />
                        <GeneralInfoItem icon={<MdLanguage />} title="Nationality :" value="Yemeni" />
                        <GeneralInfoItem icon={<MdBloodtype />} title="Blood Type :" value="A+" />
                        <GeneralInfoItem icon={<GrStatusGoodSmall />} title="Status :" value="Osama" />
                        <GeneralInfoItem icon={<MdWorkOutline />} title="Job :" value="Fucker" />
                    </div>
                </div>
                <div className="profile-body-left-bottom">
                    <CardListContaier title="Current Medications :" items={['Medicine 1', 'Medicine 2', 'Medicine 3']} />
                    <CardListContaier title="Past Illnessess and Conditions :" items={['Condition 1', 'Condition 2', 'Condition 3']} />
                </div>
            </div>
        </div>
    )
}

export default ProfileBodyLeft;

