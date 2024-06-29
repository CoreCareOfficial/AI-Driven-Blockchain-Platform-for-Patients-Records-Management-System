import DynamicCard from "../bootcomponent/DynamicCard";
import { Card, Image } from "react-bootstrap";
import "../../css/UserPageStyle/profile.css";
import defaultPic from '../../assets/user_signup.png'

function PreviousDoctorCard(props) {
    const items = Array.isArray(props.doctors) ? props.doctors : [];
    return (
        <>
            <h3>{props.title ? props.title : "Unknown"}</h3>
            <div className="previous-doctors-container">
                {items.length > 0 ? (
                    items.map((doctor) => (
                        <DynamicCard key={doctor.doctorid} name="previous-doctor-card">
                            <Image src={doctor.personalphoto ? `data:image/jpeg;base64,${doctor.personalphoto}` : defaultPic} roundedCircle />
                            <Card.Title>{`${doctor.firstname} ${doctor.lastname}`}</Card.Title>
                            <Card.Text>{doctor.specialization}</Card.Text>
                        </DynamicCard>
                    )))
                    : (
                        <li>No items to display</li>
                    )
                }
            </div>
        </>
    );
}

export default PreviousDoctorCard;