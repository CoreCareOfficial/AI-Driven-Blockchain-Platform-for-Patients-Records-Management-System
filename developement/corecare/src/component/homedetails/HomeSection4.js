import React from "react";
import H1 from "../H1";
import P from "../P";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconCircle from '../../assets/Circle.png';
import CardRisk from "../bootcomponent/CardRisk";
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
                    <CardRisk 
                        name="H_section4_card"
                        title="Limited Accessibility and Inefficiency"
                        path={IconCircle}
                    />
                    </Col>
                    <Col >
                    <CardRisk 
                        name="H_section4_card"
                        title="Data Redundancy and Errors"
                        path={IconCircle}
                    />
                    </Col>
                </Row>
                <Row >
                    <Col >
                    <CardRisk 
                        name="H_section4_card"
                        title="Security and Privacy Concerns"
                        path={IconCircle}
                    />
                    </Col>
                    <Col >
                    <CardRisk 
                        name="H_section4_card"
                        title="Interoperability Challenges"
                        path={IconCircle}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col >
                    <CardRisk 
                        name="H_section4_card"
                        title="Inefficiency and Time-Consuming"
                        path={IconCircle}
                    />
                    </Col>
                    <Col >
                    <CardRisk 
                        name="H_section4_card"
                        title="Financial Implications"
                        path={IconCircle}
                    />
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}
export default Section4;