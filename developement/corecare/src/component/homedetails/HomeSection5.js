import React from "react";
import image5 from '../../assets/image5.png';
import { Card, Col, Row ,Image,Button} from "react-bootstrap";
import DynamicCard from '../bootcomponent/DynamicCard';
import Flex_Container from "../bootcomponent/flex_Container";

function Section5(){
    return(
    <>
    <section className="H_section5">
        <div className="H_container5_div">
        <Col>
        <Image src={image5} roundedCircle />
        </Col>
        <Flex_Container>
            <DynamicCard name="H_section5_card">
                <Card.Title>How to sign-up in our project</Card.Title>
                <Card.Text>Just 4 simple steps to optimize your company operations.</Card.Text>
                <Button variant="primary" style={{transition: '0.7s ease'}}>sign up now</Button>{' '}
            </DynamicCard>

            <DynamicCard name="step">
            <Col>
                <Row>
                    <DynamicCard name="H_section5_card">
                    <Card.Title>Step 1</Card.Title>
                    <Card.Text>Reach out to one of our specialists, 
                    and have short introduction session.
                    </Card.Text>
                    <hr/>
                    </DynamicCard>
                </Row>
                <Row>
                    <DynamicCard name="H_section5_card">
                    <Card.Title>Step 2</Card.Title>
                    <Card.Text>Our specialist will prepare personalized 
                    package suitable for your needs.
                    </Card.Text>
                    <hr/>
                    </DynamicCard>
                </Row>
                <Row>
                    <DynamicCard name="H_section5_card">
                    <Card.Title>Step 3</Card.Title>
                    <Card.Text>
                        Poof! You are ready to work smart with optimized operations.
                    </Card.Text>
                    <hr/>
                    </DynamicCard>
                </Row>
                <Row>
                    <DynamicCard name="H_section5_card">
                    <Card.Title>Step 4</Card.Title>
                    <Card.Text>
                    Poof! You are ready to work smart with optimized operations.
                    </Card.Text>
                    <hr/>
                    </DynamicCard>
                </Row>
                </Col>
            </DynamicCard>
                </Flex_Container>

        </div>
        </section>
        </>
    );
}
export default Section5;