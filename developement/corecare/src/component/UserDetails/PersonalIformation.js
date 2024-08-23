import { useEffect, useState } from "react";
import ProfileBodyLeft from "./ProfileBodyLeft";
import ProfileBodyRight from "./ProfileBodyRight";
import ProfileBodyBottom from "./ProfileBodyBottom";
import GeneralInfoItem from "./GeneralInfoItem";
import CardListContaier from "./CardListContaier";
import HealthCard from "./HealthCard";
import PreviousDoctorCard from "./PreviousDoctorCard";
import { MdPersonOutline, MdAlternateEmail, MdLocalPhone, MdCalendarToday, MdOutlineEditRoad, MdLanguage, MdBloodtype, MdWorkOutline } from "react-icons/md";
import { FaVenusMars, FaGenderless } from "react-icons/fa";
import { Nationality } from "./Nationalities";
import { FormatRelativeTime } from "../../utiles/FormatRelativeTime";
import ahmed from "../../assets/ahmed.jpg";
import blood from "../../assets/blood.png";
import sugar from "../../assets/suger.png";
import weight from "../../assets/weight.png";
import height from "../../assets/height.png";
import pressure from "../../assets/pressure.png";
import respiratory from "../../assets/respiratory.png";
import heart from "../../assets/heart.png";
import allergiesImg from "../../assets/allergies.png";
import dotenv from 'dotenv';
dotenv.config();

const SERVER_URL = process.env.SERVER_URL;

function PersonalInformation(props) {
    const userInfo = props.userInfo;
    console.log(userInfo);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [userData, setUserData] = useState({
        healthInfo: {},
        allergies: {},
        medications: {},
        pastConditions: {},
        previousDoctors: {},
        isLoading: true,
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
            setUserData((prevState) => ({
                ...prevState,
                [setStateKey]: jsonData,
            }));
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
        const userId = userInfo.patientid;
        fetchData(`${SERVER_URL}/healthinfo/${userId}`, "healthInfo");
        fetchData(`${SERVER_URL}/allergies/${userId}`, "allergies");
        fetchData(`${SERVER_URL}/medications/${userId}`, "medications");
        fetchData(`${SERVER_URL}/pastconditions/${userId}`, "pastConditions");
        fetchData(`${SERVER_URL}/previousdoctors/${userId}`, "previousDoctors");
    }, [userInfo.patientid]);

    const { healthInfo, allergies, medications, pastConditions, previousDoctors, isLoading } = userData;

    return (
        <>
            <ProfileBodyLeft>
                <div className="profile-body-left-top">
                    <div className="general-info">
                        <h3>General Information :</h3>
                        <div className="general-info-container">
                            <GeneralInfoItem icon={<MdPersonOutline />} title="Full Name :" value={`${userInfo.firstname} ${userInfo.secondname} ${userInfo.thirdname} ${userInfo.lastname}`} />
                            <GeneralInfoItem icon={<MdAlternateEmail />} title="Email :" value={userInfo.email} />
                            <GeneralInfoItem icon={<FaVenusMars />} title="Sex :" value={userInfo.sex} />
                            <GeneralInfoItem icon={<MdLocalPhone />} title="Phone Number :" value={userInfo.phonenumber} />
                            <GeneralInfoItem icon={<MdCalendarToday />} title="Date of Birth :" value={formatDate(userInfo.dateofbirth)} />
                            <GeneralInfoItem icon={<MdLanguage />} title="Nationality :" value={Nationality[userInfo.country]} />
                            <GeneralInfoItem icon={<MdOutlineEditRoad />} title="Address :" value={`${userInfo.country}, ${userInfo.address}`} />
                            <GeneralInfoItem icon={<MdBloodtype />} title="Blood Type :" value={userInfo.bloodtype} />
                            <GeneralInfoItem icon={<FaGenderless />} title="Status :" value={userInfo.status} />
                            <GeneralInfoItem icon={<MdWorkOutline />} title="Job :" value={userInfo.job} />
                        </div>
                    </div>
                    <div className="profile-body-left-bottom">
                        <CardListContaier title="Current Medications :" items={medications} nameKey='medname' />
                        <CardListContaier title="Past Illnesses and Conditions :" items={pastConditions} nameKey='conditionname' />
                    </div>
                </div>
            </ProfileBodyLeft>

            <ProfileBodyRight>
                <h3>Health Information :</h3>
                {!isLoading && (
                    <div className="flex flex-col my-1">
                        <HealthCard image={blood} title="Blood (HP) :" date={FormatRelativeTime(healthInfo.blooddate)} value={healthInfo.blood} />
                        <HealthCard image={sugar} title="Blood Sugar :" date={FormatRelativeTime(healthInfo.bloodsugardate)} value={healthInfo.bloodsugar} />
                        <HealthCard image={pressure} title="Blood Pressure :" date={FormatRelativeTime(healthInfo.bloodpressuredate)} value={healthInfo.bloodpressure} />
                        <HealthCard image={heart} title="Heart Rate (Pulse):" date={FormatRelativeTime(healthInfo.heartratedate)} value={healthInfo.heartrate ? `${healthInfo.heartrate}/m` : ''} />
                        <HealthCard image={respiratory} title="Respiratory Rate :" date={FormatRelativeTime(healthInfo.respiratoryratedate)} value={healthInfo.respiratoryrate ? `${healthInfo.respiratoryrate}/m` : ''} />
                        <HealthCard image={allergiesImg} title="Allergies :" date={FormatRelativeTime(allergies.allergiesdate)} value={allergies.allergyname} />
                        <HealthCard image={weight} title="Weight :" date={FormatRelativeTime(healthInfo.weightdate)} value={healthInfo.weight ? `${healthInfo.weight} kg` : ''} />
                        <HealthCard image={height} title="Height :" date={FormatRelativeTime(healthInfo.heightdate)} value={healthInfo.height ? `${healthInfo.height} cm` : ''} />
                    </div>
                )}
            </ProfileBodyRight>

            <ProfileBodyBottom>
                <PreviousDoctorCard title="Previous Doctors" doctors={previousDoctors} />
            </ProfileBodyBottom>
        </>
    );
}

export default PersonalInformation;
