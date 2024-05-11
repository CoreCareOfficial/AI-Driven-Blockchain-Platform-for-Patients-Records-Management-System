import React from "react";
import image5 from '../../assets/image5.png';
import CardTitle from "../bootcomponent/CardTitle";
import CardStep from "../bootcomponent/CardStep";
import { Card, Col, Row ,Image} from "react-bootstrap";
function Section5(){
    return(
    <>
    <section className="H_section5">
        <div className="H_container5_div">
        <Col>
        <Image src={image5} roundedCircle />
        </Col>
        <div className="my_container">
            <CardTitle
                name="H_section5_card"
                title="How to sign-up in our project"
                desc="Just 4 simple steps to optimize your company operations."
                btn="sign up now"
                />

            <Card className="step">
                <Card.Body>
                <Col>
                <Row>
                <CardStep
                name="H_section5_card"
                title="Step 1"
                desc="Reach out to one of our specialists, and have short introduction session."
                /></Row>
                <Row>
                <CardStep
                name="H_section5_card"
                title="Step 2"
                desc="Our specialist will prepare personalized package suitable for your needs."
                /></Row>
                <Row>
                <CardStep
                name="H_section5_card"
                title="Step 3"
                desc="Poof! You are ready to work smart with optimized operations."
                /></Row>
                <Row>
                <CardStep
                name="H_section5_card"
                title="Step 4"
                desc="Poof! You are ready to work smart with optimized operations."
                /></Row>
            </Col>
                </Card.Body>
            </Card>
                </div>

            </div>
        </section>
        </>
    );
}
export default Section5;