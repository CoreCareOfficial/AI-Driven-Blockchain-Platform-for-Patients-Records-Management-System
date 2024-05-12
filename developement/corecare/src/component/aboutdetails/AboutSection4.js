import React from "react";
import image4 from '../../assets/A.png';
import RectImage from "../bootcomponent/RectImage";
import { Container } from "react-bootstrap";
import Flex_Container from "../bootcomponent/flex_Container";
import CardTitle from'../bootcomponent/CardTitle';

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
                    <CardTitle 
                        name="A_section4_card"
                        title="Get started with Core-care today"
                        desc="Start organizing your healthcare records today."
                        btn="sign up now"
                        />
                    <RectImage path={image4}/>
                </Flex_Container>
                </Container>
        </section>
        </>
    );
}
export default Section4;