import React from "react";
import H1 from "../H1";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Flex_Container from "../bootcomponent/flex_Container";
import { BsCrosshair ,BsCalendar3  } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import Button from 'react-bootstrap/Button';

function Section1(){
const defaultProps = {
        label: 'Specialty / Doctor / Hospital',
        values: [
            'Dentist',
            'General Practitioner',
            'Psychologist',
            'Neurologist',
        ],
};
    return(
        <>
        <section className="S_section1 Search_sec">
            <H1 name="H_title" title="Search for Healthcare Providers or by Specialization"/>
            <Container style={{
                backgroundColor:'#272c34',
                borderRadius:'15px',
                width:'70%'
                }}>

                <Form >
                <Form.Group  className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="search"
                    style={{marginLeft:'0px'}}/>
                    <span className="Search_sec_SI"><AiOutlineSearch /></span>
                <Flex_Container style={{
                    }}>
                <select defaultValue="">
                    <option value="" disabled hidden>{defaultProps.label}</option>
                        {(defaultProps.values).map((value) => (
                    <option value={value} key={value}>{value}</option>
                        ))}
                </select>
                <Form.Control type="text" placeholder="search"/>
                    <span className="Search_sec_dotI"><BsCrosshair /></span>
                <Form.Control type="text" placeholder="search" />
                    <span className="Search_sec_calI"><BsCalendar3 /></span>
                    <Button variant="primary" style={{transition: '0.7s ease'}}>search</Button>{' '}
                </Flex_Container>
                </Form.Group>
                </Form>
            </Container>
        </section>
        </>
    );
}
export default Section1;