import React from "react";
import H1 from "../H1";
import P from "../P";
import CardIcon from'../bootcomponent/CardIcon';
import {Container ,Row,Col ,Card } from 'react-bootstrap';
import service1 from '../../assets/service1.png';
import service2 from '../../assets/service2.png';
import service3 from '../../assets/service3.png';
import servise4 from '../../assets/service4.png';
import servise5 from '../../assets/service5.png';
import DynamicCard from "../bootcomponent/DynamicCard";

function ServiceSection1(){
    const disc=<p> 
        Our platform is designed to revolutionize the way patient health records are managed and shared across healthcare providers.<br/>
Our system leverages the power of Artificial Intelligence (AI) and Blockchain Technology to ensure the highest level of security, privacy, and interoperability.
With AI, we provide intelligent data analysis and predictive insights that aid in better decision-making. Blockchain technology ensures that patient records are
stored in a decentralized, immutable, and transparent manner, enhancing trust and reducing the risk of data breaches.<br/>
Our platform offers a range of services including secure access to patient records, seamless sharing of data across healthcare providers, intelligent analysis of
health data, and much more. We are committed to improving patient care and transforming the healthcare industry through our innovative technology solutions.
Join us on this journey towards a more efficient, secure, and patient-centric healthcare system.
    </p>
    return(
        <>
        <section className="S_section1">
            <H1 name="H_title" title="
            Welcome to our AI-Driven Blockchain Platform for Patients Records Management System.
            "/>
            <div className="overview">
            <P title={disc}/>
            </div>
            <Container>
                <Row>
                    <Col xs={{ order: 'first' }}>
                <DynamicCard name="S_section3_card">
                    <Card.Title>Decentralized Data Sharing</Card.Title>
                    <Card.Text>Blockchain technology enables decentralized healthcare data sharing,
                        protecting users’ privacy, providing data empowerment, and ensuring reliable
                        data management.</Card.Text>
                    <Card.Img  variant="top" src={service1}/>
                </DynamicCard>
                    </Col>

                    <Col xs={{ order: 'last' }}>
                    <DynamicCard name="S_section3_card">
                    <Card.Title>AI-Driven Analysis</Card.Title>
                    <Card.Text>Artificial Intelligence (AI)  provides intelligent computer-aided
                        solutions by analyzing a patient’s medical images and symptoms for efficient
                        treatments, and future outbreak prediction.</Card.Text>
                    <Card.Img  variant="top" src={service2}/>
                </DynamicCard>
                    </Col>
                </Row>

                <Row>
                    <Col xs={{ order: 'first' }}>
                <DynamicCard name="S_section3_card">
                    <Card.Title>Patient-Centric Approach</Card.Title>
                    <Card.Text>The platform is designed with a patient-centric approach,
                        allowing patients to have control over their own health records. 
                        Patients can upload documents, view them, manage access to their 
                        documents, and view the document access logs.</Card.Text>
                    <Card.Img  variant="top" src={service3}/>
                </DynamicCard>
                    </Col>

                    <Col xs={{ order: 'first' }}>
                <DynamicCard name="S_section3_card">
                    <Card.Title>Healthcare Stakeholder Interaction</Card.Title>
                    <Card.Text>The platform improves information management among 
                        stakeholders in the healthcare ecosystem. Doctors can upload 
                        documents for their patients and download/view documents of 
                        their patients to which they have been granted access.
                    </Card.Text>
                    <Card.Img  variant="top" src={servise4}/>
                </DynamicCard>
                    </Col>
                </Row>

                <Row>
                    <Col xs={{ order: 'first' }}>
                <DynamicCard name="S_section3_card">
                    <Card.Title>Data Security and Privacy</Card.Title>
                    <Card.Text>Storage and management of health record data using
                        blockchain platforms offer patients the protection of their 
                        data and provides access to their health records based upon 
                        request.</Card.Text>
                    <Card.Img  variant="top" src={servise5}/>
                </DynamicCard>
                    </Col>

                    <Col xs={{ order: 'first' }}>
                <DynamicCard name="S_section3_card">
                    <Card.Title>AI-Driven Analysis</Card.Title>
                    <Card.Text>Artificial Intelligence (AI)  provides intelligent 
                        computer-aided solutions by analyzing a patient’s medical 
                        images and symptoms for efficient treatments, and future outbreak 
                        prediction.</Card.Text>
                    <Card.Img  variant="top" src={service2}/>
                </DynamicCard>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}
export default ServiceSection1;