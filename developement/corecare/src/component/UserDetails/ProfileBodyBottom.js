import PreviousDoctorCard from "./PreviousDoctorCard";
import ahmed from "../../assets/ahmed.jpg"
import "../../css/UserPageStyle/profile.css"


function ProfileBodyBottom() {
    const doctors = {
        doctor1: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Tizz',
        },

        doctor2: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Tizz',
        },
        doctor3: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Tizz',
        },
        doctor4: {
            image: ahmed,
            name: 'Ahmed Qahtan',
            spec: 'Tizz',
        },
    };

    return (
        <div className="profile-body-bottom">
            <PreviousDoctorCard title="Previous Doctors" doctors={doctors} />
        </div>
    );
}

export default ProfileBodyBottom;


