import React from "react";
import H1 from "../H1";
import P from "../P";
import CardIcon from'../bootcomponent/CardIcon';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import iconAccess from '../../assets/Icon accessibility.png';
import iconFolder from '../../assets/Icon folder closed.png';
function Section3(){
    const disc = <p>
    Electronic Health Records (EHRs) play a crucial role in modern healthcare systems,
    offering numerous benefits for both healthcare providers and<br/> patients. Here are some key reasons highlighting the importance of electronic health records:
    </p>
    return(
        <>
        <section className="H_section3">
            <H1 name="H_title" title="# The importance of E-Healthcare Records (EHRs)"/>
            <P  className="H_P" title={disc}/>
            <Container>
                <Row>
                    <Col xs={{ order: 'first' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Improved Accessibility and Efficiency1"
                        path={iconAccess}
                        disc={disc}
                    />
                    </Col>
                    <Col xs>
                    <CardIcon 
                        name="H_section3_card"
                        title="Enhanced Patient Care and Safety"
                        path={iconFolder}
                        disc={disc}
                    />
                    </Col>
                    <Col xs={{ order: 'last' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Improved Accessibility and Efficiency1"
                        path={iconAccess}
                        disc={disc}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ order: 'first' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Improved Accessibility and Efficiency1"
                        path={iconAccess}
                        disc={disc}
                    />
                    </Col>
                    <Col xs>
                    <CardIcon 
                        name="H_section3_card"
                        title="Improved Accessibility and Efficiency1"
                        path={iconFolder}
                        disc={disc}
                    />
                    </Col>
                    <Col xs={{ order: 'last' }}>
                    <CardIcon 
                        name="H_section3_card"
                        title="Improved Accessibility and Efficiency1"
                        path={iconAccess}
                        disc={disc}
                    />
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}
export default Section3;