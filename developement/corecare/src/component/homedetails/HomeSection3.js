import React from "react";
import H1 from "../H1";
import P from "../P";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import iconAccess from '../../assets/Icon accessibility.png';
import iconFolder from '../../assets/Icon folder closed.png';
import iconSecurity from '../../assets/Icon security.png';
import iconSaving from '../../assets/Icon savings.png';
import iconHealth from '../../assets/Icon health and safety.png';
import DynamicCard from '../bootcomponent/DynamicCard';
import { Card } from "react-bootstrap";
import Flex_Container from "../bootcomponent/flex_Container";

function Section3(){
    const disc = <p>
    Electronic Health Records (EHRs) play a crucial role in modern healthcare systems,
    offering numerous benefits for both healthcare providers and 
    patients. Here are some key reasons highlighting the importance of electronic health records:
    </p>
    return(
        <>
        <section className="H_section3">
            <H1 name="H_title" title="# The importance of E-Healthcare Records (EHRs)"/>
            <div className="overview"><P className="H_P" title={disc}/></div>
            <Container>
                <Row>
                    <Col xs={{ order: 'first' }}>
                    <DynamicCard name="H_section3_card">
                        <Flex_Container>
                        <Card.Img src={iconAccess}/>
                        <Card.Title>Improved Accessibility and Efficiency1</Card.Title>
                        </Flex_Container>
                        <Card.Text>EHRs provide quick access to patient 
                            information, improving decision-making and care coordination.
                        </Card.Text>
                    </DynamicCard>
                    </Col>

                    <Col xs>
                    <DynamicCard name="H_section3_card">
                        <Flex_Container>
                        <Card.Img src={iconHealth}/>
                        <Card.Title>Enhanced Patient Care and Safety</Card.Title>
                        </Flex_Container>
                        <Card.Text>Comprehensive patient data reduces errors and enhances 
                        treatment outcomes.
                        </Card.Text>
                    </DynamicCard>
                    </Col>

                    <Col xs={{ order: 'last' }}>
                    <DynamicCard name="H_section3_card">
                        <Flex_Container>
                        <Card.Img src={iconSecurity}/>
                        <Card.Title>Security and Privacy</Card.Title>
                        </Flex_Container>
                        <Card.Text>EHRs ensure the security and privacy of patient 
                        information across multiple providers.
                        </Card.Text>
                    </DynamicCard>
                    </Col>
                </Row>

                <Row>
                    <Col xs={{ order: 'first' }}>
                    <DynamicCard name="H_section3_card">
                        <Flex_Container>
                        <Card.Img src={iconAccess}/>
                        <Card.Title>Data Accuracy and Legibility</Card.Title>
                        </Flex_Container>
                        <Card.Text>Eliminates errors associated with illegible 
                        handwriting and improves documentation accuracy.
                        </Card.Text>
                    </DynamicCard>
                    </Col>

                    <Col xs>
                    <DynamicCard name="H_section3_card">
                        <Flex_Container>
                        <Card.Img src={iconFolder}/>
                        <Card.Title>Reduced Duplication</Card.Title>
                        </Flex_Container>
                        <Card.Text>EHRs information reduces unnecessary tests 
                        and procedures, saving time and resources.
                        </Card.Text>
                    </DynamicCard>
                    </Col>

                    <Col xs={{ order: 'last' }}>
                    <DynamicCard name="H_section3_card">
                        <Flex_Container>
                        <Card.Img src={iconSaving}/>
                        <Card.Title>Cost Savings</Card.Title>
                        </Flex_Container>
                        <Card.Text>EHR implementation lowers business-related 
                        costs over time through streamlined processes.
                        </Card.Text>
                    </DynamicCard>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}
export default Section3;