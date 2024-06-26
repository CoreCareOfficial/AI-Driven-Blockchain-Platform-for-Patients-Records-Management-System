import React from "react";
import { Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/formfooterstyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { AiOutlineX } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Flex_Container from "./bootcomponent/flex_Container";
function FormFooter() {
    return (
        <>
            <section className="Footer_section">
                <div className="my_container">
                    <Card className="footer_form_card1" style={{ width: '30rem' }}>
                        <Card.Body>
                            <Card.Title>send us message</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="your name" style={{ backgroundColor: '#272c34' }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder="your email" style={{ backgroundColor: '#272c34', color: '#fff' }} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} placeholder="write a message" style={{ backgroundColor: '#272c34' }} />
                                </Form.Group>
                                <Button variant="primary" style={{ width: '100%', transition: '0.7s ease' }}>send</Button>{' '}
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="footer_form_card2" style={{ width: '32rem' }}>
                        <Card.Body>
                            <Card.Title className="F_title">Core Care</Card.Title>
                            <Card.Title>corecareofficial@gmail.com</Card.Title>
                            <Card.Title>+9677774714500</Card.Title>
                            <Card.Text>Follow us on social media</Card.Text>
                            <Flex_Container>
                                <i>
                                    <a href="https://www.x.com/corecare219293" rel="noreferrer" target="_blank">
                                        <AiOutlineX />
                                    </a>
                                </i>

                                <i>
                                    <a href="https://www.instagram.com/co_ca_official" rel="noreferrer" target="_blank">
                                        <AiFillInstagram />
                                    </a>
                                </i>

                                <i>
                                    <a href="https://www.linkedin.com/in/core-care-2a9521316" rel="noreferrer" target="_blank">
                                        <AiFillLinkedin />
                                    </a>
                                </i>

                                <i>
                                    <a href="https://www.facebook.com/profile.php?id=61561349946436" rel="noreferrer" target="_blank">
                                        <AiFillFacebook />
                                    </a>
                                </i>

                                <i>
                                    <a href="https://wa.me/733816431" rel="noreferrer" target="_blank">
                                        <AiOutlineWhatsApp />
                                    </a>
                                </i>
                            </Flex_Container>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </>
    );
}
export default FormFooter;