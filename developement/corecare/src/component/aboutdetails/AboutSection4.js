import React from "react";
import image4 from '../../assets/A.png';
import RectImage from "../bootcomponent/RectImage";
import { Container } from "react-bootstrap";
import Flex_Container from "../bootcomponent/flex_Container";
import DynamicCard from "../bootcomponent/DynamicCard";
import { Card,Button } from "react-bootstrap";

function Section4(){

    return(
        <>
        <section className="A_section4">
                <Container style={{
                    backgroundColor:'#181a1f',
                    borderRadius:'20px',
                    marginTop:'10%'
                    }}>
                <Flex_Container>
                    <DynamicCard name="A_section4_card">
                        <Card.Title>Get started with Core-care today</Card.Title>
                        <Card.Text>Start organizing your healthcare records today.</Card.Text>
                        <Button variant="primary" style={{transition: '0.7s ease'}}>sign up now</Button>{' '}
                    </DynamicCard>
                    <RectImage path={image4}/>
                </Flex_Container>
                </Container>
        </section>
        </>
    );
}
export default Section4;