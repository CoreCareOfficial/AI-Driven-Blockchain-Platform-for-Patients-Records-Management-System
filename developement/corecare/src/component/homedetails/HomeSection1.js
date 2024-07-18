import React from "react";
import computer_image from '../../assets/computer.png';
import Flex_Container from '../bootcomponent/flex_Container';
import RectImage from '../bootcomponent/RectImage';
import DynamicCard from '../bootcomponent/DynamicCard';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Section1() {
    const h1Title = <h1>Organize your<br />healthcare records and keep them safe,everywhere!</h1>
    return (
        <>
            <section className="H_section1">
                <Flex_Container>
                    <DynamicCard name="H_section1_card">
                        <Card.Title>{h1Title}</Card.Title>
                        <Card.Text>'We offer secure storage, ensuring all your data is
                            protected from unauthorized access.'
                        </Card.Text>
                        {/* <Link to="">
                            <Button variant="primary" style={{ transition: '0.7s ease' }}>Get Started</Button>{' '}
                        </Link> */}
                        <a href="#How-To-Signup">
                            <Button variant="primary" style={{ transition: '0.7s ease' }}>Get Started</Button>{' '}
                        </a>
                    </DynamicCard>
                    <RectImage path={computer_image} />
                </Flex_Container>
            </section>
        </>
    );
}
export default Section1;