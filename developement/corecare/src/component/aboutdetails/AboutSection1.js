import React from "react";
import H1 from "../H1";
import P from "../P"
import Container from 'react-bootstrap/Container';
import A_image3 from '../../assets/image3.png';
import RectImage from "../bootcomponent/RectImage";

function Section1(){
    const disc = <p>
    We are a team of software engineering students passionate 
    about E-Healthcare innovation. Our project, "Core-Care," 
    is an AI-Driven Blockchain Platform for Enhanced Patient Records Management.
    With a focus on security, transparency, and efficiency, we aim to revolutionize 
    healthcare data management. Committed to excellence and ethical development, 
    we aspire to empower E-Healthcare professionals and improve patient care worldwide.
    </p>
    return(
        <>
        <section className="A_section1">
            <H1 name="H_title" title="About Us"/>
            <div className="overview"><P className="H_P" title={disc}/></div>
            <Container>
            <RectImage path={A_image3}/>
            </Container>
        </section>
        </>
    );
}
export default Section1;