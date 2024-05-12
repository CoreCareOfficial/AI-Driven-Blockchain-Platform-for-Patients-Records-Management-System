import React from "react";
import H1 from "../H1";
import P from "../P"
import A_image2 from '../../assets/A_image2.png';
import RectImage from "../bootcomponent/RectImage";
import { Card,Container } from "react-bootstrap";
import Flex_Container from "../bootcomponent/flex_Container";
import DynamicCard from "../bootcomponent/DynamicCard";

function Section2(){
    const disc = <p>
At Core-Care, we are committed to providing excellent services to our customers and 
clients and to help them achieve the best outcomes. We believe that we can make 
a positive impact on our community, industry and the world.
Our Core-Care team is dedicated to providing the best possible service and support,
and we are always looking for ways to improve and innovate.
    </p>
    return(
        <>
        <section className="A_section1">
            <H1 name="H_title" title="Our Mission"/>
            <div className="overview">
                <P className="H_P" title={disc}/>
                <hr/>
                </div>
                <Container style={{marginTop:'-3%'}}>
                <Flex_Container>
                    <DynamicCard name="A_section2_card">
                        <Card.Title>Let's start working more efficiently today!</Card.Title>
                    </DynamicCard>
                    <RectImage path={A_image2}/>
                </Flex_Container>
                </Container>
        </section>
        </>
    );
}
export default Section2;