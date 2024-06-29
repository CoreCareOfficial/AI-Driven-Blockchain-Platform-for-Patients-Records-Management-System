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
import { useEffect, useState } from "react";


function PuplicInformation(props) {
    const [doctors, setDoctors] = useState({});
    const [userData, setUserData] = useState({
        practiceinfo: {},
        educationalinfo: {},
        workhours: {},
    });

    const fetchData = async (url, setStateKey) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();
            if (setStateKey === "doctors") {
                setDoctors(jsonData);
            } else {
                setUserData((prevState) => ({
                    ...prevState,
                    [setStateKey]: jsonData,
                }));
            }
            console.log(`Success loading ${setStateKey}:`, jsonData);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setUserData((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
        }
    };

    useEffect(() => {
        //call the api to get the doctor data when userType is Doctor
        if (props.userType === "Doctor") {
            fetchData(`http://192.168.137.1:5000/doctors/${props.userId}`, "doctors");
        }

    }, [props.userId, props.userType]);

    useEffect(() => {
        if (props.userType === "Doctor") {
            fetchData(`http://192.168.137.1:5000/practiceinfo/${doctors.doctorid}`, "practiceinfo");
            fetchData(`http://192.168.137.1:5000/educationalinfo/${doctors.doctorid}`, "educationalinfo");
            fetchData(`http://192.168.137.1:5000/workhours/${doctors.doctorid}`, "workhours");
        }
    }, [doctors.doctorid, props.userType]);

    const { practiceinfo, educationalinfo, workhours, previousDoctors } = userData;

    console.log('doctors:', doctors);
    console.log('practiceinfo:', practiceinfo);
    console.log('educationalinfo:', educationalinfo);
    console.log('workhours:', workhours);
    const WorkHours = [
        {
            hospitalName: "ALqaherah Hospital",
            workDays: "Sat-Sun",
            DayworkHours: "08:00 PM - 20:00 PM",
            NightworkHours: "08:00 PM - 20:00 PM",
        },
        {
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
    ];
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
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Medical Degree :" value={doctors.academicdegree} />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Specialization :" value={doctors.specialization} />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Years of Experience :" value={doctors.yearsofexperience} />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Clinic Number :" value={doctors.clinicnumber} />
                                    <GeneralInfoItem icon={<MdPersonOutline />} title="Location of Work :" value={doctors.locationofwork} />
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
                                    <GeneralInfoItem name="w-full" icon={<MdStars />} title="Practice Location(s) :" value={practiceinfo.practicelocation} />
                                    <GeneralInfoItem name="w-full" icon={<MdWorkspacePremium />} title="Hospital Affiliation(s) :" value={practiceinfo.affiliations} />
                                    <GeneralInfoItem name="w-full" icon={<IoHourglassOutline />} title="Practice Hourse :" value={practiceinfo.practicehours} />
                                    <GeneralInfoItem name="w-full" icon={<BsTranslate />} title="Language(s) :" value={practiceinfo.languagesspoken} />
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
                                    <GeneralInfoItem name="w-full" icon={<IoMdSchool />} title="Medical School :" value={educationalinfo.medschool} />
                                    <GeneralInfoItem name="w-full" icon={<FaUserNurse />} title="Internships :" value={educationalinfo.internships} />
                                    <GeneralInfoItem name="w-full" icon={<FaRegHospital />} title="Residencies :" value={educationalinfo.residencies} />
                                    <GeneralInfoItem name="w-full" icon={<PiStethoscopeDuotone />} title="Fellowships :" value={educationalinfo.fellowships} />
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
                            <WorkHoursCard WorkHours={workhours} />
                        </div>
                    </>
                }

            </ProfileBodyRight>
        </>
    )
}

export default PuplicInformation;

