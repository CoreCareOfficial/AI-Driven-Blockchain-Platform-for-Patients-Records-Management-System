import React from "react";
import H1 from "../H1";
import P from "../P";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconCircle from '../../assets/Circle.png';
import DynamicCard from '../bootcomponent/DynamicCard';
import { Card } from "react-bootstrap";
import Flex_Container from "../bootcomponent/flex_Container";

function Section4(){
    const disc = <p>There are some problems and risks associated with the paper-based patient records (Traditional Healthcare Records) management system, including:</p>
    return(
        <>
        <section className="H_section4">
            <H1 name="H_title" title="# The Risks of Traditional Healthcare Records (THRs)"/>
            <div className="overview">
            <P title={disc}/>
            </div>
            <Container>
                <Row >
                    <Col >
                    <DynamicCard name="H_section4_card">
                        <Flex_Container>
                        <Card.Img src={IconCircle}/>
                        <Card.Title>Limited Accessibility and Inefficiency</Card.Title>
                        </Flex_Container>
                    </DynamicCard>
                    </Col>

                    <Col >
                    <DynamicCard name="H_section4_card">
                        <Flex_Container>
                        <Card.Img src={IconCircle}/>
                        <Card.Title>Data Redundancy and Errors</Card.Title>
                        </Flex_Container>
                    </DynamicCard>
                    </Col>
                </Row>

                <Row >
                    <Col >
                    <DynamicCard name="H_section4_card">
                        <Flex_Container>
                        <Card.Img src={IconCircle}/>
                        <Card.Title>Security and Privacy Concerns</Card.Title>
                        </Flex_Container>
                    </DynamicCard>
                    </Col>

                    <Col >
                    <DynamicCard name="H_section4_card">
                        <Flex_Container>
                        <Card.Img src={IconCircle}/>
                        <Card.Title>Interoperability Challenges</Card.Title>
                        </Flex_Container>
                    </DynamicCard>
                    </Col>
                </Row>
                <Row>
                    <Col >
                    <DynamicCard name="H_section4_card">
                        <Flex_Container>
                        <Card.Img src={IconCircle}/>
                        <Card.Title>Inefficiency and Time-Consuming</Card.Title>
                        </Flex_Container>
                    </DynamicCard>
                    </Col>
                    
                    <Col >
                    <DynamicCard name="H_section4_card">
                        <Flex_Container>
                        <Card.Img src={IconCircle}/>
                        <Card.Title>Financial Implications</Card.Title>
                        </Flex_Container>
                    </DynamicCard>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}
export default Section4;