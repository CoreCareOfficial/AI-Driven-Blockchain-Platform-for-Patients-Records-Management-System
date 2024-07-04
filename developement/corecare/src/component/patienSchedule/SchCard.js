
import "../../css/patienschedule/schCrad.css"
import { IoTodaySharp } from "react-icons/io5";
import { useState } from "react";
import { GiBackPain } from "react-icons/gi";
// import { TbEyeSearch } from "react-icons/tb";
import { LiaTeethOpenSolid } from "react-icons/lia";
import { ReactComponent as ENT } from "../../assets/ent.svg";
import { ReactComponent as EyeExam } from "../../assets/ophthalmology-svgrepo-com.svg";
import { ReactComponent as Nutritionist } from "../../assets/diet-svgrepo-com.svg";
import { ReactComponent as Allergy } from "../../assets/allergy-1-svgrepo-com.svg";
import { ReactComponent as Cardiology } from "../../assets/checkup-svgrepo-com.svg";
import { ReactComponent as Gynecological } from "../../assets/medical-examination-female-svgrepo-com.svg";
import { ReactComponent as Oncology } from "../../assets/i-oncology-svgrepo-com.svg";
import { ReactComponent as Prenatal } from "../../assets/Prenatal.svg";
import { ReactComponent as Mental } from "../../assets/Mental.svg";

import {
    MdLocalHospital, MdFavorite, MdChildCare,
    MdHealing, MdFitnessCenter, MdAccessibility, MdVaccines,
    MdHotel,
} from 'react-icons/md';
function SchCard({ onSelectSchedule }) {
    const iconS = {
        "Upcoming appointment": <IoTodaySharp />,
        "General Checkup": <MdLocalHospital />,
        "Nutritionist Checkup": <Nutritionist />,
        "Dental Cleaning": < LiaTeethOpenSolid />,
        "Eye Exam": <EyeExam />,
        "Pediatric Visit": <MdChildCare />,
        "Dermatology Appointment": <MdHealing />,
        "Cardiology Checkup": <Cardiology />,
        "Gynecological Exam": <Gynecological />,
        "Physical Therapy Session": <MdFitnessCenter />,
        "Mental Health Counseling": <Mental />,
        "Orthopedic Consultation": <MdAccessibility />,
        "Endocrinology Appointment": <MdFavorite />,
        "Oncology Visit": <Oncology />,
        "ENT (Ear, Nose, and Throat) Consultation": <ENT />,
        "Allergy Testing": <Allergy />,
        "Prenatal Visit": < Prenatal />,
        "Immunization Appointment": <MdVaccines />,
        "Sleep Study": <MdHotel />,
        "Chiropractic Adjustment": <GiBackPain />,
        "Rheumatology Consultation": <MdAccessibility />,



    }
    const Scha = {
        fristScha: {
            "id": 1,
            "typeSch": "Sleep Study",
            "data": "10 Age",
            "time": '8:30 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 4 }
        },
        fristSch2: {
            "id": 2,
            "typeSch": "General Checkup",
            "data": "10 Age",
            "time": '9:00 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 17 }
        },
        fristSch3: {
            "id": 3,
            "typeSch": "Rheumatology Consultation",
            "data": "10 Age",
            "time": '9:15 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 20 }
        },
        fristScha4: {
            "id": 4,
            "typeSch": "Chiropractic Adjustment",
            "data": "10 Age",
            "time": '9:30 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 9 }
        },
        fristSch5: {
            "id": 5,
            "typeSch": "Nutritionist Checkup",
            "data": "10 Age",
            "time": '9:45 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 17 }
        },
        fristSch6: {
            "id": 6,
            "typeSch": "Dental Cleaning",
            "data": "10 Age",
            "time": '10:00 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 18 }
        },
        fristScha7: {
            "id": 7,
            "typeSch": "Eye Exam",
            "data": "10 Age",
            "time": '10:15 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 21 }
        },
        fristSch8: {
            "id": 8,
            "typeSch": "ENT (Ear, Nose, and Throat) Consultation",
            "data": "10 Age",
            "time": '10:30 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 30 }
        },
        fristSch9: {
            "id": 9,
            "typeSch": "Allergy Testing",
            "data": "10 Age",
            "time": '10:45 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 7 }
        },
        fristScha10: {
            "id": 10,
            "typeSch": "Cardiology Checkup",
            "data": "10 Age",
            "time": '11:00 AM',
            "date": { "Year": 2024, "Manth": 7, "Day": 17 }
        },
        fristSch11: {
            "id": 11,
            "typeSch": "Gynecological Exam",
            "data": "10 Age",
            "time": '11:15 AM',
            "date": { "Year": 2024, "Manth": 4, "Day": 23 }




        },
        fristSch1112: {
            "id": 12,
            "typeSch": "Oncology Visit",
            "data": "10 Age",
            "time": '11:30 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 29 }
        },
        fristScha13: {
            "id": 13,
            "typeSch": "Prenatal Visit",
            "data": "10 Age",
            "time": '12:00 AM',
            "date": { "Year": 2024, "Manth": 1, "Day": 2 }
        },
        fristSch90: {
            "id": 14,
            "typeSch": "Mental Health Counseling",
            "data": "10 Age",
            "time": "10 AM",
            "date": { "Year": 2024, "Manth": 1, "Day": 14 }
        },
        fristSch14: {
            "id": 15,
            "typeSch": "Upcoming appointment",
            "data": "10 Age",
            "time": "10 AM",
            "date": { "Year": 2024, "Manth": 1, "Day": 4 }
        },
        fristScha15: {
            "id": 16,
            "typeSch": "Upcoming appointment",
            "data": "10 Age",
            "time": "10 AM",
            "date": { "Year": 2024, "Manth": 9, "Day": 17 }
        },
        fristSch16: {
            "id": 17,
            "typeSch": "Upcoming appointment",
            "data": "10 Age",
            "time": "10 AM",
            "date": { "Year": 2024, "Manth": 5, "Day": 4 }
        },
        fristSch1117: {
            "id": 18,
            "typeSch": "Upcoming appointment",
            "data": "10 Age",
            "time": "10 AM",
            "date": { "Year": 2024, "Manth": 9, "Day": 23 }
        },

    }


    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id, schedule) => {
        setSelectedId(id);
        onSelectSchedule(schedule);
    };

    return (
        <div className='containerSch'>
            <div className='HeaderSch'>
                <div className='HeadertIcon'>
                    <IoTodaySharp />
                </div>
                <div className='HeadTitle'>
                    <p>Upcoming appointment</p>
                </div>
            </div>
            <div className="bodySchedule">
                {Object.keys(Scha).map((Schals) => (
                    <div
                        key={Scha[Schals]['id']}
                        onClick={() => handleSelect(Scha[Schals]['id'], Scha[Schals])}
                        className={`body_S ${selectedId === Scha[Schals]['id'] ? 'active' : ''}`}
                    >
                        <div className="body_S1">
                            <div>{iconS[Scha[Schals]['typeSch']]}</div>
                            <div className="body_S1in">{Scha[Schals]['typeSch']}</div>
                        </div>
                        <div className="body_S2">{Scha[Schals]['data']}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SchCard;