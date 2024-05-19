import React from "react";
import { Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/formfooterstyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function FormFooter(){
    return(
        <>
        <section className="Footer_section">
            <div className="my_container">
                <Card className="footer_form_card1" style={{ width: '30rem'}}>
                    <Card.Body>
                    <Card.Title>send us message</Card.Title>
                    <Form>
                    <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="your name" style={{ backgroundColor: '#272c34' }}/>
                    </Form.Group>
                    <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="your email" style={{ backgroundColor: '#272c34',color:'#fff' }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} placeholder="write a message" style={{ backgroundColor: '#272c34'}}/>
                    </Form.Group>
                    <Button variant="primary" style={{width:'100%',transition: '0.7s ease'}}>send</Button>{' '}
                    </Form>
                    </Card.Body>
                </Card>
                <Card className="footer_form_card2" style={{ width: '32rem'}}>
                    <Card.Body>
                        <Card.Title className="F_title">Core Care</Card.Title>
                        <Card.Title>corecareofficial@gmail.com</Card.Title>
                        <Card.Title>+9677774714500</Card.Title>
                        <Card.Text>Follow us in social media</Card.Text>
                        <i><a href="#"><FontAwesomeIcon  icon={faInstagram}/></a></i>
                        <i><a href="#"><FontAwesomeIcon  icon={faLinkedin}/></a></i>
                        <i><a href="#"><FontAwesomeIcon  icon={faFacebook}/></a></i>
                        <i><a href="#"><FontAwesomeIcon  icon={faWhatsapp}/></a></i>
                        <i><a href="#"><FontAwesomeIcon  icon={faTwitter}/></a></i>
                    </Card.Body>
                </Card>
            </div>
        </section>
        </>
        );
}
export default FormFooter;