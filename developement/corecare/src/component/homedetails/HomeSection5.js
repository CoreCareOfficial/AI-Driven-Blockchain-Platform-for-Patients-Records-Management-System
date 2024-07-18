import React from "react";
import image5 from '../../assets/image5.png';
import { Card, Col, Row, Image, Button } from "react-bootstrap";
import DynamicCard from '../bootcomponent/DynamicCard';
import Flex_Container from "../bootcomponent/flex_Container";
import { Link } from "react-router-dom";

function Section5() {
    return (
        <>
            <section id="How-To-Signup" className="H_section5">
                <div className="H_container5_div">
                    <Col>
                        {/* <div className="div-i"> */}
                        <img src={image5} />
                        {/* </div> */}
                        {/* <Image src={image5} roundedCircle /> */}
                    </Col>
                    <Flex_Container>
                        <DynamicCard name="H_section5_card">
                            <Card.Title>How to sign-up in CoreCare Platform</Card.Title>
                            <Card.Text>Just 5 simple steps to create an Account in CoreCare Platform.</Card.Text>
                            <Link to="/signup">
                                <Button variant="primary" style={{ width:'30%', transition: '0.7s ease' }}>sign up now</Button>{' '}
                            </Link>
                            {/* <Button variant="primary" style={{transition: '0.7s ease'}}>sign up now</Button>{' '} */}
                        </DynamicCard>

                        <DynamicCard name="step">
                            <Col>
                                <Row>
                                    <DynamicCard name="H_section5_card">
                                        <Card.Title>Step 1</Card.Title>
                                        <Card.Text>Install Metamask Wallet on Your Browser and Create Your Wallet.
                                        </Card.Text>
                                        <hr />
                                    </DynamicCard>
                                </Row>
                                <Row>
                                    <DynamicCard name="H_section5_card">
                                        <Card.Title>Step 2</Card.Title>
                                        <Card.Text>Click Signup and Connect Your Metamask Wallet with CoreCare.
                                        </Card.Text>
                                        <hr />
                                    </DynamicCard>
                                </Row>
                                <Row>
                                    <DynamicCard name="H_section5_card">
                                        <Card.Title>Step 3</Card.Title>
                                        <Card.Text>
                                            Choose Your Role And Click Continue.
                                        </Card.Text>
                                        <hr />
                                    </DynamicCard>
                                </Row>
                                <Row>
                                    <DynamicCard name="H_section5_card">
                                        <Card.Title>Step 4</Card.Title>
                                        <Card.Text>
                                            Enter The Relevant Information You Are Asked for and Upload Authenticated
                                            Documents then wait for the Analysis System to Verify Your Documents.
                                        </Card.Text>
                                        <hr />
                                    </DynamicCard>
                                </Row>
                                <Row>
                                    <DynamicCard name="H_section5_card">
                                        <Card.Title>Step 5</Card.Title>
                                        <Card.Text>
                                            Enter a Strong Password and Verify Your Email Address ,and Congratulation
                                            !! You Can Now Login to CoreCare.
                                        </Card.Text>
                                        <hr />
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