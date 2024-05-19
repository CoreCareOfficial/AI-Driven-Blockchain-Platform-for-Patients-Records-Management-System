import React from "react";
import FlexContainer from '../bootcomponent/flex_Container';
import RectImage from '../bootcomponent/RectImage';
import ContactImage from '../../assets/image4.png'
import DynamicCard from '../bootcomponent/DynamicCard';
import { Form,Button, Card } from "react-bootstrap";

function Section2(){
    return(
        <>
        <section className="S_section1 contact">
        <DynamicCard name="contact2_card">
                <Card.Title>Ready to Elevate Your Healthcare Management? </Card.Title>
                <Card.Text>
                    <ol style={{listStyleType:'1'}}>
                        <li>Contact our team of experts
                            to discuss how our platform can
                            revolutionize your patient care approach.
                        </li>
                        <li>Learn more about our customizable solutions
                            and unlock the future of healthcare data management.
                        </li>
                        <li>Fill out the form below or reach out to us directly at
                            [phone number] or [email address].
                        </li>
                    </ol>
                </Card.Text>
            </DynamicCard>
            <FlexContainer>
                <RectImage path={ContactImage}/>
                <DynamicCard name="contact_card">
                    <Card.Title>Contact Us</Card.Title>
                    <Card.Text>Explore the future with us. Feel free to get in touch.</Card.Text>
                <Form>
                    <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="your name" style={{ backgroundColor: '#272c34' }}/>
                    </Form.Group>
                    <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="your email" style={{ backgroundColor: '#272c34',color:'#fff' }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} placeholder="write a message" style={{ backgroundColor: '#272c34'}}/>
                    </Form.Group>
                    <Button variant="primary" style={{width:'100%',transition: '0.7s ease'}}>send</Button>{' '}
                    </Form>
                </DynamicCard>
            </FlexContainer>
        </section>
        </>
    );
}
export default Section2;