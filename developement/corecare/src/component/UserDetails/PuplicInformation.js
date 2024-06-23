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


function PuplicInformation(props) {
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
        // third: {
        //     hospitalName: "ALqaherah Hospital",
        //     workDays: "Sat-Sun",
        //     DayworkHours: "08:00 PM - 20:00 PM",
        //     NightworkHours: "08:00 PM - 20:00 PM",
        // },
        // fourth: {
        //     hospitalName: "ALqaherah Hospital",
        //     workDays: "Sat-Sun",
        //     DayworkHours: "08:00 PM - 20:00 PM",
        //     NightworkHours: "08:00 PM - 20:00 PM",
        // },
    }
    return (
        <>
            <ProfileBodyLeft>
                <div className="profile-body-left-top">
                    <div className="general-info w-full">
                        {props.userType !== "Hospital" && props.userType !== "Laboratory" && props.userType !== "Radiology" && props.userType !== "Pharmacy" ? (
                            <h3>Profissioal Information :</h3>
                        ) : <h3>General Information :</h3>}

                        <div className="general-info-container">
                            {props.userType === "Hospital" || props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Pharmacy" ? (
                                <>
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Name :" value="Hospital name" />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Location :" value="Yemen-Taiz" />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Phone Number :" value="+967774714500" />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Email :" value="qahtan.dev@gmail.com" />
                                </>
                            ) :
                                <>
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Medical Degree :" value="MD" />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Specialization :" value="Cardiology" />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Years of Experience :" value="10 Years" />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Clinic Number :" value="01234567890" />
                                </>
                            }
                        </div>
                    </div>

                    <div className="profile-body-left-bottom">
                        <div className="general-info w-full">

                            {props.userType === "Hospital" ? (
                                <h3>List of Department :</h3>
                            ) : props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Pharmacy" ? (
                                <h3>Service Provided :</h3>
                            ) : <h3>Practice Information :</h3>}

                            {props.userType === "Hospital" ? (
                                <div className="general-info-container flex-col">
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Department1" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Department2" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Department3" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Department4" value="Althawrah" />
                                </div>
                            ) : props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Pharmacy" ? (
                                <div className="general-info-container flex-col">
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Service1" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Service2" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Service3" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Service4" value="Althawrah" />
                                </div>
                            ) :
                                <div className="general-info-container flex-col">
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Practice Location(s) :" value="Althawrah" />
                                    <GeneralInfoItem name="w-full" icon={<MdWorkspacePremium />} title="Hospital Affiliation(s) :" value="Physician's clinic" />
                                    <GeneralInfoItem name="w-full" icon={<IoHourglassOutline />} title="Practice Hourse :" value="10 Years" />
                                    <GeneralInfoItem name="w-full" icon={<BsTranslate />} title="Language(s) :" value="Arabic, English" />
                                </div>
                            }

                        </div>

                        {props.userType === "Hospital" ? (
                            <div className="general-info w-full">
                                <h3>Emergency Services :</h3>
                                <div className="general-info-container flex-col">
                                    <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Emergency Services :" value="Taiz University" />
                                    <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Emergency Services :" value="Alqaherah" />
                                    <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Emergency Services :" value="Cairo Hospital" />
                                    <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Emergency Services :" value="Jordan University" />
                                </div>
                            </div>
                        ) : props.userType === "Doctor" ? (
                            <div className="general-info w-full">
                                <h3>Educational Information :</h3>
                                <div className="general-info-container flex-col">
                                    <GeneralInfoItem name="w-full" icon={<IoMdSchool />} title="Medical School :" value="Taiz University" />
                                    <GeneralInfoItem name="w-full" icon={<FaUserNurse />} title="Internships :" value="Alqaherah" />
                                    <GeneralInfoItem name="w-full" icon={<FaRegHospital />} title="Residencies :" value="Cairo Hospital" />
                                    <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Fellowships :" value="Jordan University" />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </ProfileBodyLeft>
            <ProfileBodyRight>
                {
                    props.userType === "Hospital" ? (
                        <>
                            <h3 className="flex items-center gap-2"> <MdWatchLater /> Work Hours :</h3>
                            <div className="flex flex-col my-1">
                                <WorkHoursCard WorkHours={WorkHours} />
                            </div>
                            <h3 className="flex items-center gap-2"> <MdWatchLater /> Visit Hours :</h3>
                            <div className="flex flex-col my-1">
                                <WorkHoursCard WorkHours={WorkHours} />
                            </div>
                        </>
                    ) : <>
                        <h3 className="flex items-center gap-2"> <MdWatchLater /> Work Hours :</h3>
                        <div className="flex flex-col my-1">
                            <WorkHoursCard WorkHours={WorkHours} />
                        </div>
                    </>
                }

            </ProfileBodyRight>
        </>
    )
}

export default PuplicInformation;

