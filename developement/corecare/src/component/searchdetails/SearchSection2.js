import React from "react";
import {Card, Image, Container } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import DynamicCard from "../bootcomponent/DynamicCard";
import MyCarousel from "../bootcomponent/Carousel";
import ahmed from '../../assets/ahmed.jpg';
import person from '../../assets/person.png';
import m_m from '../../assets/m_m.jpg';
import osama from '../../assets/osama.jpg';
import azoz from '../../assets/azoz.jpg';
import abod from '../../assets/abod.jpg';
import H1 from "../H1";

function Section2(){
    const result="Showing 175 Search Result"
    return(
        <>
        <section className="S_section1 Search_sec2">
        <aside>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
            <h1>hhhhhhhhhhh</h1>
        </aside>
        <Container style={{
            backgroundColor:'#3f4652',
            borderRadius:'8px',
            minHeight:'100vh',
            marginTop:'-10px',
            marginBottom:'-10px'}}>

                <H1 name="Search_sec2_result" title={result}/>
            <MyCarousel>
                <Carousel.Item > 
                <Container className="curs_con" style={{backgroundColor:'#3f4652'}}>
                <DynamicCard name="Search_sec2_card">
                    <Image src={person} roundedCircle />
                    <Card.Title>DR. AHMED ALSHAMERI</Card.Title>
                    <Card.Text>Professor</Card.Text>
                </DynamicCard>
                
                <DynamicCard name="Search_sec2_card">
                    <Image src={ahmed} roundedCircle />
                    <Card.Title>Ahmed Qahtan</Card.Title>
                    <Card.Text>Orthodontics</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={ahmed} roundedCircle />
                    <Card.Title>Ahmed Qahtan</Card.Title>
                    <Card.Text>Orthodontics</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={ahmed} roundedCircle />
                    <Card.Title>Ahmed Qahtan</Card.Title>
                    <Card.Text>Orthodontics</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={osama} roundedCircle />
                    <Card.Title>Osama Alathwari</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={abod} roundedCircle />
                    <Card.Title>Abdulrahman Hamood</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={azoz} roundedCircle />
                    <Card.Title>Mohammed Abdulazeez</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={m_m} roundedCircle />
                    <Card.Title>Mohammed Muthanna</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>
                </Container>
                <Carousel.Caption>
                </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                <Container className="curs_con" style={{backgroundColor:'#3f4652'}}>
                <DynamicCard name="Search_sec2_card">
                    <Image src={person} roundedCircle />
                    <Card.Title>DR. AHMED ALSHAMERI</Card.Title>
                    <Card.Text>Professor</Card.Text>
                </DynamicCard>
                
                <DynamicCard name="Search_sec2_card">
                    <Image src={ahmed} roundedCircle />
                    <Card.Title>Ahmed Qahtan</Card.Title>
                    <Card.Text>Orthodontics</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={osama} roundedCircle />
                    <Card.Title>Osama Alathwari</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={abod} roundedCircle />
                    <Card.Title>Abdulrahman Hamood</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={azoz} roundedCircle />
                    <Card.Title>Mohammed Abdulazeez</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>

                <DynamicCard name="Search_sec2_card">
                    <Image src={m_m} roundedCircle />
                    <Card.Title>Mohammed Muthanna</Card.Title>
                    <Card.Text>Software Engineer</Card.Text>
                </DynamicCard>
                </Container>
                <Carousel.Caption>
                </Carousel.Caption>
                </Carousel.Item>
            </MyCarousel>
        </Container>
        </section>
        </>
    );
}
export default Section2;