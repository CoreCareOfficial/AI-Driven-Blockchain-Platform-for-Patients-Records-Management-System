import { Card } from "react-bootstrap";
import DynamicCard from '../bootcomponent/DynamicCard'
function Section1(){
    return(
        <>
        <section className="S_section1 contact1">
            <DynamicCard name="contact1_card">
                <Card.Title>Core Care</Card.Title>
                <Card.Text>Transform Patient Care with Secure,
                    AI-Powered Records Management</Card.Text>
            </DynamicCard>
        </section>
        </>
    );
}
export default Section1;