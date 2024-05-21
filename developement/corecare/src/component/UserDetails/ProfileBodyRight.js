import blood from "../../assets/blood.png";
import sugar from "../../assets/suger.png";
import weight from "../../assets/weight.png";
import height from "../../assets/height.png";
import pressure from "../../assets/pressure.png";
import respiratory from "../../assets/respiratory.png";
import heart from "../../assets/heart.png";
import allergies from "../../assets/allergies.png";
import HealthCard from "./HealthCard";
import "../../css/UserPageStyle/profile.css"

function ProfileBodyRight() {
    return (
        <div className="profile-body-right">
            <h3>Health Information :</h3>
            <div className="flex flex-col my-1">
            <HealthCard image={blood} title="Blood (HP) :" date="2 weeks ago" value="11"/>
            <HealthCard image={sugar} title="Blood Sugar :" date="3 weeks ago" value="90"/>
            <HealthCard image={pressure} title="Blood Pressure :" date="2 years ago" value="115"/>
            <HealthCard image={heart} title="Heart Rate (Pulse):" date="5 Years Ago ago" value="70/m"/>
            <HealthCard image={respiratory} title="Respiratory Rate :" date="3 Years ago" value="15/m"/>
            <HealthCard image={allergies} title="Allergies :" date="0 weeks ago" value="null"/>
            <HealthCard image={weight} title="Weight :" date="3 months ago" value="54 kg"/>
            <HealthCard image={height} title="Height :" date="4 Years ago" value="170 cm"/>
            </div>
        </div>
    )
}

export default ProfileBodyRight;


