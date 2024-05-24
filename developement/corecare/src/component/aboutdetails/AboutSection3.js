import React from "react";
import H1 from "../H1";
import P from "../P"
import ahmed from '../../assets/ahmed.jpg';
import person from '../../assets/person.png';
import m_m from '../../assets/m_m.jpg';
import osama from '../../assets/osama.jpg';
import azoz from '../../assets/azoz.jpg';
import abod from '../../assets/abod.jpg';
import { Card, Col, Row ,Image,Container} from "react-bootstrap";
import DynamicCard from "../bootcomponent/DynamicCard";

function Section3(){
    const disc = <p>
        Meet the people behind our magical project
    </p>
    return(
        <>
        <section className="A_section1">
            <H1 name="H_title" title="Team"/>
            <div className="overview"><P className="H_P" title={disc}/></div>
            <Container className="A_section3_curs_con">
                <DynamicCard name="A_section3_card" size="20rem">
                    <Image src={person} roundedCircle />
                    <Card.Title>DR. AHMED ALSHAMERI</Card.Title>
                    <Card.Text>Professor</Card.Text>
                </DynamicCard>

                <DynamicCard name="A_section3_card">
                    <Image src={ahmed} roundedCircle />
                    <Card.Title>Ahmed Qahtan</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="A_section3_card">
                    <Image src={osama} roundedCircle />
                    <Card.Title>Osama Alathwari</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                    </DynamicCard>

                    <DynamicCard name="A_section3_card" size="20rem">
                    <Image src={abod} roundedCircle />
                    <Card.Title>Abdulrahman Hamood</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                    </DynamicCard>

                    <DynamicCard name="A_section3_card">
                    <Image src={azoz} roundedCircle />
                    <Card.Title>Mohammed Abdulazeez</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                    </DynamicCard>

                    <DynamicCard name="A_section3_card">
                    <Image src={m_m} roundedCircle />
                    <Card.Title>Mohammed Muthanna</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                    </DynamicCard>

            </Container>
        </section>
        </>
    );
}
export default Section3;