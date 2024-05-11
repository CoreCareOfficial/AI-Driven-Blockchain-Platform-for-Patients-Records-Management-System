import React from "react";
import H1 from "../H1";
import P from "../P";
import CardIcon from'../bootcomponent/CardIcon';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import iconAccess from '../../assets/Icon accessibility.png';
import iconFolder from '../../assets/Icon folder closed.png';
import iconSecurity from '../../assets/Icon security.png';
import iconSaving from '../../assets/Icon savings.png';
import iconHealth from '../../assets/Icon health and safety.png';

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
                    <CardIcon 
                        name="H_section3_card"
                        title="Improved Accessibility and Efficiency1"
                        path={iconAccess}
                        disc="EHRs provide quick access to patient information, improving decision-making and care coordination."
                    />
                    </Col>
                    <Col xs>
                    <CardIcon 
                        name="H_section3_card"
                        title="Enhanced Patient Care and Safety"
                        path={iconHealth}
                        disc="Comprehensive patient data reduces errors and enhances treatment outcomes."
                    />
                    </Col>
                    <Col xs={{ order: 'last' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Security and Privacy"
                        path={iconSecurity}
                        disc="EHRs ensure the security and privacy of patient information across multiple providers."
                    />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ order: 'first' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Data Accuracy and Legibility"
                        path={iconAccess}
                        disc="Eliminates errors associated with illegible handwriting and improves documentation accuracy."
                    />
                    </Col>
                    <Col xs>
                    <CardIcon 
                        name="H_section3_card"
                        title="Reduced Duplication"
                        path={iconFolder}
                        disc="EHRs information reduces unnecessary tests and procedures, saving time and resources."
                    />
                    </Col>
                    <Col xs={{ order: 'last' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Cost Savings"
                        path={iconSaving}
                        disc="EHR implementation lowers business-related costs over time through streamlined processes."
                    />
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}
export default Section3;