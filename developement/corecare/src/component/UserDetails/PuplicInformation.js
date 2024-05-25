import { MdPersonOutline } from "react-icons/md";
import GeneralInfoItem from "./GeneralInfoItem";
import "../../css/UserPageStyle/profile.css"
import { MdStars } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { IoHourglassOutline } from "react-icons/io5";
import { BsTranslate } from "react-icons/bs";
import { IoMdSchool } from "react-icons/io";
import { FaUserNurse } from "react-icons/fa";
import { FaRegHospital } from "react-icons/fa6";
import { PiStethoscopeDuotone } from "react-icons/pi";
import { MdWatchLater } from "react-icons/md";
import WorkHoursCard from "./WorkHoursCard";
import ProfileBodyLeft from "./ProfileBodyLeft";
import ProfileBodyRight from "./ProfileBodyRight";


function PuplicInformation() {
    const WorkHours = {
        first: {
            hospitalName: "ALqaherah Hospital",
            workDays: "Sat-Sun",
            DayworkHours: "08:00 PM - 20:00 PM",
            NightworkHours: "08:00 PM - 20:00 PM",
        },
        second: {
            hospitalName: "ALqaherah Hospital",
            workDays: "Sat-Sun",
            DayworkHours: "08:00 PM - 20:00 PM",
            NightworkHours: "08:00 PM - 20:00 PM",
        },
        third: {
            hospitalName: "ALqaherah Hospital",
            workDays: "Sat-Sun",
            DayworkHours: "08:00 PM - 20:00 PM",
            NightworkHours: "08:00 PM - 20:00 PM",
        },
        fourth: {
            hospitalName: "ALqaherah Hospital",
            workDays: "Sat-Sun",
            DayworkHours: "08:00 PM - 20:00 PM",
            NightworkHours: "08:00 PM - 20:00 PM",
        },
    }
    return (
        <>
            <ProfileBodyLeft>
                <div className="profile-body-left-top">
                    <div className="general-info w-full">
                        <h3>Profissioal Information :</h3>
                        <div className="general-info-container">
                            <GeneralInfoItem icon={<MdPersonOutline />} title="Medical Degree :" value="MD" />
                            <GeneralInfoItem icon={<MdPersonOutline />} title="Specialization :" value="Cardiology" />
                            <GeneralInfoItem icon={<MdPersonOutline />} title="Years of Experience :" value="10 Years" />
                            <GeneralInfoItem icon={<MdPersonOutline />} title="Clinic Number :" value="01234567890" />
                        </div>
                    </div>

                    <div className="profile-body-left-bottom">
                        <div className="general-info w-full">
                            <h3>Practice Information :</h3>
                            <div className="general-info-container flex-col">
                                <GeneralInfoItem name="w-full" icon={<MdStars />} title="Practice Location(s) :" value="Althawrah" />
                                <GeneralInfoItem name="w-full" icon={<MdWorkspacePremium />} title="Hospital Affiliation(s) :" value="Physician's clinic" />
                                <GeneralInfoItem name="w-full" icon={<IoHourglassOutline />} title="Practice Hourse :" value="10 Years" />
                                <GeneralInfoItem name="w-full" icon={<BsTranslate />} title="Language(s) :" value="Arabic, English" />
                            </div>
                        </div>
                        <div className="general-info w-full">
                            <h3>Educational Information :</h3>
                            <div className="general-info-container flex-col">
                                <GeneralInfoItem name="w-full" icon={<IoMdSchool />} title="Medical School :" value="Taiz University" />
                                <GeneralInfoItem name="w-full" icon={<FaUserNurse />} title="Internships :" value="Alqaherah" />
                                <GeneralInfoItem name="w-full" icon={<FaRegHospital />} title="Residencies :" value="Cairo Hospital" />
                                <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Fellowships :" value="Jordan University" />
                            </div>
                        </div>
                    </div>
                </div>
            </ProfileBodyLeft>
            <ProfileBodyRight>
                <h3 className="flex items-center gap-2"> <MdWatchLater /> Work Hours :</h3>
                <div className="flex flex-col my-1">
                    <WorkHoursCard WorkHours={WorkHours} />
                </div>
            </ProfileBodyRight>
        </>
    )
}

export default PuplicInformation;

