import DynamicCard from "../bootcomponent/DynamicCard";
import { Card, Image } from "react-bootstrap";
import "../../css/UserPageStyle/profile.css"

function PreviousDoctorCard(props) {
    return (
        <>
            <h3>{props.title ? props.title : "Unknown"}</h3>
            <div className="previous-doctors-container">
                {Object.keys(props.doctors).map((doctor, index) => (
                    <DynamicCard key={index} name="previous-doctor-card">
                        <Image src={props.doctors[doctor].image} roundedCircle />
                        <Card.Title>{props.doctors[doctor].name}</Card.Title>
                        <Card.Text>{props.doctors[doctor].spec}</Card.Text>
                    </DynamicCard>
                ))}
            </div>
        </>
    );
}

export default PreviousDoctorCard;