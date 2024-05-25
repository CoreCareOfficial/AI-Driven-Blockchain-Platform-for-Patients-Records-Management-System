import ProfileBodyLeft from "./ProfileBodyLeft";
import ProfileBodyRight from "./ProfileBodyRight";
import ProfileBodyBottom from "./ProfileBodyBottom";
import { MdPersonOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaVenusMars } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import { MdOutlineEditRoad } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { MdBloodtype } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import GeneralInfoItem from "./GeneralInfoItem";
import CardListContaier from "./CardListContaier";
import { FaGenderless } from "react-icons/fa";
import blood from "../../assets/blood.png";
import sugar from "../../assets/suger.png";
import weight from "../../assets/weight.png";
import height from "../../assets/height.png";
import pressure from "../../assets/pressure.png";
import respiratory from "../../assets/respiratory.png";
import heart from "../../assets/heart.png";
import allergies from "../../assets/allergies.png";
import HealthCard from "./HealthCard";
import PreviousDoctorCard from "./PreviousDoctorCard";
import ahmed from "../../assets/ahmed.jpg"

function PersonalInformation() {
    const doctors = {
        doctor1: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Serguent',
        },

        doctor2: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Serguent',
        },
        doctor3: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Serguent',
        },
        doctor4: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Serguent',
        },
    };
    return (
        <>
            <ProfileBodyLeft >
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
                            <GeneralInfoItem icon={<FaGenderless />} title="Status :" value="Single 💔" />
                            <GeneralInfoItem icon={<MdWorkOutline />} title="Job :" value="Fucker" />
                        </div>
                    </div>
                    <div className="profile-body-left-bottom">
                        <CardListContaier title="Current Medications :" items={['Medicine 1', 'Medicine 2', 'Medicine 3']} />
                        <CardListContaier title="Past Illnessess and Conditions :" items={['Condition 1', 'Condition 2', 'Condition 3']} />
                    </div>
                </div>
            </ProfileBodyLeft>

            <ProfileBodyRight >
                <h3>Health Information :</h3>
                <div className="flex flex-col my-1">
                    <HealthCard image={blood} title="Blood (HP) :" date="2 weeks ago" value="11" />
                    <HealthCard image={sugar} title="Blood Sugar :" date="3 weeks ago" value="90" />
                    <HealthCard image={pressure} title="Blood Pressure :" date="2 years ago" value="115" />
                    <HealthCard image={heart} title="Heart Rate (Pulse):" date="5 Years Ago ago" value="70/m" />
                    <HealthCard image={respiratory} title="Respiratory Rate :" date="3 Years ago" value="15/m" />
                    <HealthCard image={allergies} title="Allergies :" date="0 weeks ago" value="null" />
                    <HealthCard image={weight} title="Weight :" date="3 months ago" value="54 kg" />
                    <HealthCard image={height} title="Height :" date="4 Years ago" value="170 cm" />
                </div>
            </ProfileBodyRight>

            <ProfileBodyBottom >
                <PreviousDoctorCard title="Previous Doctors" doctors={doctors} />
            </ProfileBodyBottom>
        </>
    )
}

export default PersonalInformation;

